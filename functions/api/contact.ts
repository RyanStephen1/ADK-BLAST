import { handleContactPost } from '../../worker/contactHandler';

type Env = Parameters<typeof handleContactPost>[1];

export async function onRequestPost({ request, env }: { request: Request; env: Env }) {
  return handleContactPost(request, env);
}
