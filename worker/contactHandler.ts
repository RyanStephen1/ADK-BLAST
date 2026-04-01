type Env = {
  SEQUENZY_API_KEY?: string;
  SEQUENZY_SENDER_EMAIL?: string;
  SEQUENZY_SENDER_NAME?: string;
  CONTACT_RECIPIENT_EMAIL?: string;
  CONTACT_RECIPIENT_NAME?: string;
};

type SequenzyAttachment = {
  filename: string;
  content: string;
};

type SequenzyPayload = {
  to: string | string[];
  subject: string;
  body: string;
  preview?: string;
  from?: string;
  replyTo?: string;
  attachments?: SequenzyAttachment[];
};

const JSON_HEADERS = { 'Content-Type': 'application/json' };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;
const DEFAULT_SENDER_EMAIL = 'sales@adknprotech.com';
const DEFAULT_SENDER_NAME = 'ADK Portal';
const DEFAULT_RECIPIENT_NAME = 'ADK Sales';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });

const sanitizeField = (value: FormDataEntryValue | null, fallback: string) => {
  if (typeof value !== 'string') {
    return fallback;
  }

  const trimmed = value.trim();
  return trimmed || fallback;
};

const isValidEmail = (value: string) => EMAIL_REGEX.test(value);

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const formatMailbox = (email: string, name?: string) =>
  name ? `${name} <${email}>` : email;

const sendSequenzyEmail = async (apiKey: string, payload: SequenzyPayload) => {
  const response = await fetch('https://api.sequenzy.com/api/v1/transactional/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    return { ok: true as const, detail: null };
  }

  const detail = await response.text();
  return { ok: false as const, detail };
};

export async function handleContactPost(request: Request, env: Env) {
  try {
    if (!env.SEQUENZY_API_KEY) {
      return json(
        { error: 'Server misconfiguration: missing SEQUENZY_API_KEY.' },
        500,
      );
    }

    const formData = await request.formData();
    const name = sanitizeField(formData.get('name'), 'Unknown');
    const email = sanitizeField(formData.get('email'), '');
    const service = sanitizeField(formData.get('service'), 'N/A');
    const specialization = sanitizeField(formData.get('specialization'), 'N/A');
    const message = sanitizeField(formData.get('message'), 'No message provided');
    const file = formData.get('attachment');
    const botField = sanitizeField(formData.get('bot-field'), '');
    const senderEmail = env.SEQUENZY_SENDER_EMAIL ?? DEFAULT_SENDER_EMAIL;
    const senderName = env.SEQUENZY_SENDER_NAME ?? DEFAULT_SENDER_NAME;
    const recipientEmail = env.CONTACT_RECIPIENT_EMAIL ?? senderEmail;
    const recipientName = env.CONTACT_RECIPIENT_NAME ?? DEFAULT_RECIPIENT_NAME;

    if (botField) {
      return json({ success: true });
    }

    if (!name || !email || !message) {
      return json(
        { error: 'Missing required fields. Please provide your name, email, and project overview.' },
        400,
      );
    }

    if (!isValidEmail(email)) {
      return json({ error: 'Please provide a valid email address.' }, 400);
    }

    if (!isValidEmail(senderEmail)) {
      return json(
        { error: 'Server misconfiguration: invalid SEQUENZY_SENDER_EMAIL value.' },
        500,
      );
    }

    if (!isValidEmail(recipientEmail)) {
      return json(
        { error: 'Server misconfiguration: invalid CONTACT_RECIPIENT_EMAIL value.' },
        500,
      );
    }

    const attachments: SequenzyAttachment[] = [];

    if (file instanceof File && file.size > 0 && file.name) {
      if (file.size > MAX_ATTACHMENT_BYTES) {
        return json({ error: 'File too large. Max 10MB.' }, 400);
      }

      try {
        const arrayBuffer = await file.arrayBuffer();
        const content = Buffer.from(arrayBuffer).toString('base64');
        attachments.push({ filename: file.name, content });
      } catch (fileError) {
        const detail = fileError instanceof Error ? fileError.message : 'Unknown attachment error';
        console.error('Attachment processing failed:', detail);
        return json({ error: 'Attachment processing failed.', detail }, 500);
      }
    }

    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email);
    const escapedService = escapeHtml(service);
    const escapedSpecialization = escapeHtml(specialization);
    const escapedMessage = escapeHtml(message).replace(/\r?\n/g, '<br/>');

    const notificationPayload: SequenzyPayload = {
      to: formatMailbox(recipientEmail, recipientName),
      subject: `New Technical Inquiry: ${service} - ${name}`,
      from: formatMailbox(senderEmail, senderName),
      replyTo: formatMailbox(email, name),
      preview: `New inquiry from ${name} regarding ${service}.`,
      body: `
        <h2 style="color: #0047AB; font-family: sans-serif;">New Technical Inquiry from ADK Portal</h2>
        <p style="font-family: sans-serif; font-size: 14px;"><strong>Name:</strong> ${escapedName}</p>
        <p style="font-family: sans-serif; font-size: 14px;"><strong>Email:</strong> ${escapedEmail}</p>
        <p style="font-family: sans-serif; font-size: 14px;"><strong>Primary Service:</strong> ${escapedService}</p>
        <p style="font-family: sans-serif; font-size: 14px;"><strong>Specialization:</strong> ${escapedSpecialization}</p>
        <br/>
        <h3 style="font-family: sans-serif; font-size: 16px;">Project Overview:</h3>
        <p style="font-family: sans-serif; font-size: 14px; background: #f4f6f8; padding: 15px; border-radius: 5px;">
          ${escapedMessage}
        </p>
      `,
      attachments: attachments.length > 0 ? attachments : undefined,
    };

    const autoReplyPayload: SequenzyPayload = {
      to: formatMailbox(email, name),
      subject: 'Inquiry Received - ADK Industrial',
      from: formatMailbox(senderEmail, senderName),
      preview: `We received your inquiry regarding ${service}.`,
      body: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #0047AB;">Thank you for your inquiry, ${escapedName}.</h2>
          <p style="font-size: 15px; line-height: 1.6;">We have successfully received your technical request regarding <strong>${escapedService}</strong>.</p>
          <p style="font-size: 15px; line-height: 1.6;">Our engineering experts are currently reviewing your project details. We will reach out to you shortly to discuss the next steps and provide a comprehensive consultation.</p>
          <br/>
          <p style="font-size: 15px;">Best regards,</p>
          <p style="font-size: 15px; font-weight: bold; color: #0047AB;">The ADK Team<br/>
          <span style="font-size: 12px; font-weight: normal; color: #666;">Industrial Precision. Global Trust.</span></p>
        </div>
      `,
    };

    const [notificationResult, autoReplyResult] = await Promise.all([
      sendSequenzyEmail(env.SEQUENZY_API_KEY, notificationPayload),
      sendSequenzyEmail(env.SEQUENZY_API_KEY, autoReplyPayload),
    ]);

    if (!notificationResult.ok) {
      console.error('Sequenzy notification send failed:', notificationResult.detail);
      return json(
        {
          error: 'Sequenzy rejected the internal notification email.',
          detail: notificationResult.detail,
        },
        502,
      );
    }

    if (!autoReplyResult.ok) {
      console.warn('Sequenzy auto-reply send failed:', autoReplyResult.detail);
    }

    return json({
      success: true,
      autoReplySent: autoReplyResult.ok,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown server error';
    console.error('Worker Contact Endpoint Error:', message);
    return json({ error: 'Internal Server Error', message }, 500);
  }
}
