import { useState, useEffect, useRef } from "react";
import photo from './photo.png';

const NAV_ITEMS = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

const SKILLS = {
  "Languages": [
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  ],
  "Frontend": [
    { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "jQuery", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg" },
    { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  ],
  "Backend & API": [
    { name: "ASP.NET", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" },
    { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
    { name: "REST API", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  ],
  "Database": [
    { name: "SQL Server", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "XML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xml/xml-original.svg" },
  ],
  "Tools": [
    { name: "Visual Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg" },
    { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  ],
};

const CATEGORY_ICONS = {
  "Languages": "🧠", "Frontend": "🎨", "Backend & API": "⚙️", "Database": "🗄️", "Tools": "🛠️",
};

const PROJECTS = [
  {
    title: "AI Chatbot Model",
    link: "https://ai-chatbot-p3n8.onrender.com/",
    desc: "Full-stack AI Chatbot with self-learning capabilities, integrating Weather & Search APIs for real-time accuracy.",
    tech: ["Python", "FastAPI", "MongoDB", "Groq LLM", "REST API", "JavaScript"],
    color: "#00f5c4", icon: "🤖",
  },
  {
    title: "Employee Travel Portal",
    link: null,
    desc: "Self-service portal for travel allowance requests & reimbursement with expense tracking and status monitoring.",
    tech: ["C#", "ASP.NET", "SQL Server", "HTML5", "CSS3"],
    color: "#7c6af7", icon: "✈️",
  },
  {
  title: "Leave Portal",
  link: null,
  desc: "Designed and developed a Leave Planner System with a full-year calendar view (Jan–Dec) enabling multi-user leave visibility, color-coded date ranges, and an approval workflow. The system provides real-time leave tracking, efficient leave management, and improved planning transparency across the organization.",
  tech: ["C#", "ASP.NET", "SQL Server", "HTML5", "CSS3"],
  color: "#7c6af7", icon: "📅",
},
];

const cssText = `
  @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #04080f; color: #e2e8f0; font-family: 'Cabinet Grotesk', sans-serif; overflow-x: hidden; }
  ::selection { background: rgba(0,245,196,0.25); color: #fff; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #04080f; }
  ::-webkit-scrollbar-thumb { background: #00f5c4; border-radius: 4px; }

  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes pulseGlow { 0%,100%{box-shadow:0 0 8px rgba(0,245,196,0.5)} 50%{box-shadow:0 0 22px rgba(0,245,196,0.9)} }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes skillPop { from{opacity:0;transform:scale(0.8) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }

  .nav-btn {
    background: none; border: none; cursor: pointer;
    font-family: 'Cabinet Grotesk', sans-serif;
    font-size: 14px; font-weight: 600; padding: 6px 14px;
    border-radius: 6px; transition: all 0.25s; letter-spacing: 0.3px; position: relative;
  }
  .nav-btn::after {
    content: ''; position: absolute; bottom: -2px; left: 50%; right: 50%;
    height: 2px; background: #00f5c4; transition: all 0.25s; border-radius: 2px;
  }
  .nav-btn:hover::after, .nav-btn.active::after { left: 0; right: 0; }

  .skill-item {
    display: flex; flex-direction: column; align-items: center; gap: 10px;
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px; padding: 20px 14px; cursor: default;
    transition: all 0.3s; animation: skillPop 0.5s ease both; min-width: 82px;
  }
  .skill-item:hover {
    border-color: rgba(0,245,196,0.4) !important;
    background: rgba(0,245,196,0.07) !important;
    transform: translateY(-7px) scale(1.05);
    box-shadow: 0 14px 32px rgba(0,245,196,0.13);
  }
  .skill-item img {
    width: 42px; height: 42px; object-fit: contain;
    filter: drop-shadow(0 2px 6px rgba(0,0,0,0.5));
    transition: transform 0.3s;
  }
  .skill-item:hover img { transform: scale(1.18) rotate(-5deg); }
  .skill-item .skill-name { font-size: 11px; font-weight: 700; color: #94a3b8; text-align: center; line-height: 1.3; }

  .skill-card { transition: all 0.3s; }
  .skill-card:hover { border-color: rgba(0,245,196,0.18) !important; }
  .project-card { transition: all 0.35s; }
  .project-card:hover { transform: translateY(-8px); box-shadow: 0 32px 64px rgba(0,0,0,0.5) !important; }
  .contact-card { transition: all 0.3s; }
  .contact-card:hover { border-color: rgba(0,245,196,0.3) !important; background: rgba(0,245,196,0.04) !important; transform: translateY(-4px); }
  .edu-card { transition: all 0.3s; }
  .edu-card:hover { border-color: rgba(124,106,247,0.35) !important; transform: translateY(-4px); }

  .hero-anim > * { animation: fadeUp 0.65s ease both; }
  .hero-anim > *:nth-child(1){animation-delay:0.05s}
  .hero-anim > *:nth-child(2){animation-delay:0.15s}
  .hero-anim > *:nth-child(3){animation-delay:0.25s}
  .hero-anim > *:nth-child(4){animation-delay:0.35s}
  .hero-anim > *:nth-child(5){animation-delay:0.45s}
  .hero-anim > *:nth-child(6){animation-delay:0.55s}

  @media(max-width:768px){
    .nav-links{display:none!important}
    .hamburger{display:block!important}
   .hero-visual{display:flex!important;justify-content:center!important;width:100%!important;margin-bottom:30px!important}
    .hero-section{padding:60px 6vw!important}
  }
`;

export default function Portfolio() {
  const [active, setActive] = useState("About");
  const [typed, setTyped] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const roles = ["Software Developer", "Full-Stack Engineer", "AI App Builder", "MCA Student @ LPU"];
  const roleIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = cssText;
    document.head.appendChild(style);
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { try { document.head.removeChild(style); } catch(e){} };
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { startType(); }, []);

  function startType() {
    const interval = setInterval(() => {
      const current = roles[roleIdx.current];
      if (!deleting.current) {
        charIdx.current++;
        setTyped(current.slice(0, charIdx.current));
        if (charIdx.current === current.length) {
          deleting.current = true; clearInterval(interval);
          setTimeout(() => startType(), 1600);
        }
      } else {
        charIdx.current--;
        setTyped(current.slice(0, charIdx.current));
        if (charIdx.current === 0) {
          deleting.current = false;
          roleIdx.current = (roleIdx.current + 1) % roles.length;
          clearInterval(interval);
          setTimeout(() => startType(), 300);
        }
      }
    }, deleting.current ? 40 : 80);
  }

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id); setMenuOpen(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#04080f", color: "#e2e8f0", fontFamily: "'Cabinet Grotesk',sans-serif", overflowX: "hidden", position: "relative" }}>

      {/* BG Effects */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(0,245,196,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,196,0.022) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
      <div style={{ position: "fixed", top: -180, right: -100, width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,245,196,0.09) 0%,transparent 65%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: -160, left: -120, width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,106,247,0.09) 0%,transparent 65%)", pointerEvents: "none", zIndex: 0 }} />

      {/* NAV */}
   <nav style={{ 
  position: "sticky", 
  top: 0, 
  zIndex: 100, 
  display: "flex", 
  alignItems: "center", 
  justifyContent: "space-between", 
  padding: "0 52px", 
  height: 68, 
  background: scrolled ? "rgba(4,8,15,0.96)" : "rgba(4,8,15,0.5)", 
  backdropFilter: "blur(24px)", 
  borderBottom: scrolled ? "1px solid rgba(0,245,196,0.1)" : "1px solid transparent", 
  transition: "all 0.4s" 
}}>

  {/* Logo */}
  <span style={{ 
    fontSize: 26, 
    fontWeight: 900, 
    background: "linear-gradient(135deg,#fff 30%,#00f5c4)", 
    WebkitBackgroundClip: "text", 
    WebkitTextFillColor: "transparent" 
  }}>
    DC.
  </span>

  {/* Menu Links */}
  <div className="nav-links" style={{ display: "flex", gap: 2 }}>
    {NAV_ITEMS.map(n => (
      <button 
        key={n} 
        className={`nav-btn ${active === n ? "active" : ""}`} 
        onClick={() => scrollTo(n)} 
        style={{ color: active === n ? "#00f5c4" : "#64748b" }}
      >
        {n}
      </button>
    ))}
  </div>

  {/* Right Side Buttons */}
  <div style={{ display: "flex", gap: 12 }}>

    {/* Email Button */}
    <a 
      href="mailto:Dharmendrachaudhary4000@gmail.com?subject=Hiring%20You%20From%20Portfolio&body=Hello%20Dharmendra,%0A%0AI%20want%20to%20discuss%20a%20project%20with%20you."
      style={{ 
        fontSize: 13, 
        fontWeight: 700, 
        color: "#00f5c4", 
        textDecoration: "none", 
        border: "1px solid rgba(0,245,196,0.35)", 
        padding: "7px 18px", 
        borderRadius: 8 
      }}
    >
      Email ✉️
    </a>

    {/* WhatsApp Button */}
    <a 
      href="https://wa.me/918171601828?text=Hello%20Dharmendra,%20I%20saw%20your%20portfolio%20and%20want%20to%20discuss%20a%20project."
      target="_blank"
      rel="noopener noreferrer"
      style={{ 
        fontSize: 13, 
        fontWeight: 700, 
        color: "#00f5c4", 
        textDecoration: "none", 
        border: "1px solid rgba(0,245,196,0.35)", 
        padding: "7px 18px", 
        borderRadius: 8 
      }}
    >
      WhatsApp 💬
    </a>

    {/* Hamburger */}
    <button 
      className="hamburger" 
      style={{ 
        display: "none", 
        background: "none", 
        border: "none", 
        color: "#fff", 
        fontSize: 22, 
        cursor: "pointer" 
      }} 
      onClick={() => setMenuOpen(!menuOpen)}
    >
      ☰
    </button>

  </div>

</nav>

      {menuOpen && (
        <div style={{ position: "fixed", top: 68, left: 0, right: 0, zIndex: 99, background: "rgba(4,8,15,0.98)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,245,196,0.1)", flexDirection: "column", padding: "16px 0", display: "flex" }}>
          {NAV_ITEMS.map(n => <button key={n} onClick={() => scrollTo(n)} style={{ background: "none", border: "none", color: "#a0aec0", padding: "14px 32px", fontSize: 16, cursor: "pointer", textAlign: "left", fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 600 }}>{n}</button>)}
        </div>
      )}

      {/* HERO */}
      <section id="About" className="hero-section" style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "90px 10vw", minHeight: "95vh", gap: 40, flexWrap: "wrap" }}>
                <div className="hero-anim" style={{ flex: 1, minWidth: 280, maxWidth: 580 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,245,196,0.07)", border: "1px solid rgba(0,245,196,0.2)", borderRadius: 100, padding: "6px 16px", marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00f5c4", display: "inline-block", animation: "pulseGlow 2s infinite" }} />
            <span style={{ fontSize: 12, color: "#00f5c4", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>Open to Opportunities</span>
          </div>
          <p style={{ fontSize: 15, color: "#64748b", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>👋 Hello, I'm</p>
          <h1 style={{ fontSize: "clamp(44px,6.5vw,78px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 20, letterSpacing: -2 }}>
            <span style={{ color: "#f1f5f9" }}>Dharmendra</span><br />
            <span style={{ background: "linear-gradient(135deg,#00f5c4 0%,#7c6af7 55%,#f6ad55 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s linear infinite" }}>Chaudhary</span>
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 24, height: 38 }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: "#94a3b8" }}>{typed}</span>
            <span style={{ fontSize: 24, color: "#00f5c4", animation: "blink 1s infinite" }}>|</span>
          </div>
          <p style={{ color: "#64748b", lineHeight: 1.85, fontSize: 15.5, marginBottom: 34, maxWidth: 500 }}>
            Software Developer with hands-on experience building scalable web apps using <b style={{ color: "#00f5c4" }}>C#, ASP.NET, React</b> &amp; <b style={{ color: "#00f5c4" }}>Python</b>. Passionate about AI-powered solutions and clean architecture.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 44 }}>
            <a href="https://github.com/Chaudhary4000" target="_blank" style={{ background: "linear-gradient(135deg,#00f5c4,#00c9a7)", color: "#04080f", padding: "12px 26px", borderRadius: 9, fontWeight: 800, textDecoration: "none", fontSize: 14 }}>GitHub ↗</a>
            <a href="https://linkedin.com/in/dharmendra4000" target="_blank" style={{ border: "1.5px solid #7c6af7", color: "#7c6af7", padding: "12px 26px", borderRadius: 9, fontWeight: 700, textDecoration: "none", fontSize: 14, background: "transparent" }}>LinkedIn</a>
            <button onClick={() => scrollTo("Contact")} style={{ border: "1.5px solid rgba(255,255,255,0.15)", color: "#94a3b8", padding: "12px 26px", borderRadius: 9, fontWeight: 600, fontSize: 14, background: "transparent", cursor: "pointer" }}>Contact Me</button>
          </div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[["1+","Year Exp."],["4","Projects"],["5+","Tech Stacks"],["MCA","@ LPU"]].map(([v,l]) => (
              <div key={l} style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: "#00f5c4" }}>{v}</span>
                <span style={{ fontSize: 11, color: "#4a5568", letterSpacing: 1.2, textTransform: "uppercase" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
<div className="hero-visual" style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
  <div style={{ position: "relative", width: 300, height: 300 }}>
    
    {/* Outer spinning ring */}
    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px dashed rgba(0,245,196,0.3)", animation: "spinSlow 20s linear infinite" }} />
    
    {/* Inner spinning ring */}
    <div style={{ position: "absolute", inset: 15, borderRadius: "50%", border: "1px dashed rgba(124,106,247,0.2)", animation: "spinSlow 30s linear infinite reverse" }} />

    {/* Wrapper 1 - sirf positioning */}
<div style={{ 
  position: "absolute", 
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
}}>
  {/* Wrapper 2 - sirf animation */}
  <div style={{ 
    animation: "float 4s ease-in-out infinite",
  }}>
    {/* Wrapper 3 - circle + photo */}
    <div style={{ 
  width: 250, 
  height: 250,          // ← 238 se 250 karo - equal hona chahiye
  borderRadius: "50%", 
  border: "3px solid #00f5c4",
  overflow: "hidden",
  boxShadow: "0 0 0 6px rgba(0,245,196,0.1), 0 0 40px rgba(0,245,196,0.2), 0 0 80px rgba(124,106,247,0.15)", 
}}>
  <img 
    src={photo}
    alt="Dharmendra Chaudhary"
    style={{ 
      width: "107%", 
      height: "100%",   
      objectFit: "cover",   
      objectPosition: "50% 15%",
      display: "block"
    }}
  />
</div>
  </div>
</div>
  </div>
</div>
      </section>

      {/* SKILLS */}
      <section id="Skills" style={{ position: "relative", zIndex: 1, padding: "80px 10vw", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <SectionTitle>Technical Skills</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {Object.entries(SKILLS).map(([cat, items], ci) => (
            <div key={cat} className="skill-card" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "26px 28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <span style={{ fontSize: 18 }}>{CATEGORY_ICONS[cat]}</span>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#00f5c4", letterSpacing: 2.5, textTransform: "uppercase" }}>{cat}</span>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,rgba(0,245,196,0.18),transparent)", marginLeft: 8 }} />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {items.map((skill, si) => (
                  <div key={skill.name} className="skill-item" style={{ animationDelay: `${ci * 0.08 + si * 0.06}s` }}>
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentNode.querySelector(".skill-name").style.fontSize = "26px";
                      }}
                    />
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
    <section
  id="Experience"
  style={{
    position: "relative",
    zIndex: 1,
    padding: "80px 10vw",
    borderTop: "1px solid rgba(255,255,255,0.04)"
  }}
>
  <SectionTitle>Work Experience</SectionTitle>

  <div
    style={{
      borderLeft: "2px solid rgba(0,245,196,0.25)",
      paddingLeft: 32,
      marginLeft: 10,
      position: "relative"
    }}
  >
    {/* Current Experience - Digitalis Technologies */}
    <div
      style={{
        position: "absolute",
        left: -8,
        top: 10,
        width: 14,
        height: 14,
        borderRadius: "50%",
        background: "#00f5c4",
        boxShadow: "0 0 16px #00f5c4"
      }}
    />

    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16,
        padding: "30px 32px",
        marginBottom: 30
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 20
        }}
      >
        <div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 900,
              color: "#f1f5f9",
              marginBottom: 4
            }}
          >
            Software Developer
          </div>
          <div
            style={{
              fontSize: 14,
              color: "#7c6af7",
              fontWeight: 700
            }}
          >
            Digitalis Technologies — Delhi
          </div>
        </div>

        <span
          style={{
            fontSize: 12,
            color: "#64748b",
            background: "rgba(124,106,247,0.1)",
            border: "1px solid rgba(124,106,247,0.2)",
            borderRadius: 6,
            padding: "5px 14px",
            alignSelf: "flex-start",
            fontWeight: 700
          }}
        >
          June 2026 – Present
        </span>
      </div>

      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginBottom: 20,
          padding: 0
        }}
      >
        {[
          "Developing and customizing ERPNext applications using the Frappe Framework",
          "Creating custom DocTypes, Reports, Dashboards and Workflows",
          "Working with Python, JavaScript and MariaDB for backend and database development",
          "Integrating third-party APIs and automating business processes",
          "Maintaining and optimizing ERP modules for better performance and scalability"
        ].map((p, i) => (
          <li
            key={i}
            style={{
              fontSize: 14,
              color: "#94a3b8",
              lineHeight: 1.75,
              display: "flex",
              alignItems: "flex-start",
              gap: 10
            }}
          >
            <span
              style={{
                color: "#00f5c4",
                marginTop: 2,
                flexShrink: 0
              }}
            >
              ▸
            </span>
            {p}
          </li>
        ))}
      </ul>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8
        }}
      >
        {[
          "ERPNext",
          "Frappe",
          "Python",
          "JavaScript",
          "MariaDB",
          "REST API"
        ].map((t) => (
          <span
            key={t}
            style={{
              fontSize: 11,
              fontWeight: 700,
              background: "rgba(0,245,196,0.07)",
              border: "1px solid rgba(0,245,196,0.2)",
              color: "#00f5c4",
              borderRadius: 5,
              padding: "3px 10px"
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>

    {/* Previous Experience - 4CPLUS */}
    <div
      style={{
        position: "relative",
        marginTop: 20
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -40,
          top: 10,
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "#7c6af7",
          boxShadow: "0 0 16px #7c6af7"
        }}
      />

      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16,
          padding: "30px 32px"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 20
          }}
        >
          <div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 900,
                color: "#f1f5f9",
                marginBottom: 4
              }}
            >
              Software Developer
            </div>

            <div
              style={{
                fontSize: 14,
                color: "#7c6af7",
                fontWeight: 700
              }}
            >
              4CPLUS (INTERNET) Ltd — Ghaziabad
            </div>
          </div>

          <span
            style={{
              fontSize: 12,
              color: "#64748b",
              background: "rgba(124,106,247,0.1)",
              border: "1px solid rgba(124,106,247,0.2)",
              borderRadius: 6,
              padding: "5px 14px",
              alignSelf: "flex-start",
              fontWeight: 700
            }}
          >
            Oct 2024 – June 2026
          </span>
        </div>

        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginBottom: 20,
            padding: 0
          }}
        >
          {[
            "Built full-stack modules including authentication systems and user dashboards",
            "Integrated REST APIs for real-time data processing and enhanced functionality",
            "Developed database-driven applications using ASP.NET, C# and SQL Server",
            "Optimized application performance with clean and maintainable code",
            "Collaborated with frontend and backend teams to deliver production-ready features"
          ].map((p, i) => (
            <li
              key={i}
              style={{
                fontSize: 14,
                color: "#94a3b8",
                lineHeight: 1.75,
                display: "flex",
                alignItems: "flex-start",
                gap: 10
              }}
            >
              <span
                style={{
                  color: "#00f5c4",
                  marginTop: 2,
                  flexShrink: 0
                }}
              >
                ▸
              </span>
              {p}
            </li>
          ))}
        </ul>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8
          }}
        >
          {[
            "C#",
            "ASP.NET",
            "JavaScript",
            "SQL Server",
            "REST API"
          ].map((t) => (
            <span
              key={t}
              style={{
                fontSize: 11,
                fontWeight: 700,
                background: "rgba(0,245,196,0.07)",
                border: "1px solid rgba(0,245,196,0.2)",
                color: "#00f5c4",
                borderRadius: 5,
                padding: "3px 10px"
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

      {/* PROJECTS */}
      <section id="Projects" style={{ position: "relative", zIndex: 1, padding: "80px 10vw", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <SectionTitle>Projects</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
          {PROJECTS.map(p => (
            <div key={p.title} className="project-card" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${p.color}33`, borderRadius: 18, padding: 28, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: p.color, borderRadius: "18px 18px 0 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 26 }}>{p.icon}</span>
                  <span style={{ fontSize: 18, fontWeight: 900, color: p.color }}>{p.title}</span>
                </div>
                {p.link && <a href={p.link} target="_blank" style={{ fontSize: 12, fontWeight: 700, color: p.color, border: `1px solid ${p.color}`, borderRadius: 20, padding: "3px 12px", textDecoration: "none" }}>↗ Live</a>}
              </div>
              <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.8, marginBottom: 18 }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {p.tech.map(t => <span key={t} style={{ fontSize: 11, fontWeight: 700, border: `1px solid ${p.color}44`, color: p.color, borderRadius: 5, padding: "3px 9px" }}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="Education" style={{ position: "relative", zIndex: 1, padding: "80px 10vw", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <SectionTitle>Education</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 18, marginBottom: 22 }}>
          {[
            { deg: "Master of Computer Applications (MCA)", school: "Lovely Professional University (LPU), Punjab", year: "2025 – 2027", status: "Pursuing" },
            { deg: "Bachelor of Computer Applications (BCA)", school: "GLA University, Mathura", year: "2025" },
            { deg: "Intermediate", school: "Delhi Public School, Mathura", year: "2022" },
            { deg: "High School", school: "Delhi Public School, Mathura", year: "2020" },
          ].map((e,i) => (
            <div key={i} className="edu-card" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "22px 20px" }}>
              <div style={{ fontSize: 12, color: "#7c6af7", fontWeight: 800, marginBottom: 7, letterSpacing: 1 }}>{e.year}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#e2e8f0", marginBottom: 6, lineHeight: 1.4 }}>{e.deg}</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>{e.school}</div>
              {e.status && <span style={{ display: "inline-block", marginTop: 10, background: "rgba(0,245,196,0.1)", border: "1px solid rgba(0,245,196,0.3)", color: "#00f5c4", borderRadius: 20, padding: "2px 12px", fontSize: 11, fontWeight: 800 }}>{e.status}</span>}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(246,173,85,0.05)", border: "1px solid rgba(246,173,85,0.2)", borderRadius: 12, padding: "18px 24px" }}>
          <span style={{ fontSize: 22 }}>🏅</span>
          <span style={{ color: "#e2e8f0", fontSize: 14 }}>Certificate of Appreciation — Workshop on <b style={{ color: "#f6ad55" }}>Web Development Technologies</b></span>
        </div>
      </section>


      {/* CONTACT */}
      <section id="Contact" style={{ position: "relative", zIndex: 1, padding: "80px 10vw", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <SectionTitle>Get In Touch</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18 }}>
          {[
            { icon: "📧", label: "Email", val: "Dharmendrachaudhary4000@gmail.com", href: "mailto:Dharmendrachaudhary4000@gmail.com" },
            { icon: "📞", label: "Phone", val: "+91 8171601828", href: "tel:+918171601828" },
            { icon: "💼", label: "LinkedIn", val: "linkedin.com/in/dharmendra4000", href: "https://linkedin.com/in/dharmendra4000" },
            { icon: "💻", label: "GitHub", val: "github.com/dharmendra4000", href: "https://github.com/dharmendra4000" },
          ].map(c => (
            <a key={c.label} href={c.href} target="_blank" className="contact-card" style={{ display: "flex", alignItems: "center", gap: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "20px 22px", textDecoration: "none" }}>
              <span style={{ fontSize: 28 }}>{c.icon}</span>
              <div>
                <div style={{ fontSize: 11, color: "#4a5568", fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>{c.label}</div>
                <div style={{ fontSize: 13, color: "#94a3b8" }}>{c.val}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "28px 20px", fontSize: 13, borderTop: "1px solid rgba(255,255,255,0.04)", position: "relative", zIndex: 1, color: "#4a5568" }}>
        Designed & Built by <span style={{ color: "#00f5c4", fontWeight: 800 }}>Dharmendra Chaudhary</span> · 2025
      </footer>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{ marginBottom: 44, textAlign: "center" }}>
      <h2 style={{ fontSize: 34, fontWeight: 900, color: "#f7fafc", letterSpacing: -1 }}>{children}</h2>
      <div style={{ width: 52, height: 3, background: "linear-gradient(90deg,#00f5c4,#7c6af7)", borderRadius: 4, margin: "12px auto 0" }} />
    </div>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `${r},${g},${b}`;
}
