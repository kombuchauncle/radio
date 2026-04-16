export default {
  async fetch(request) {
    const response = await fetch('http://broadcast.shoutcheap.com:8648/stream', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });

    return new Response(response.body, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
      },
    });
  },
};
