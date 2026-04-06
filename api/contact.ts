const allowedAttachmentExtensions = ['pdf', 'dwg', 'step', 'stp'];
const maxAttachmentSizeBytes = 10 * 1024 * 1024;

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const getFileExtension = (filename: string) => {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1]?.toLowerCase() ?? '' : '';
};

export default {
  async fetch(request: Request) {
    if (request.method !== 'POST') {
      return Response.json({ error: 'Method not allowed' }, { status: 405 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!resendApiKey || !toEmail || !fromEmail) {
      return Response.json({ error: 'Server email settings are not configured.' }, { status: 500 });
    }

    const formData = await request.formData();
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const service = String(formData.get('service') ?? '').trim();
    const specialization = String(formData.get('specialization') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const consent = String(formData.get('consent') ?? '').trim();
    const attachmentValue = formData.get('attachment');

    if (!name || !email || !service || !message || consent !== 'true') {
      return Response.json({ error: 'Please complete all required fields.' }, { status: 400 });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return Response.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    let attachments: Array<{ filename: string; content: string }> | undefined;

    if (attachmentValue instanceof File && attachmentValue.size > 0) {
      const extension = getFileExtension(attachmentValue.name);

      if (!allowedAttachmentExtensions.includes(extension)) {
        return Response.json({ error: 'Attachment type must be PDF, DWG, STEP, or STP.' }, { status: 400 });
      }

      if (attachmentValue.size > maxAttachmentSizeBytes) {
        return Response.json({ error: 'Attachment must be under 10MB.' }, { status: 400 });
      }

      const buffer = Buffer.from(await attachmentValue.arrayBuffer());
      attachments = [
        {
          filename: attachmentValue.name,
          content: buffer.toString('base64'),
        },
      ];
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeService = escapeHtml(service);
    const safeSpecialization = escapeHtml(specialization || 'General');
    const safeMessage = escapeHtml(message).replaceAll('\n', '<br />');

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `New ADK contact inquiry from ${name}`,
        html: `
          <h2>New Contact Inquiry</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Service:</strong> ${safeService}</p>
          <p><strong>Specialization:</strong> ${safeSpecialization}</p>
          <p><strong>Consent:</strong> Yes</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        `,
        text: [
          'New Contact Inquiry',
          `Name: ${name}`,
          `Email: ${email}`,
          `Service: ${service}`,
          `Specialization: ${specialization || 'General'}`,
          'Consent: Yes',
          'Message:',
          message,
        ].join('\n'),
        attachments,
      }),
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();
      return Response.json({ error: `Email delivery failed: ${resendError}` }, { status: 502 });
    }

    return Response.json({ ok: true });
  },
};
