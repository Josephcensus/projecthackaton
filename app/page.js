"use client";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setReply("");

    try {
      const res = await fetch("/api/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setReply(data.reply);
    } catch (error) {
      setReply("Error: Could not connect to the server.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">
        CARV Hackathon Auto-Reply Agent 🤖
      </h1>

      <textarea
        className="w-full p-4 rounded-xl bg-gray-900 text-white border border-gray-700"
        rows="3"
        placeholder="Ask me anything..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <button
        onClick={sendMessage}
        disabled={loading}
        className="w-full mt-4 p-4 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send"}
      </button>

      {/* Reply Box */}
      {reply && (
        <div className="mt-4 p-4 rounded-xl bg-yellow-300 text-black shadow">
          <strong className="text-black">Reply:</strong> {reply}
        </div>
      )}
    </main>
  );
}
