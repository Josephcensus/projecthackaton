"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setReply("");
    if (!message.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
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
        backgroundColor: "#000000",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        CARV Hackathon Auto-Reply Agent 🤖
      </h1>

      {/* Input Box */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        style={{
          width: "100%",
          height: "120px",
          padding: "15px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />

      {/* Send Button */}
      <button
        onClick={sendMessage}
        disabled={loading}
        style={{
          width: "100%",
          padding: "15px",
          marginTop: "20px",
          backgroundColor: "#FFD700", // YELLOW
          border: "none",
          borderRadius: "10px",
          fontSize: "18px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        {loading ? "Sending..." : "Send"}
      </button>

      {/* Reply Box */}
      {reply && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            border: "1px solid #ddd",
            color: "#000000", // <<< BLACK TEXT (now visible)
            fontSize: "18px",
            lineHeight: "1.5",
          }}
        >
          <strong>Reply:</strong> {reply}
        </div>
      )}
    </main>
  );
              }              }
