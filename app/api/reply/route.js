import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { reply: "Please type a message." },
        { status: 400 }
      );
    }

    const text = message.toLowerCase();
    let reply = "";

    if (text.includes("hello") || text.includes("hi")) {
      reply = "Hello 👋 I'm the CARV Hackathon Support Bot. How can I help you today?";
    } else if (text.includes("what is carv") || text.includes("carv")) {
      reply = "CARV is an AI-powered ecosystem enabling builders to create apps, DeFi tools, games, agents, and more.";
    } else if (text.includes("reward") || text.includes("prize")) {
      reply = "🏆 Hackathon Rewards:\n• Community: 2000 / 1000 / 800 $CARV\n• Team Choice: 3200 / 2000 / 1500";
    } else if (text.includes("join") || text.includes("how do i join")) {
      reply = "To join the CARV Hackathon:\n1️⃣ Read the guidelines.\n2️⃣ Submit your project.\n3️⃣ You’re all set!";
    } else if (text.includes("testnet") || text.includes("swn")) {
      reply = "The CARV SWN Testnet allows developers to build apps, bots, and more.";
    } else if (text.includes("help") || text.includes("guide")) {
      reply = "Sure! Tell me what you need help with — setup, API, idea, or deployment?";
    } else {
      reply = "Got your message! 😊 I'm here to assist with anything related to the CARV Hackathon.";
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
