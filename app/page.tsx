"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(e: any) {
    e.preventDefault();
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
      setReply(data.reply || "No reply received.");
    } catch (err) {
      setReply("Error: Unable to reach API.");
    }

    setLoading(false);
  }

  return (
    <main style={{ maxWidth: 600, margin: "50px auto", padding: 20 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>
        CARV Hackathon Auto-Reply Agent 🤖
      </h1>

      <form onSubmit={sendMessage}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          style={{
            width: "100%",
            height: 120,
            padding: 12,
            fontSize: 16,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 10,
            padding: "12px 20px",
            background: "#6A5ACD",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 16,
            width: "100%",
          }}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      {reply && (
        <div
          style={{
            marginTop: 20,
            padding: 15,
            background: "#F5F5F5",
            borderRadius: 8,
            fontSize: 16,
          }}
        >
          <strong>Reply:</strong> {reply}
        </div>
      )}
    </main>
  );
}
