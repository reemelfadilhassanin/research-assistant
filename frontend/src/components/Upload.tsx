import { useState } from "react";
import axios from "axios";
const BASE_URL = "https://research-assistant-vxo0.onrender.com";

export function Upload() {
    const [file, setFile] = useState<File>();
    const [uploading, setUploading] = useState(false);

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        
        try {
            const formData = new FormData();
            formData.append("file", file);

            await axios.post(`${BASE_URL}/upload-pdf`, formData);
            alert("✅ PDF uploaded and processed!");
        } catch (error) {
            alert("❌ Upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "1rem",
            padding: "clamp(1.5rem, 4vw, 2rem)",
            width: "clamp(280px, 90vw, 320px)",
            maxWidth: "100%",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
            transition: "all 0.3s ease",
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
                marginBottom: "1.5rem"
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
                    📄
                </div>
                <h2 style={{ 
                    fontSize: "clamp(1.25rem, 4vw, 1.5rem)", 
                    margin: 0, 
                    color: "#ffffff",
                    fontWeight: "600"
                }}>
                    Upload PDF
                </h2>
            </div>
            
            <div style={{
                border: "2px dashed rgba(255, 255, 255, 0.3)",
                borderRadius: "0.75rem",
                padding: "clamp(1.5rem, 4vw, 2rem) 1rem",
                textAlign: "center",
                marginBottom: "1.5rem",
                background: file ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.02)",
                transition: "all 0.3s ease"
            }}>
                <div style={{ 
                    fontSize: "clamp(1.5rem, 5vw, 2rem)", 
                    marginBottom: "0.5rem" 
                }}>
                    {file ? "📋" : "📁"}
                </div>
                <input 
                    type="file" 
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files?.[0])}
                    style={{ 
                        width: "100%",
                        padding: "0.5rem",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        color: "#ffffff",
                        fontSize: "clamp(0.8rem, 2.5vw, 1rem)"
                    }}
                />
                {file && (
                    <p style={{
                        margin: "0.5rem 0 0 0",
                        fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
                        color: "#ffffff",
                        fontWeight: "500",
                        wordBreak: "break-all"
                    }}>
                        Selected: {file.name}
                    </p>
                )}
            </div>
            
            <button 
                onClick={handleUpload}
                disabled={!file || uploading}
                style={{
                    background: !file || uploading 
                        ? "#333333" 
                        : "linear-gradient(135deg, #ffffff, #cccccc)",
                    color: !file || uploading ? "#cccccc" : "#000000",
                    padding: "clamp(0.6rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)",
                    border: "none",
                    borderRadius: "0.75rem",
                    cursor: !file || uploading ? "not-allowed" : "pointer",
                    width: "100%",
                    fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                    boxShadow: !file || uploading 
                        ? "none" 
                        : "0 4px 15px rgba(255, 255, 255, 0.2)"
                }}
            >
                {uploading ? "Uploading..." : "Upload & Process"}
            </button>
        </div>
    );
}
