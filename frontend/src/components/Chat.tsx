import { useState } from "react";
import axios from "axios";
const BASE_URL = "https://research-assistant-vxo0.onrender.com";

export function Chat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!question.trim()) return;
    setLoading(true);

    const userMessage = { from: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post<{ answer: string }>(`${BASE_URL}/ask`, { question });
      setMessages((prev) => [...prev, { from: "bot", text: res.data.answer }]);
    } catch {
      setMessages((prev) => [...prev, { from: "bot", text: "⚠️ Failed to get answer. Please try again." }]);
    } finally {
      setQuestion("");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        flex: 1,
        maxWidth: 800,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: 24,
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #333333, #000000)",
            color: "#fff",
            borderRadius: 8,
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            border: "1px solid rgba(255, 255, 255, 0.2)",
            flexShrink: 0,
          }}
        >
          💬
        </div>
        <h2
          style={{
            fontSize: 24,
            color: "#fff",
            margin: 0,
            fontWeight: 600,
          }}
        >
          Ask Questions
        </h2>
      </div>

      {/* Messages container */}
      <div
        style={{
          flexGrow: 1,
          minHeight: 250,
          maxHeight: 400,
          overflowY: "auto",
          background: "rgba(255,255,255,0.02)",
          borderRadius: 12,
          padding: 16,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {messages.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "#ccc",
              padding: 24,
              fontStyle: "italic",
              fontSize: 16,
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>🤖</div>
            Upload a PDF first, then ask me anything about its content!
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "85%",
                  background:
                    msg.from === "user"
                      ? "linear-gradient(135deg, #ffffff, #cccccc)"
                      : "rgba(255, 255, 255, 0.1)",
                  color: msg.from === "user" ? "#000" : "#fff",
                  padding: "12px 16px",
                  borderRadius: msg.from === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                  border: msg.from === "bot" ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
                  lineHeight: 1.5,
                  fontSize: 16,
                  wordBreak: "break-word",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}

        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                color: "#ccc",
                padding: "12px 16px",
                borderRadius: "16px 16px 16px 4px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                fontStyle: "italic",
                fontSize: 16,
              }}
            >
              🤔 Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input & Button */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!loading) ask();
        }}
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about your PDF..."
          disabled={loading}
          style={{
            flexGrow: 1,
            minWidth: 0,
            padding: 12,
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: 12,
            fontSize: 16,
            background: "rgba(255, 255, 255, 0.05)",
            color: "#fff",
            outline: "none",
          }}
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          style={{
            flex: "0 0 auto",
            padding: "12px 24px",
            borderRadius: 12,
            border: "none",
            cursor: loading || !question.trim() ? "not-allowed" : "pointer",
            fontWeight: 600,
            fontSize: 16,
            background:
              loading || !question.trim()
                ? "#333"
                : "linear-gradient(135deg, #fff, #ccc)",
            color: loading || !question.trim() ? "#666" : "#000",
            boxShadow:
              loading || !question.trim() ? "none" : "0 4px 15px rgba(255,255,255,0.2)",
            minWidth: 80,
          }}
        >
          {loading ? "..." : "Ask"}
        </button>
      </form>
    </div>
  );
}
