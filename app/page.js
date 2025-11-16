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
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#000000",
        padding: "20px",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        CARV Hackathon Auto-Reply Agent 🤖
      </h1>

      <textarea
        style={{
          width: "100%",
          height: "150px",
          padding: "15px",
          borderRadius: "10px",
          fontSize: "18px",
          border: "1px solid #555",
          backgroundColor: "black",
          color: "white",
        }}
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={sendMessage}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "15px",
          backgroundColor: "#6C47FF",
          color: "white",
          fontSize: "20px",
          border: "none",
          borderRadius: "10px",
        }}
      >
        Send
      </button>

      {reply && (
        <div
          style={{
            backgroundColor: "#4C2AFF", // 💜 Purple background you wanted
            padding: "20px",
            borderRadius: "12px",
            marginTop: "25px",
            color: "white",
            fontSize: "18px",
            lineHeight: "1.6",
          }}
        >
          <strong style={{ color: "white" }}>Reply:</strong> {reply}
        </div>
      )}
    </main>
  );
}
