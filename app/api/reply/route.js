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

    // --- SMART BOT LOGIC ---
    if (text.includes("hello") || text.includes("hi")) {
      reply = "Hello 👋! I'm the CARV Hackathon Support Bot. How can I help you today?";
    }

    else if (text.includes("what is carv") || text.includes("carv")) {
      reply = "CARV is an AI-powered ecosystem enabling builders to create apps, DeFi tools, games, agents, and more on the SVM Testnet.";
    }

    else if (text.includes("reward") || text.includes("prize")) {
      reply = "🏆 Hackathon Rewards:\n• Community’s Favorite: 2000 / 1000 / 800 $CARV\n• Team’s Choice: 3200 / 2000 / 1000 $CARV\nLet me know if you want details.";
    }

    else if (text.includes("join") || text.includes("how do i join")) {
      reply = "To join the CARV Hackathon:\n1️⃣ Read the guidelines.\n2️⃣ Submit your project via the official form.\nYou can build with Next.js, Replit, Vercel or Solana Playground.";
    }

    else if (text.includes("testnet") || text.includes("svm")) {
      reply = "The CARV SVM Testnet allows developers to deploy apps, bots, tools, and games. It's easy to use with accessible tools like Vercel and Replit.";
    }

    else if (text.includes("help") || text.includes("guide")) {
      reply = "Sure! Tell me what you need help with — setup, API, idea, or deployment?";
    }

    else {
      reply = "Got your message! 😊 I’m here to assist with anything related to the CARV Hackathon.";
    }

    return NextResponse.json({ reply });

  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
