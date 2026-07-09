import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger, slideLeft, slideRight } from '../utils/animations';
import { siteConfig } from '../config/siteConfig';

const FloatingGeometry = lazy(() => import('../components/3d/FloatingGeometry'));

const timeline = [
  { year: '2024 (Early)', icon: '>', title: 'Started BS in Artificial Intelligence at NUML', desc: 'Began formal undergraduate journey in Artificial Intelligence at the National University of Modern Languages. Developed a strong foundation in core computer science, data structures, algorithms, and machine learning principles.' },
  { year: '2024 (Mid)', icon: '>', title: 'Certified Full-Stack Web Developer', desc: 'Expanded engineering capabilities beyond AI logic. Successfully completed professional multi-stack web development training through NAVTTC and Tech-Hub, mastering modern frontend and backend architectures.' },
  { year: '2025', icon: '>', title: 'Computer Vision Dashboard Launched', desc: 'Engineered and deployed a standalone real-time Face Recognition System leveraging Python, OpenCV, and a custom data-management dashboard to streamline model logging and local training pipelines.' },
  { year: '2026 (Early)', icon: '>', title: 'Professional Python Internship & Agentic Bot', desc: 'Completed a formal industry internship as a Python Developer. Transitioned into advanced autonomous systems, successfully building the \'Agentic Research Bot\' to automate complex multi-agent academic paper retrieval and aggregation.' },
  { year: '2026 (Mid)', icon: '>', title: 'LeadBot AI & Advanced n8n Automation', desc: 'Built and deployed \'LeadBot AI\', a full-stack outreach platform integrated with active communication APIs. Formulated complex automated workflows using n8n with chat triggers and AI agent nodes to streamline digital content production and daily professional outreach pipelines.' },
  { year: '2026 (Current)', icon: '$', title: 'Hackathons & RAG Engineering', desc: 'Currently an active member of team \'RouteForce\' competing in the AMD Developer Hackathon Act II. Deeply focusing on Agentic AI scaling, RAG-based architectures, and shipping production-grade autonomous automation systems.' },
];

const interests = [
  { icon: '🖥️', label: 'Open Source', desc: 'Contributing to the community' },
  { icon: '🎮', label: 'Game Dev', desc: 'Indie games on weekends' },
  { icon: '🎵', label: 'Music', desc: 'Guitar & lo-fi production' },
  { icon: '📚', label: 'Reading', desc: 'Sci-fi & tech books' },
  { icon: '🍿', label: 'Series & Movies', desc: 'Loves watching series & movies' },
];

