import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../utils/animations';
import { skills as skillsData } from '../config/siteConfig';

const FloatingGeometry = lazy(() => import('../components/3d/FloatingGeometry'));

const categories = [
  { key: 'coreAI', label: 'AI & ML', color: '#ff5555' },
  { key: 'frontend', label: 'Frontend', color: '#00ff41' },
  { key: 'backend', label: 'Backend', color: '#bd93f9' },
  { key: 'database', label: 'Database', color: '#f1fa8c' },
  { key: 'toolsCloud', label: 'Tools & Cloud', color: '#ffb86c' },
];

export default function Skills() {
  return (
    <div style={{ background: 'var(--bg-primary)', paddingTop: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ── Header ── */}
      <section style={{ padding: '60px 24px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '5%', top: '-20px', width: '40%', height: '400px', opacity: 0.4, pointerEvents: 'none' }}>
          <Suspense fallback={null}>
            <FloatingGeometry shape="torusKnot" color="#bd93f9" height="400px" />
          </Suspense>
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="section-header">// skills --stack</motion.p>
            <motion.h1 variants={fadeUp} className="section-title" style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: '16px' }}>
              Skill <span style={{ color: 'var(--accent-primary)' }}>Stack</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: 1.7, maxWidth: '600px' }}>
              Explore my technical ecosystem. From Agentic AI to Full-Stack Web Development.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Responsive Grid ── */}
      <section style={{ flex: 1, padding: '0 24px 60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {categories.map((cat) => {
              const skillsList = (skillsData as any)[cat.key] || [];
              if (skillsList.length === 0) return null;
              
              return (
                <motion.div key={cat.key} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger}>
                  <motion.h2 
                    variants={fadeUp} 
                    style={{ 
                      fontFamily: 'JetBrains Mono', 
                      color: cat.color, 
                      fontSize: '20px', 
                      marginBottom: '20px', 
                      borderBottom: `1px solid ${cat.color}40`, 
                      paddingBottom: '8px',
                      display: 'inline-block'
                    }}
                  >
                    // {cat.label}
                  </motion.h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '16px' }}>
                    {skillsList.map((skill: any) => (
                      <motion.div 
                        key={skill.name} 
                        variants={fadeUp} 
                        className="glow-card" 
                        style={{ 
                          padding: '24px 16px', 
                          border: `1px solid ${cat.color}40`, 
                          borderRadius: '12px', 
                          background: 'var(--bg-secondary)', 
                          textAlign: 'center',
                          boxShadow: `0 4px 20px ${cat.color}10`,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <div style={{ fontSize: '32px', marginBottom: '16px' }}>{skill.icon}</div>
                        <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>{skill.name}</div>
                        <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>{skill.level}% | {skill.years}y exp</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
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
