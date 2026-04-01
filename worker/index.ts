import { onRequestPost } from '../functions/api/contact';

type AssetsBinding = {
  fetch: (input: Request | string | URL, init?: RequestInit) => Promise<Response>;
};

type WorkerEnv = {
  ASSETS: AssetsBinding;
  SEQUENZY_API_KEY?: string;
  SEQUENZY_SENDER_EMAIL?: string;
  SEQUENZY_SENDER_NAME?: string;
  CONTACT_RECIPIENT_EMAIL?: string;
  CONTACT_RECIPIENT_NAME?: string;
};

const METHOD_NOT_ALLOWED = new Response('Method Not Allowed', {
  status: 405,
  headers: {
    Allow: 'POST',
  },
});

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/contact') {
      if (request.method !== 'POST') {
        return METHOD_NOT_ALLOWED;
      }

      return onRequestPost({ request, env });
    }

    return env.ASSETS.fetch(request);
  },
};
