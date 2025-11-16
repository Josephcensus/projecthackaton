"use client";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;

    const res = await fetch("/api/reply", {
      method: "POST",
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
          width: "100%",
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#6C47FF",
          color: "white",
          borderRadius: "10px",
          fontSize: "20px",
          border: "none",
        }}
      >
        Send
      </button>

      {reply && (
        <div
          style={{
            backgroundColor: "#1E3A8A", // BLUE
            padding: "20px",
            borderRadius: "12px",
            marginTop: "25px",
          }}
        >
          <strong style={{ color: "white" }}>Reply:</strong>{" "}
          <span style={{ color: "red" }}>{reply}</span>
        </div>
      )}
    </main>
  );
          }
