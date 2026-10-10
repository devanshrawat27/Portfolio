import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID  = "service_tzgr1sa";
const EMAILJS_TEMPLATE_ID = "template_xxlyr65";
const EMAILJS_PUBLIC_KEY  = "J-9iFjZMi7B1Ra7uK";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [sending, setSending] = useState(false);
  const [hovBtn, setHovBtn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !service || !message) {
      setStatus({ type: "error", msg: "Please fill in all fields!" });
      setTimeout(() => setStatus({ type: "", msg: "" }), 3000);
      return;
    }
    setSending(true);
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { from_name: name, from_email: email, service, message }, EMAILJS_PUBLIC_KEY);
      setStatus({ type: "success", msg: "Message sent successfully!" });
      setName(""); setEmail(""); setService(""); setMessage("");
    } catch {
      setStatus({ type: "error", msg: "Failed to send. Try again!" });
    } finally {
      setSending(false);
      setTimeout(() => setStatus({ type: "", msg: "" }), 4000);
    }
  };

  return (
    <section id="contact" style={{
      position: "relative", zIndex: 1,
      minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "clamp(80px,12vw,120px) clamp(20px,5vw,80px)",
      backgroundColor: "transparent",
    }}>
      <style>{`
        @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.7; } 100% { transform: scale(2); opacity: 0; } }
        @keyframes float-badge { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
      `}</style>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "clamp(40px,6vw,80px)",
        width: "100%", maxWidth: "1200px", alignItems: "center",
      }}>
        {/* LEFT — Image */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: "380px", borderRadius: "24px", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <img src="/pass.webp" alt="Devansh Rawat"
              style={{ width: "100%", height: "clamp(320px,60vw,480px)", objectFit: "cover", objectPosition: "center top", display: "block" }}
              onError={e => { e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=380&h=480&fit=crop&crop=top"; }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)", pointerEvents: "none" }} />
            <div style={{
              position: "absolute", top: 16, left: 16,
              background: "linear-gradient(135deg, rgba(163,230,53,0.16) 0%, rgba(0,0,0,0.85) 100%)",
              border: "1px solid rgba(163,230,53,0.4)",
              borderRadius: "100px",
              padding: "6px 14px",
              display: "flex", alignItems: "center", gap: "8px",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              boxShadow: "0 0 20px rgba(163,230,53,0.2), inset 0 1px 1px rgba(255,255,255,0.25)",
              animation: "float-badge 3s ease-in-out infinite",
            }}>
              <div style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: "#a3e635", boxShadow: "0 0 8px #a3e635" }} />
                <div style={{ position: "absolute", inset: "-3px", borderRadius: "50%", border: "1px solid #a3e635", animation: "pulse-ring 1.6s ease-out infinite" }} />
              </div>
              <span style={{ color: "#c6f567", fontSize: "10.5px", fontWeight: 800, letterSpacing: "1px", fontFamily: "'JetBrains Mono', monospace" }}>Open to work</span>
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 22px" }}>
              <div style={{ fontFamily: "'Courier New', monospace", color: "#a3e635", fontSize: "9px", letterSpacing: "3px", marginBottom: "4px" }}></div>
              <div style={{ fontFamily: "'Arial Black', sans-serif", color: "#fff", fontSize: "18px", fontWeight: 900 }}></div>
            </div>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px,3vw,28px)" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "6px",
            padding: "5px 14px",
            borderRadius: "100px",
            background: "linear-gradient(135deg, rgba(163,230,53,0.1) 0%, rgba(163,230,53,0.02) 100%)",
            border: "1px solid rgba(163,230,53,0.28)",
            boxShadow: "0 0 16px rgba(163,230,53,0.08)",
            alignSelf: "flex-start",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#a3e635", boxShadow: "0 0 8px #a3e635" }} />
            <span style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", color: "#a3e635", fontSize: "11px", fontWeight: 800, letterSpacing: "3px" }}>
              GET_IN_TOUCH
            </span>
          </div>

          <h2 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "clamp(2rem,7vw,3.8rem)", fontWeight: 900, lineHeight: 0.88, margin: 0, letterSpacing: "-2px", textTransform: "uppercase" }}>
            <span style={{ color: "#fff" }}>LET'S WORK</span><br />
            <span style={{ color: "#a3e635" }}>TOGETHER</span>
          </h2>

          <p style={{ color: "#94a3b8", fontSize: "clamp(13px,3vw,14.5px)", lineHeight: 1.75, margin: 0 }}>Have a project in mind? Let's build something impactful together.</p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {/* On mobile: stack name+email */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
              <Field label="Name"><input type="text" placeholder="John Smith" value={name} onChange={e => setName(e.target.value)} style={inputBase} onFocus={applyFocus} onBlur={removeFocus} /></Field>
              <Field label="Email"><input type="email" placeholder="john@gmail.com" value={email} onChange={e => setEmail(e.target.value)} style={inputBase} onFocus={applyFocus} onBlur={removeFocus} /></Field>
            </div>
            <Field label="Service Needed">
              <select value={service} onChange={e => setService(e.target.value)} style={{ ...inputBase, cursor: "pointer", color: service ? "#fff" : "#444" }} onFocus={applyFocus} onBlur={removeFocus}>
                <option value="">Select...</option>
                <option value="frontend">⚛️ Frontend Development</option>
                <option value="backend">⚙️ Backend Development</option>
                <option value="fullstack">🚀 Full Stack Project</option>
                <option value="api">🔌 API Development</option>
                <option value="other">💡 Other</option>
              </select>
            </Field>
            <Field label="What Can I Help You...">
              <textarea placeholder="Hello, I'd like to enquire about..." value={message} onChange={e => setMessage(e.target.value)} style={{ ...inputBase, resize: "none", height: "110px" }} onFocus={applyFocus} onBlur={removeFocus} />
            </Field>
            {status.msg && (
              <div style={{ padding: "12px 16px", borderRadius: "10px", border: "1px solid", fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", color: status.type === "success" ? "#a3e635" : "#ff6b6b", borderColor: status.type === "success" ? "#a3e63540" : "#ff6b6b40", backgroundColor: status.type === "success" ? "#a3e63508" : "#ff6b6b08" }}>
                {status.type === "success" ? "✅" : "⚠️"} {status.msg}
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <button type="submit" disabled={sending}
                onMouseEnter={() => setHovBtn(true)} onMouseLeave={() => setHovBtn(false)}
                style={{
                  padding: "13px clamp(28px,6vw,48px)",
                  borderRadius: "999px",
                  border: "2px solid #a3e635",
                  backgroundColor: hovBtn && !sending ? "#a3e635" : "transparent",
                  color: hovBtn && !sending ? "#000" : "#a3e635",
                  fontSize: "12px",
                  fontWeight: 800,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontFamily: "'Arial Black', sans-serif",
                  cursor: sending ? "not-allowed" : "pointer",
                  opacity: sending ? 0.5 : 1,
                  transition: "all 0.25s",
                  boxShadow: hovBtn && !sending ? "0 0 30px rgba(163,230,53,0.3)" : "none",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}>
                {sending ? "Sending..." : "Submit"}
              </button>
              <span style={{ color: "#94a3b8", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" }}>Usually reply within 24hrs</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
    <label style={{ color: "#a3e635", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px" }}>{label}</label>
    {children}
  </div>
);

const inputBase = { backgroundColor: "#111", border: "1.5px solid #1e1e1e", borderRadius: "12px", padding: "13px 16px", color: "#fff", fontSize: "14px", fontFamily: "inherit", outline: "none", width: "100%", boxSizing: "border-box", display: "block", transition: "border-color 0.2s, box-shadow 0.2s, background-color 0.2s" };
const applyFocus = e => { e.target.style.borderColor = "#a3e635"; e.target.style.boxShadow = "0 0 0 3px rgba(163,230,53,0.1)"; e.target.style.backgroundColor = "#161616"; };
const removeFocus = e => { e.target.style.borderColor = "#1e1e1e"; e.target.style.boxShadow = "none"; e.target.style.backgroundColor = "#111"; };

export default Contact;