export async function POST(request) {
  try {
    const body = await request.json();
    const userMessage = body.message || "No message provided";

    const reply = `You said: ${userMessage}. This is a test reply from your API!`;

    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
