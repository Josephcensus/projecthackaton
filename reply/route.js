import { NextResponse } from "next/server";

export async function POST(req) {
  const { message } = await req.json();

  // Simple auto-reply logic for CARV
  let reply = "Thanks for reaching out to CARV!";

  if (message.toLowerCase().includes("event")) {
    reply = "CARV events are held weekly — check the community calendar!";
  } else if (message.toLowerCase().includes("hackathon")) {
    reply = "You're currently viewing the CARV Hackathon project — welcome!";
  } else if (message.toLowerCase().includes("help")) {
    reply = "How can I assist you today? You can ask about events, teams, or submissions.";
  }

  return NextResponse.json({ reply });
}
