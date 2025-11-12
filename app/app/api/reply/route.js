import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message } = await req.json();

    let reply;
    if (message.toLowerCase().includes("hello")) {
      reply = "Hey there! 👋 How can I help you today?";
    } else if (message.toLowerCase().includes("hackathon")) {
      reply = "You're viewing the CARV Hackathon Auto Reply API project — built with Next.js and Vercel!";
    } else {
      reply = "Got your message — I'll get back to you soon.";
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
