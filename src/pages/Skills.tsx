import { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../utils/animations';

const FloatingGeometry = lazy(() => import('../components/3d/FloatingGeometry'));

type Category = 'frontend' | 'backend' | 'database' | 'devops' | 'tools' | 'learning';

const categories: { key: Category; label: string; icon: string; color: string }[] = [
  { key: 'frontend', label: 'Frontend', icon: '🎨', color: '#00ff41' },
  { key: 'backend', label: 'Backend', icon: '⚙️', color: '#00d4ff' },
  { key: 'database', label: 'Database', icon: '🗄️', color: '#bd93f9' },
  { key: 'devops', label: 'DevOps & Cloud', icon: '☁️', color: '#ffb86c' },
  { key: 'tools', label: 'Tools', icon: '🔧', color: '#ff5555' },
  { key: 'learning', label: 'Learning', icon: '📖', color: '#50fa7b' },
];

const customSkills: Record<Category, { name: string; level: number; levelText: string; expText: string; icon: string }[]> = {
  frontend: [
    { name: "React", level: 90, levelText: "Expert", expText: "1+ y exp", icon: "⚛️" },
    { name: "JavaScript", level: 90, levelText: "Expert", expText: "1+ y exp", icon: "🌐" },
    { name: "TypeScript", level: 85, levelText: "Advanced", expText: "1+ y exp", icon: "🌐" },
    { name: "HTML/CSS", level: 95, levelText: "Expert", expText: "2y exp", icon: "🎨" },
  ],
  backend: [
    { name: "Node.js", level: 85, levelText: "Advanced", expText: "1+ y exp", icon: "🟢" },
    { name: "Express", level: 85, levelText: "Advanced", expText: "1+ y exp", icon: "⚡" },
    { name: "FastAPI", level: 80, levelText: "Advanced", expText: "1+ y exp", icon: "🚀" },
    { name: "LangChain & CrewAI", level: 85, levelText: "Advanced", expText: "1-2y exp", icon: "🤖" },
  ],
  database: [
    { name: "Firebase", level: 85, levelText: "Advanced", expText: "1y exp", icon: "🔥" },
    { name: "MySQL", level: 80, levelText: "Advanced", expText: "1y exp", icon: "🐬" },
    { name: "PostgreSQL", level: 80, levelText: "Advanced", expText: "2y exp", icon: "🐘" },
    { name: "MongoDB", level: 85, levelText: "Advanced", expText: "2y exp", icon: "🍃" },
  ],
  tools: [
    { name: "Cursor & Claude Code", level: 95, levelText: "Power User", expText: "1y exp", icon: "🚀" },
    { name: "Antigravity & Gemini CLI", level: 95, levelText: "Power User", expText: "1y exp", icon: "🧠" },
    { name: "n8n Automation", level: 85, levelText: "Advanced", expText: "1-2y exp", icon: "🤖" },
    { name: "Git / GitHub", level: 90, levelText: "Expert", expText: "3y exp", icon: "📦" },
  ],
  learning: [
    { name: "Vibe Coding", level: 100, levelText: "Expert", expText: "2y exp", icon: "✨" },
    { name: "OpenCV (CV)", level: 75, levelText: "Intermediate", expText: "1y exp", icon: "👁️" },
  ],
  devops: [
    { name: "Git / GitHub", level: 90, levelText: "Expert", expText: "3y exp", icon: "📦" },
    { name: "Netlify & Vercel", level: 85, levelText: "Advanced", expText: "1-2y exp", icon: "☁️" },
    { name: "Firebase Cloud", level: 85, levelText: "Advanced", expText: "1y exp", icon: "🔥" },
    { name: "Docker Containers", level: 75, levelText: "Intermediate", expText: "1y exp", icon: "🐳" },
  ]
};

function SkillBar({ level, color }: { level: number; color: string }) {
  return (
    <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        style={{ height: '100%', background: `linear-gradient(90deg, ${color}, ${color}aa)`, borderRadius: '2px', boxShadow: `0 0 8px ${color}60` }}
      />
    </div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<Category>('frontend');

  const currentSkills = customSkills[activeCategory] || [];
  const activeColor = categories.find(c => c.key === activeCategory)?.color || '#00ff41';

  return (
    <div style={{ background: 'var(--bg-primary)', paddingTop: '80px' }}>
      {/* ── Header ── */}
      <section style={{ padding: '60px 24px', position: 'relative', overflow: 'hidden', minHeight: '360px' }}>
        <div style={{ position: 'absolute', right: '5%', top: '-20px', width: '40%', height: '400px', opacity: 0.7, pointerEvents: 'none' }}>
          <Suspense fallback={null}>
            <FloatingGeometry shape="torusKnot" color="#bd93f9" height="400px" />
          </Suspense>
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="section-header">// skills</motion.p>
            <motion.h1 variants={fadeUp} className="section-title" style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: '16px' }}>
              Skills & <span style={{ color: 'var(--accent-primary)' }}>Technologies</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: 1.7, maxWidth: '600px' }}>
              Tools, languages, and frameworks I use to bring ideas to life.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Category Tabs ── */}
      <section style={{ padding: '0 24px 60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Tab buttons */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '48px' }}
            >
              {categories.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '10px 20px', borderRadius: '8px', cursor: 'pointer',
                    fontFamily: 'JetBrains Mono', fontSize: '13px', fontWeight: 600,
                    border: `1px solid ${activeCategory === cat.key ? cat.color : 'var(--border)'}`,
                    background: activeCategory === cat.key ? `${cat.color}18` : 'var(--bg-secondary)',
                    color: activeCategory === cat.key ? cat.color : 'var(--text-secondary)',
                    boxShadow: activeCategory === cat.key ? `0 0 15px ${cat.color}40` : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>{cat.icon}</span> {cat.label}
                </button>
              ))}
            </motion.div>

            {/* Skills Grid */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}
            >
              {currentSkills.length > 0 ? (
                currentSkills.map((skill) => (
                  <div
                    key={skill.name}
                    style={{
                      padding: '24px',
                      borderRadius: '10px',
                      border: '1px solid var(--border)',
                      background: 'var(--bg-secondary)',
                      transition: 'all 0.3s ease',
                      cursor: 'default',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = activeColor;
                      el.style.boxShadow = `0 0 20px ${activeColor}30`;
                      el.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = 'var(--border)';
                      el.style.boxShadow = 'none';
                      el.style.transform = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '24px' }}>{skill.icon}</span>
                        <h3 style={{ fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>{skill.name}</h3>
                      </div>
                      <span style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: activeColor, fontWeight: 700 }}>{skill.level}%</span>
                    </div>

                    <SkillBar level={skill.level} color={activeColor} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {skill.levelText}
                      </span>
                      <span style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)' }}>
                        {skill.expText}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', border: '1px dashed var(--border)', borderRadius: '10px' }}>
                  No active environments configured for this category.
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Row ── */}
      <section style={{ padding: '60px 24px', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p className="section-header">// expertise</p>
              <h2 className="section-title">By the Numbers</h2>
            </motion.div>

            <motion.div
              variants={stagger}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}
            >
              {[
                { label: 'Languages Known', value: '5+', icon: '🌐', desc: 'JS, TS, SQL, HTML/CSS, Bash' },
                { label: 'Frameworks Used', value: '8+', icon: '⚡', desc: 'CrewAI, LangChain, React, n8n, Node.js, Express, FastAPI, OpenCV' },
                { label: 'Years Coding', value: '1+', icon: '💻', desc: 'Active development on GitHub' },
                { label: 'Autonomous Projects Shipped', value: '10+', icon: '🔗', desc: 'Deployments like LeadBot AI, Agentic Research Bot, and Face Dashboards' },
              ].map(item => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className="glow-card"
                  style={{ padding: '28px', textAlign: 'center' }}
                >
                  <div style={{ fontSize: '36px', marginBottom: '12px' }}>{item.icon}</div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '32px', color: 'var(--accent-primary)', marginBottom: '8px' }}>{item.value}</div>
                  <h3 style={{ fontFamily: 'JetBrains Mono', fontSize: '14px', color: 'var(--text-primary)', marginBottom: '8px' }}>{item.label}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
