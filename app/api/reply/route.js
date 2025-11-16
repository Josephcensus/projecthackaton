import OpenAI from "openai";

export async function POST(req) {
  try {
    const { message } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
You are the CARV Hackathon Auto-Reply Bot.
Answer all questions simply and clearly.
If user asks about "DeFi tools", answer what DeFi tools are.
If user asks anything CARV-related, explain it correctly.

User: ${message}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 150,
    });

    const aiReply = response.choices[0].message.content;

    return Response.json({ reply: aiReply });

  } catch (error) {
    console.error(error);
    return Response.json({ reply: "Error generating reply." });
  }
}
