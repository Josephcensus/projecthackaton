// app/page.js
"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    // don't send empty
    if (!message.trim()) return;
    setLoading(true);
    setReply(""); // clear previous

    try {
      const res = await fetch("/api/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      // backend returns { reply: "..." }
      setReply(data.reply || "No reply received.");
    } catch (err) {
      setReply("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        padding: "40px",
        maxWidth: "700px",
        margin: "0 auto",
        minHeight: "100vh",
        backgroundColor: "#000", // page background black
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        CARV Hackathon Auto Reply Agent 🤖
      </h1>

      {/* Input */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        style={{
          width: "100%",
          height: "150px",
          padding: "15px",
          borderRadius: "10px",
          border: "2px solid #666",
          backgroundColor: "#000",
          color: "#fff",
          fontSize: "16px",
          boxSizing: "border-box",
        }}
      />

      {/* Send button */}
      <button
        onClick={sendMessage}
        disabled={loading}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "16px 20px",
          backgroundColor: "#6C47FF",
          color: "#fff",
          borderRadius: "10px",
          fontSize: "18px",
          border: "none",
          cursor: loading ? "default" : "pointer",
        }}
      >
        {loading ? "Generating reply..." : "Send"}
      </button>

      {/* Reply card — MAKE SURE THIS IS VISIBLE */}
      {reply && (
        <div
          style={{
            marginTop: "25px",
            backgroundColor: "#FFEB3B", // bright yellow — visible
            color: "#000", // true black text
            padding: "20px",
            borderRadius: "12px",
            fontSize: "18px",
            lineHeight: "1.6",
            fontWeight: 500,
            border: "2px solid #E6C75F", // soft gold border to pop
            boxShadow: "0 6px 18px rgba(0,0,0,0.25)", // visible card shadow
            // ensure no transparency:
            opacity: 1,
          }}
        >
          <strong style={{ color: "#000" }}>Reply:</strong> {reply}
        </div>
      )}
    </main>
  );
        }              }              }
