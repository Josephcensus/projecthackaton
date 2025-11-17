import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a CARV support assistant. Only answer questions about CARV, gaming, web3, and related topics." },
        { role: "user", content: message }
      ]
    });

    return Response.json({
      reply: completion.choices[0].message.content
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Something went wrong with AI" },
      { status: 500 }
    );
  }
}
