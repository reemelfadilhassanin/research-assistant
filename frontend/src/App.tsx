import { Upload } from "./components/Upload";
import { Chat } from "./components/Chat";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a1a 0%, #000000 100%)",
      color: "#ffffff"
    }}>
      <Header />

      <main style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "4rem 2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%"
      }}>
        <div style={{
          textAlign: "center",
          marginBottom: "3rem"
        }}>
          <h2 style={{
            fontSize: "2rem",
            fontWeight: "600",
            color: "#ffffff",
            marginBottom: "1rem",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)"
          }}>
            Transform Your Research Experience
          </h2>
          <p style={{
            fontSize: "1.1rem",
            color: "#cccccc",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.6"
          }}>
            Upload your PDF documents and engage in intelligent conversations with your research materials.
            Get instant answers, insights, and analysis powered by advanced AI.
          </p>
        </div>

        <div style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%"
        }}>
          <div id="upload">
            <Upload />
          </div>
          <div id="chat">
            <Chat />
          </div>
        </div>

        <div style={{
          marginTop: "4rem",
          display: "flex",              // 🔥 changed from grid to flex
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
          width: "100%",
          maxWidth: "1000px"
        }}>
          <div style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "1rem",
            padding: "1.5rem",
            textAlign: "center",
            flex: "1 1 250px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)"
          }}>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⚡</div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem", color: "#ffffff" }}>
              Fast Processing
            </h3>
            <p style={{ color: "#cccccc", margin: 0, lineHeight: "1.5" }}>
              Quick PDF analysis and instant responses to your questions
            </p>
          </div>

          <div style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "1rem",
            padding: "1.5rem",
            textAlign: "center",
            flex: "1 1 250px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)"
          }}>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🎯</div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem", color: "#ffffff" }}>
              Accurate Insights
            </h3>
            <p style={{ color: "#cccccc", margin: 0, lineHeight: "1.5" }}>
              Precise answers based on your document content
            </p>
          </div>

          <div style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "1rem",
            padding: "1.5rem",
            textAlign: "center",
            flex: "1 1 250px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)"
          }}>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔒</div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem", color: "#ffffff" }}>
              Secure & Private
            </h3>
            <p style={{ color: "#cccccc", margin: 0, lineHeight: "1.5" }}>
              Your documents are processed securely and privately
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
