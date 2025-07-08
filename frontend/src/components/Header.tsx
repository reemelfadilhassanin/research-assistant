import React from "react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #000000 100%)",
        color: "#ffffff",
        padding: "1rem 1rem",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            minWidth: "200px",
          }}
        >
          <div
            style={{
              fontSize: "1.5rem",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              flexShrink: 0,
            }}
          >
            🧑‍🔬
          </div>
          <div>
            <h1
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                fontWeight: "700",
                margin: 0,
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              Lumae
            </h1>
            <p
              style={{
                margin: 0,
                opacity: 0.9,
                fontSize: "clamp(0.8rem, 2.5vw, 0.95rem)",
                fontWeight: "300",
                display: window.innerWidth < 480 ? "none" : "block",
              }}
            >
              Upload PDFs and get intelligent answers
            </p>
          </div>
        </div>

        <nav
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: "500",
              padding: "0.5rem 0.75rem",
              borderRadius: "0.5rem",
              transition: "all 0.3s ease",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              fontSize: "clamp(0.8rem, 2.5vw, 1rem)",
            }}
          >
            Home
          </Link>
          <Link
            to="/upload"
            style={{
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: "500",
              padding: "0.5rem 0.75rem",
              borderRadius: "0.5rem",
              transition: "all 0.3s ease",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              fontSize: "clamp(0.8rem, 2.5vw, 1rem)",
            }}
          >
            Upload
          </Link>
          <Link
            to="/ask"
            style={{
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: "500",
              padding: "0.5rem 0.75rem",
              borderRadius: "0.5rem",
              transition: "all 0.3s ease",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              fontSize: "clamp(0.8rem, 2.5vw, 1rem)",
            }}
          >
            Chat
          </Link>
        </nav>
      </div>
    </header>
  );
}