export default function About() {
  return (
    <div style={{ background: 'var(--bg-primary)', paddingTop: '80px' }}>
      {/* ── Header ── */}
      <section style={{ padding: '60px 24px 0', position: 'relative', overflow: 'hidden', minHeight: '400px' }}>
        <div style={{ position: 'absolute', right: 0, top: 0, width: '45%', height: '400px', opacity: 0.7, pointerEvents: 'none' }}>
          <Suspense fallback={null}>
            <FloatingGeometry shape="octahedron" color="#00ff41" height="400px" />
          </Suspense>
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="section-header">// about</motion.p>
            <motion.h1 variants={fadeUp} className="section-title" style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: '24px' }}>
              About <span style={{ color: 'var(--accent-primary)' }}>Me</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: 1.7, maxWidth: '600px' }}>
              A developer who cares deeply about craft, performance, and the human experience of software.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Bio ── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'start' }}
          >
            <motion.div variants={slideLeft}>
              <div className="terminal-window">
                <div className="terminal-titlebar">
                  <div className="terminal-dot red" />
                  <div className="terminal-dot yellow" />
                  <div className="terminal-dot green" />
                  <span style={{ marginLeft: '16px', fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)' }}>~ bio.md</span>
                </div>
                <div className="terminal-body" style={{ lineHeight: 1.9 }}>
                  <p style={{ color: 'var(--accent-secondary)' }}>&gt; whoami</p>
                  <br />
                  <p style={{ color: 'var(--text-secondary)' }}>
                    I'm {siteConfig.name.split(' ')[0]} — a {siteConfig.location}-based developer exploring Agentic AI and ML.
                    My journey started with web development, and evolved into building intelligent systems
                    that predict and shape the future.
                  </p>
                  <br />
                  <p style={{ color: 'var(--text-secondary)' }}>
                    I believe great software is an exercise in empathy — understanding the user's needs so deeply
                    that the interface becomes invisible. I obsess over performance, accessibility, and developer
                    experience in equal measure.
                  </p>
                  <br />
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Outside of work, I'm a hackathon addict, occasional conference speaker, and maintainer of
                    a few open source tools that have found their way into production codebases around the world.
                  </p>
                  <br />
                  <p style={{ color: 'var(--accent-primary)' }}>$ <span className="blink" style={{ color: 'var(--text-primary)' }}>_</span></p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={slideRight}>
              {/* Profile Image Frame */}
              <div className="terminal-window" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
                <div className="terminal-titlebar" style={{ padding: '20px 24px', margin: 0, borderBottom: '1px solid var(--border)', background: 'var(--bg-primary)' }}>
                  <div className="terminal-dot red" />
                  <div className="terminal-dot yellow" />
                  <div className="terminal-dot green" />
                  <span style={{ marginLeft: '16px', fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)' }}>~ me.jpeg</span>
                </div>
                <div className="relative" style={{ flex: 1, minHeight: '350px', position: 'relative' }}>
                  <img 
                    src="/me.jpeg" 
                    alt="Muhammad Abdullah" 
                    className="object-cover object-center w-full h-full"
                    style={{ 
                      position: 'absolute',
                      inset: 0,
                      display: 'block',
                      filter: 'grayscale(20%) contrast(1.1) brightness(0.85)', 
                    }} 
                  />
                  {/* Neon-green border shadow overlay */}
                  <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 50px rgba(0, 255, 65, 0.15)', pointerEvents: 'none' }} />
                </div>
              </div>

              {/* Availability */}
              <div style={{ marginTop: '24px', padding: '20px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="pulse-dot green" />
                <div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: '14px', color: 'var(--accent-primary)', fontWeight: 600 }}>Available for Work</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>Open to freelance & full-time opportunities</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{ padding: '80px 24px', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={stagger}>
            <motion.div variants={fadeUp} style={{ marginBottom: '60px', textAlign: 'center' }}>
              <p className="section-header">// journey</p>
              <h2 className="section-title">My Timeline</h2>
            </motion.div>

            <div style={{ position: 'relative' }}>
              {/* Center line (Desktop) */}
              <div className="hidden md:block" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 0, bottom: 0, width: '2px', borderLeft: '2px dashed var(--accent-primary)', background: 'transparent' }} />
              {/* Left line (Mobile) */}
              <div className="block md:hidden absolute left-5 top-0 bottom-0 w-[2px] border-l-2 border-dashed border-[var(--accent-primary)] bg-transparent transform -translate-x-1/2" />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                {timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className={`flex relative w-full ${i % 2 === 0 ? 'md:pr-[50%] md:justify-start' : 'md:pl-[50%] md:justify-end'} pl-16 md:pl-0`}
                  >
                    {/* Center dot */}
                    <div className="absolute left-5 md:left-1/2 transform -translate-x-1/2 top-6 w-10 h-10 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent-primary)] flex items-center justify-center font-mono font-bold text-lg text-[var(--accent-primary)] z-10 shadow-[0_0_15px_var(--glow)]">
                      {item.icon}
                    </div>

                    <div
                      className={`max-w-[380px] w-full p-5 rounded-[10px] border border-[var(--border)] bg-[var(--bg-primary)] ${i % 2 === 0 ? 'md:mr-14' : 'md:ml-14'}`}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <span style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--accent-primary)', background: 'rgba(0,255,65,0.1)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(0,255,65,0.2)' }}>{item.year}</span>
                        <h3 style={{ fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>{item.title}</h3>
                      </div>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Interests ── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={stagger}>
            <motion.div variants={fadeUp} style={{ marginBottom: '48px', textAlign: 'center' }}>
              <p className="section-header">// hobbies</p>
              <h2 className="section-title">Beyond the Code</h2>
            </motion.div>

            <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
              {interests.map(item => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className="glow-card"
                  style={{ padding: '28px', textAlign: 'center' }}
                >
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>{item.icon}</div>
                  <h3 style={{ fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)', marginBottom: '6px' }}>{item.label}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Resume Download ── */}
      <section style={{ padding: '80px 24px', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.button
              variants={fadeUp}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 32px', borderRadius: '8px',
                background: 'var(--accent-primary)', color: '#000',
                fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '14px',
                border: 'none', cursor: 'pointer',
                boxShadow: '0 0 20px var(--glow)',
              }}
            >
              ↓ Download Resume (PDF)
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
