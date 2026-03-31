export async function onRequestPost({ request, env }: { request: Request, env: any }) {
    try {
        const formData = await request.formData();
        const name = formData.get('name') as string || 'Unknown';
        const email = formData.get('email') as string || 'Unknown';
        const service = formData.get('service') as string || 'N/A';
        const specialization = formData.get('specialization') as string || 'N/A';
        const message = formData.get('message') as string || 'No message provided';
        const file = formData.get('attachment') as File | null;

        // A valid RESEND_API_KEY must be stored in Cloudflare Pages Environment Variables
        if (!env.RESEND_API_KEY) {
            return new Response(JSON.stringify({ error: 'Server misconfiguration: missing RESEND_API_KEY' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const attachments: { filename: string; content: string }[] = [];

        if (file && file.size > 0 && file.name) {
            // Convert the uploaded file to a base64 string for Resend API
            const arrayBuffer = await file.arrayBuffer();
            let binary = '';
            const bytes = new Uint8Array(arrayBuffer);
            const len = bytes.byteLength;

            // Process in chunks to avoid "Maximum call stack size exceeded" errors with large files
            for (let i = 0; i < len; i += 32768) {
                binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + 32768)));
            }

            attachments.push({
                filename: file.name,
                content: btoa(binary),
            });
        }

        const resendPayload = {
            // NOTE: If your domain isn't fully verified in Resend yet, you must use 'onboarding@resend.dev' 
            // as the 'from' address and you can only send to your own registered email address.
            // Once verified, you can change this to something like 'ADK Portal <inquiries@adknprotech.com>'
            from: 'ADK Portal <onboarding@resend.dev>',
            to: ['sales@adknprotech.com'],
            reply_to: email,
            subject: `New Technical Inquiry: ${service} - ${name}`,
            html: `
        <h2 style="color: #0047AB; font-family: sans-serif;">New Technical Inquiry from ADK Portal</h2>
        <p style="font-family: sans-serif; font-size: 14px;"><strong>Name:</strong> ${name}</p>
        <p style="font-family: sans-serif; font-size: 14px;"><strong>Email:</strong> ${email}</p>
        <p style="font-family: sans-serif; font-size: 14px;"><strong>Primary Service:</strong> ${service}</p>
        <p style="font-family: sans-serif; font-size: 14px;"><strong>Specialization:</strong> ${specialization}</p>
        <br/>
        <h3 style="font-family: sans-serif; font-size: 16px;">Project Overview:</h3>
        <p style="font-family: sans-serif; font-size: 14px; background: #f4f6f8; padding: 15px; border-radius: 5px;">
          ${message.replace(/\n/g, '<br/>')}
        </p>
      `,
            attachments: attachments.length > 0 ? attachments : undefined,
        };

        const autoReplyPayload = {
            from: 'ADK Portal <onboarding@resend.dev>',
            to: [email],
            subject: 'Inquiry Received - ADK Industrial',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                    <h2 style="color: #0047AB;">Thank you for your inquiry, ${name}.</h2>
                    <p style="font-size: 15px; line-height: 1.6;">We have successfully received your technical request regarding <strong>${service}</strong>.</p>
                    <p style="font-size: 15px; line-height: 1.6;">Our engineering experts are currently reviewing your project details. We will reach out to you shortly to discuss the next steps and provide a comprehensive consultation.</p>
                    <br/>
                    <p style="font-size: 15px;">Best regards,</p>
                    <p style="font-size: 15px; font-weight: bold; color: #0047AB;">The ADK Team<br/>
                    <span style="font-size: 12px; font-weight: normal; color: #666;">Industrial Precision. Global Trust.</span></p>
                </div>
            `,
        };

        // Dispatch both the internal notification and the customer auto-reply concurrently
        const [res, autoReplyRes] = await Promise.all([
            fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${env.RESEND_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(resendPayload),
            }),
            fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${env.RESEND_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(autoReplyPayload),
            })
        ]);

        if (!res.ok) {
            const errorText = await res.text();
            console.error('Resend API Error (Primary):', errorText);
            return new Response(JSON.stringify({ error: 'Failed to dispatch email via Resend' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (!autoReplyRes.ok) {
            // Log the auto-reply error but do not fail the request overall, as domain verification might be pending
            const autoErrorText = await autoReplyRes.text();
            console.warn('Resend API Warning (Auto-Reply):', autoErrorText);
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        console.error('Cloudflare Function Endpoint Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
