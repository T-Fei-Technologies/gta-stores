import { promises as fs } from 'fs';
import type { RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request }) => {
  try {
    await fs.writeFile('settings.json', await request.text());
    return new Response('Settings saved', { status: 200 });
  } catch (error) {
    return new Response(String(error), { status: 500 });
  }
}) satisfies RequestHandler;