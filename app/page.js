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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = await res.json();
      setReply(data.reply || "No reply received.");
    } catch (err) {
      setReply("Error connecting to server.");
    }

    setLoading(false);
  };

  return (
    <main
      style={{
        padding: "40px",
        maxWidth: "700px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>CarV Auto Reply</h1>

      {/* Input box */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message…"
        style={{
          width: "100%",
          height: "120px",
          padding: "15px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          fontSize: "16px"
        }}
      />

      {/* Send button */}
      <button
        onClick={sendMessage}
        disabled={loading}
        style={{
          marginTop: "15px",
          padding: "12px 20px",
          fontSize: "16px",
          backgroundColor: "#000",
          color: "#fff",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer"
        }}
      >
        {loading ? "Generating reply…" : "Send"}
      </button>

      {/* Reply section */}
      {reply && (
        <div
          style={{
            backgroundColor: "#FFE68A", // Yellow background
            padding: "20px",
            borderRadius: "12px",
            marginTop: "25px",
            color: "black",
            fontSize: "18px",
            lineHeight: "1.6",
            fontWeight: "500",
            border: "1px solid #E6C75F" // Soft outline
          }}
        >
          <strong style={{ color: "black" }}>Reply:</strong> {reply}
        </div>
      )}
    </main>
  );
        }
