// Blueprint, section D4 "Real-time updates": SSE relay for new orders / stock.
// Backend channel is relayed here so the token stays server-side; each event
// invalidates a TanStack Query key on the client.
import type { NextRequest } from 'next/server';

export async function GET(_req: NextRequest): Promise<Response> {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      controller.enqueue(encoder.encode(': connected\n\n'));
      // TODO: subscribe to backend channel for this user + store; forward events.
    },
  });
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
