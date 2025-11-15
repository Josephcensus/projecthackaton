"use client";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  async function sendMessage(e: any) {
    e.preventDefault();

    const res = await fetch("/api/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setReply(data.reply);
  }

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        CARV Auto Reply Bot
      </h1>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: "black",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Send
        </button>
      </form>

      {reply && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#f3f3f3",
            borderRadius: "10px",
          }}
        >
          <strong>Bot:</strong> {reply}
        </div>
      )}
    </div>
  );
          }
