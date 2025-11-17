import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a support assistant. Only answer user questions politely."
        },
        { role: "user", content: message }
      ]
    });

    return Response.json({
      reply: completion.choices[0].message?.content || ""
    });

  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Something went wrong with AI" },
      { status: 500 }
    );
  }
}
