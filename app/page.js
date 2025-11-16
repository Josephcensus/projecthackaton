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
        backgroundColor: "#ffffff",  // FIXED: White background
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        CarV Auto Reply
      </h1>

      {/* Input box */}
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

      {/* Send
