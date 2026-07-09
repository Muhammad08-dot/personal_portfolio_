import { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../utils/animations';

const FloatingGeometry = lazy(() => import('../components/3d/FloatingGeometry'));

// 1. WORK EXPERIENCE DATA
const experienceData = [
  {
    tabCompany: "Freelance",
    tabYear: "2024 - Pres.",
    title: "Full-Stack Developer & AI Explorer",
    fullLocation: "@ Freelance | 2024 – Present | 📍 Pakistan",
    bullets: [
      "Architecting custom full-stack web applications and API-integrated outreach platforms.",
      "Formulating innovative automated workflows using n8n with chat triggers and AI agent nodes.",
      "Designing intelligent autonomous tools like LeadBot AI and the Agentic Research Bot.",
      "Leveraging 'vibe coding' models inside advanced IDE environments to rapidly prototype and ship solutions."
    ],
    tags: ["React", "Node.js", "n8n Automation", "Firebase", "LangChain", "CrewAI"],
    color: "#00ff41",
    logo: "💻"
  },
  {
    tabCompany: "Dev Hub",
    tabYear: "2026",
    title: "Remote AI/ML Intern",
    fullLocation: "@ Developers Hub | 2026 (2 Months) | 📍 Remote",
    bullets: [
      "Engineered and tested predictive machine learning models and local data preprocessing pipelines.",
      "Collaborated with remote teams to integrate smart AI decision components into live production environments."
    ],
    tags: ["Machine Learning", "Python", "Data Pipelines", "OpenCV"],
    color: "#00d4ff",
    logo: "🧠"
  },
  {
    tabCompany: "Arfa Karim",
    tabYear: "2025",
    title: "Python Developer Intern",
    fullLocation: "@ Arfa Karim Technology Park | 2025 | 📍 Lahore, Pakistan",
    bullets: [
      "Optimized backend services, creating robust procedural standalone automation scripts.",
      "Researched multi-agent execution frameworks and structural LLM routing techniques."
    ],
    tags: ["Python", "Core Automation", "Backend Logic", "FastAPI"],
    color: "#bd93f9",
    logo: "🐍"
  },
  {
    tabCompany: "TechHub",
    tabYear: "2024",
    title: "Web Development Intern",
    fullLocation: "@ TechHub | 2024 (3 Months) | 📍 Pakistan",
    bullets: [
      "Designed and optimized responsive frontend layouts and modular backend routes.",
      "Maintained clean, production-grade source control across collaborative team environments."
    ],
    tags: ["React", "Node.js", "Express", "JavaScript", "Tailwind CSS"],
    color: "#ffb86c",
    logo: "🌐"
  }
];

// 2. ACADEMIC BACKGROUND DATA
const academicData = [
  {
    icon: "🎓",
    institution: "National University of Modern Languages (NUML)",
    degree: "BS (Artificial Intelligence) — Currently in 5th Semester",
    meta: "📅 2024 – 2028 | ⭐ Focus: Computer Vision, Algorithms & RAG Architectures"
  }
];

// 3. REPURPOSED CERTIFICATIONS & AWARDS DATA
const learningTracks = [
  {
    icon: "✨",
    title: "Advanced Agentic AI Track",
    subtitle: "Saylani Mass IT Training (SMIT)",
    meta: "📅 2026 – Continuing (Faisalabad)"
  },
  {
    icon: "🧠",
    title: "AI & Machine Learning Track",
    subtitle: "Career Institute",
    meta: "📅 2025"
  },
  {
    icon: "📜",
    title: "Certified Web Developer",
    subtitle: "NAVTTC & Tech-Hub Program",
    meta: "📅 2024"
  }
];

export default function Experience() {
  const [activeJob, setActiveJob] = useState(0);

  return (
    <div style={{ background: 'var(--bg-primary)', paddingTop: '80px' }}>
      {/* Header */}
      <section style={{ padding: '60px 24px', position: 'relative', overflow: 'hidden', minHeight: '320px' }}>
        <div style={{ position: 'absolute', right: '5%', top: '-30px', width: '40%', height: '380px', opacity: 0.6, pointerEvents: 'none' }}>
          <Suspense fallback={null}>
            <FloatingGeometry shape="dodecahedron" color="#00d4ff" height="380px" />
          </Suspense>
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="section-header">// experience</motion.p>
            <motion.h1 variants={fadeUp} className="section-title" style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: '16px' }}>
              Work <span style={{ color: 'var(--accent-primary)' }}>Experience</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px' }}>
              Where I've been, what I've built, and what I've learned along the way.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Work Experience (Tabbed) ── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} style={{ fontFamily: 'JetBrains Mono', fontSize: '14px', color: 'var(--accent-primary)', marginBottom: '32px' }}>
              $ cat experience.log
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="grid grid-cols-[60px_1fr] md:grid-cols-[220px_1fr] border border-[var(--border)] rounded-[10px] overflow-hidden min-h-[400px]"
            >
              {/* Tab sidebar */}
              <div className="bg-[var(--bg-secondary)] border-r border-[var(--border)] flex flex-col">
                {experienceData.map((job, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveJob(i)}
                    className={`relative flex-1 md:w-full flex md:block items-center justify-center md:items-start md:justify-start p-0 md:p-5 text-left transition-all duration-200 cursor-pointer border-b last:border-b-0 md:border-b border-[var(--border)] ${activeJob === i ? 'bg-[rgba(255,255,255,0.03)]' : 'hover:bg-[rgba(255,255,255,0.01)]'}`}
                  >
                    {/* Active indicator */}
                    {activeJob === i && (
                      <div className="absolute top-0 bottom-0 left-0 w-[3px]" style={{ background: job.color }} />
                    )}
                    
                    {/* Mobile View (Straight Vertical) */}
                    <div className="md:hidden flex flex-col items-center gap-3 py-4 h-full justify-center">
                      <div className="flex items-center justify-center font-mono font-bold text-[14px] flex-shrink-0" style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${job.color}20`, border: `1px solid ${job.color}40`, color: job.color }}>
                        {job.logo}
                      </div>
                      <div className="flex flex-col items-center justify-center" style={{ gap: '2px' }}>
                        {job.tabCompany.split('').map((char, charIdx) => (
                          <span 
                            key={charIdx}
                            style={{ 
                              fontFamily: 'JetBrains Mono', 
                              fontSize: '11px', 
                              fontWeight: 700, 
                              lineHeight: '1',
                              color: activeJob === i ? job.color : 'var(--text-secondary)',
                              textTransform: 'uppercase'
                            }}
                          >
                            {char === ' ' ? '\u00A0' : char}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Desktop View */}
                    <div className="hidden md:block">
                      <div className="flex items-center justify-center font-mono font-bold text-[12px] flex-shrink-0 mb-2" style={{ width: '36px', height: '36px', borderRadius: '8px', background: `${job.color}20`, border: `1px solid ${job.color}40`, color: job.color }}>
                        {job.logo}
                      </div>
                      <div>
                        <div style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', fontWeight: 600, color: activeJob === i ? job.color : 'var(--text-secondary)' }}>{job.tabCompany}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{job.tabYear}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <motion.div
                key={activeJob}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4 sm:p-5 md:p-8 bg-[var(--bg-primary)] overflow-y-auto"
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '24px' }}>
                  <div>
                    <h2 style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                      {experienceData[activeJob].title}
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'JetBrains Mono', fontSize: '14px', color: experienceData[activeJob].color }}>{experienceData[activeJob].fullLocation}</span>
                    </div>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', paddingLeft: 0 }}>
                  {experienceData[activeJob].bullets.map((bullet, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ color: 'var(--accent-primary)', fontFamily: 'JetBrains Mono', flexShrink: 0, marginTop: '2px' }}>▸</span>
                      <span style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '15px' }}>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {experienceData[activeJob].tags.map(t => (
                    <span key={t} className="tech-tag" style={{ fontSize: '12px' }}>[{t}]</span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Education ── */}
      <section style={{ padding: '80px 24px', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} style={{ marginBottom: '48px' }}>
              <p className="section-header">// education</p>
              <h2 className="section-title">Academic Background</h2>
            </motion.div>

            {academicData.map((edu, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="glow-card"
                style={{ padding: '32px', display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}
              >
                <div style={{ fontSize: '48px' }}>{edu.icon}</div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <h3 style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '20px', color: 'var(--text-primary)', marginBottom: '4px' }}>{edu.institution}</h3>
                  <p style={{ fontFamily: 'JetBrains Mono', color: 'var(--accent-primary)', fontSize: '15px', marginBottom: '8px' }}>{edu.degree}</p>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: 'var(--text-muted)' }}>{edu.meta}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Core Learning Tracks (Repurposed from Certifications) ── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} style={{ marginBottom: '48px' }}>
              <p className="section-header">// active_learning</p>
              <h2 className="section-title">Core Training & Tracks</h2>
            </motion.div>

            <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              {learningTracks.map((track, i) => (
                <motion.div key={i} variants={fadeUp} className="glow-card" style={{ padding: '24px' }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>{track.icon}</div>
                  <h3 style={{ fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)', marginBottom: '6px' }}>{track.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>{track.subtitle}</p>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)' }}>{track.meta}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
