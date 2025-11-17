"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;

    const res = await fetch("/api/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <main className="min-h-screen bg-[#000000] text-white flex flex-col items-center px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">
        CARY Hackathon Auto-Reply Agent 🤖
      </h1>

      {/* Input Box */}
      <textarea
        className="w-full max-w-xl h-40 p-4 rounded-xl bg-white text-black outline-none"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {/* Send Button */}
      <button
        onClick={sendMessage}
        className="mt-4 w-full max-w-xl py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-lg font-semibold"
      >
        Send
      </button>

      {/* Reply Box */}
      {reply && (
        <div className="mt-6 w-full max-w-xl p-4 bg-white text-black rounded-xl shadow-md">
          <p className="font-semibold">Reply:</p>
          <p>{reply}</p>
        </div>
      )}
    </main>
  );
}
