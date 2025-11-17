export async function POST(req) {
  try {
    const { message } = await req.json();

    return new Response(JSON.stringify({
      reply: `You said: ${message}`
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
}
