import { useState } from "react";
import axios from "axios";
const BASE_URL = "https://research-assistant-vxo0.onrender.com";

export function Chat() {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState<{ from: string, text: string }[]>([]);
    const [loading, setLoading] = useState(false);

    const ask = async () => {
        if (!question.trim()) return;
        setLoading(true);
        
        const userMessage = { from: "user", text: question };
        setMessages(prev => [...prev, userMessage]);
        
        try {
            const res = await axios.post<{ answer: string }>(`${BASE_URL}/ask`, { question });
            setMessages(prev => [...prev, { from: "bot", text: res.data.answer }]);
        } catch {
            setMessages(prev => [...prev, { from: "bot", text: "⚠️ Failed to get answer. Please try again." }]);
        } finally {
            setQuestion("");
            setLoading(false);
        }
    };

    return (
        <div style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "1rem",
            padding: "clamp(1.5rem, 4vw, 2rem)",
            width: "clamp(300px, 90vw, 420px)",
            maxWidth: "100%",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            position: "relative",
            overflow: "hidden"
        }}>
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #ffffff, #cccccc)",
                borderRadius: "1rem 1rem 0 0"
            }} />
            
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.5rem"
            }}>
                <div style={{
                    background: "linear-gradient(135deg, #333333, #000000)",
                    color: "#ffffff",
                    borderRadius: "0.5rem",
                    width: "clamp(35px, 8vw, 40px)",
                    height: "clamp(35px, 8vw, 40px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "clamp(1rem, 3vw, 1.25rem)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    flexShrink: 0
                }}>
                    💬
                </div>
                <h2 style={{ 
                    fontSize: "clamp(1.25rem, 4vw, 1.5rem)", 
                    color: "#ffffff",
                    margin: 0,
                    fontWeight: "600"
                }}>
                    Ask Questions
                </h2>
            </div>
            
            <div style={{
                flexGrow: 1,
                minHeight: "clamp(250px, 40vh, 300px)",
                maxHeight: "clamp(300px, 50vh, 400px)",
                overflowY: "auto",
                background: "rgba(255, 255, 255, 0.02)",
                borderRadius: "0.75rem",
                padding: "1rem",
                border: "1px solid rgba(255, 255, 255, 0.1)"
            }}>
                {messages.length === 0 ? (
                    <div style={{
                        textAlign: "center",
                        color: "#cccccc",
                        padding: "clamp(1.5rem, 4vw, 2rem) 1rem",
                        fontStyle: "italic"
                    }}>
                        <div style={{ 
                            fontSize: "clamp(1.5rem, 5vw, 2rem)", 
                            marginBottom: "1rem" 
                        }}>🤖</div>
                        <p style={{ 
                            margin: 0,
                            fontSize: "clamp(0.9rem, 2.5vw, 1rem)"
                        }}>
                            Upload a PDF first, then ask me anything about its content!
                        </p>
                    </div>
                ) : (
                    messages.map((msg, i) => (
                        <div key={i} style={{
                            display: "flex",
                            justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
                            marginBottom: "1rem"
                        }}>
                            <div style={{
                                maxWidth: "85%",
                                background: msg.from === "user" 
                                    ? "linear-gradient(135deg, #ffffff, #cccccc)"
                                    : "rgba(255, 255, 255, 0.1)",
                                color: msg.from === "user" ? "#000000" : "#ffffff",
                                padding: "clamp(0.6rem, 2vw, 0.75rem) clamp(0.8rem, 2.5vw, 1rem)",
                                borderRadius: msg.from === "user" 
                                    ? "1rem 1rem 0.25rem 1rem"
                                    : "1rem 1rem 1rem 0.25rem",
                                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                                border: msg.from === "bot" ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
                                lineHeight: "1.5",
                                fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
                                wordBreak: "break-word"
                            }}>
                                {msg.text}
                            </div>
                        </div>
                    ))
                )}
                {loading && (
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        marginBottom: "1rem"
                    }}>
                        <div style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            color: "#cccccc",
                            padding: "clamp(0.6rem, 2vw, 0.75rem) clamp(0.8rem, 2.5vw, 1rem)",
                            borderRadius: "1rem 1rem 1rem 0.25rem",
                            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            fontStyle: "italic",
                            fontSize: "clamp(0.85rem, 2.5vw, 1rem)"
                        }}>
                            <span>🤔 Thinking...</span>
                        </div>
                    </div>
                )}
            </div>
            
            <div style={{ 
                display: "flex", 
                gap: "0.75rem",
                alignItems: "flex-end",
                flexWrap: "wrap"
            }}>
                <input 
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !loading && ask()}
                    placeholder="Ask a question about your PDF..."
                    disabled={loading}
                    style={{
                        flexGrow: 1,
                        minWidth: "200px",
                        padding: "clamp(0.6rem, 2vw, 0.75rem) 1rem",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "0.75rem",
                        fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
                        background: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(5px)",
                        transition: "all 0.3s ease",
                        outline: "none",
                        color: "#ffffff"
                    }}
                />
                <button 
                    onClick={ask} 
                    disabled={loading || !question.trim()}
                    style={{
                        background: loading || !question.trim()
                            ? "#333333"
                            : "linear-gradient(135deg, #ffffff, #cccccc)",
                        color: loading || !question.trim() ? "#666666" : "#000000",
                        padding: "clamp(0.6rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)",
                        border: "none",
                        borderRadius: "0.75rem",
                        cursor: loading || !question.trim() ? "not-allowed" : "pointer",
                        fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                        boxShadow: loading || !question.trim()
                            ? "none"
                            : "0 4px 15px rgba(255, 255, 255, 0.2)",
                        minWidth: "60px"
                    }}
                >
                    {loading ? "..." : "Ask"}
                </button>
            </div>
        </div>
    );
}
