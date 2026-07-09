import { Suspense, lazy, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, stagger } from '../utils/animations';
import { skills as skillsData } from '../config/siteConfig';

const FloatingGeometry = lazy(() => import('../components/3d/FloatingGeometry'));

const categories = [
  { key: 'coreAI', label: 'AI & ML', color: '#ff5555', icon: '🧠' },
  { key: 'frontend', label: 'Frontend', color: '#00ff41', icon: '🖥️' },
  { key: 'backend', label: 'Backend', color: '#bd93f9', icon: '⚙️' },
  { key: 'database', label: 'Database', color: '#f1fa8c', icon: '🗄️' },
  { key: 'toolsCloud', label: 'Tools & Cloud', color: '#ffb86c', icon: '☁️' },
];

export default function Skills() {
  const [activeCategoryKey, setActiveCategoryKey] = useState<string | null>(null);

  const activeCategory = categories.find(c => c.key === activeCategoryKey);
  const activeSkillsList = activeCategory ? (skillsData as any)[activeCategory.key] || [] : [];

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
            <motion.p variants={fadeUp} className="section-header">// skills --interactive</motion.p>
            <motion.h1 variants={fadeUp} className="section-title" style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: '16px' }}>
              Skill <span style={{ color: 'var(--accent-primary)' }}>Modules</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: 1.7, maxWidth: '600px' }}>
              Explore my technical ecosystem. Select a category below to drill down into specific technologies and tools.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Drill-Down Interactive System ── */}
      <section style={{ flex: 1, padding: '0 24px 60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', minHeight: '400px' }}>
          <AnimatePresence mode="wait">
            {!activeCategoryKey ? (
              // --- CATEGORY VIEW (DEFAULT) ---
              <motion.div
                key="categories-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
                  {categories.map((cat) => {
                    const skillCount = ((skillsData as any)[cat.key] || []).length;
                    
                    return (
                      <motion.div 
                        key={cat.key} 
                        className="glow-card" 
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveCategoryKey(cat.key)}
                        style={{ 
                          padding: '32px 24px', 
                          border: `1px solid ${cat.color}40`, 
                          borderRadius: '16px', 
                          background: 'var(--bg-secondary)', 
                          textAlign: 'center',
                          boxShadow: `0 4px 20px ${cat.color}10`,
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>{cat.icon}</div>
                        <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '20px', color: 'var(--text-primary)' }}>{cat.label}</div>
                        <div style={{ marginTop: '12px', fontSize: '13px', color: cat.color, opacity: 0.9, backgroundColor: `${cat.color}15`, padding: '4px 12px', borderRadius: '12px' }}>
                          {skillCount} {skillCount === 1 ? 'Skill' : 'Skills'}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              // --- SUB-SKILLS VIEW (ACTIVE) ---
              <motion.div
                key="skills-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header & Back Button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => setActiveCategoryKey(null)}
                    style={{ 
                      background: 'var(--bg-secondary)', 
                      border: '1px solid var(--border)', 
                      color: 'var(--text-primary)', 
                      padding: '8px 16px', 
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.borderColor = activeCategory?.color || 'var(--accent-primary)'}
                    onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                  >
                    <span>←</span> Back to Categories
                  </button>
                  <h2 style={{ fontFamily: 'JetBrains Mono', color: activeCategory?.color, fontSize: '24px', margin: 0 }}>
                    {activeCategory?.icon} {activeCategory?.label}
                  </h2>
                </div>

                {/* Sub-Skills Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '16px' }}>
                  {activeSkillsList.map((skill: any, index: number) => (
                    <motion.div 
                      key={skill.name} 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="glow-card" 
                      style={{ 
                        padding: '24px 16px', 
                        border: `1px solid ${activeCategory?.color}40`, 
                        borderRadius: '12px', 
                        background: 'var(--bg-secondary)', 
                        textAlign: 'center',
                        boxShadow: `0 4px 20px ${activeCategory?.color}10`,
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
                  
                  {activeSkillsList.length === 0 && (
                    <div style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>No skills mapped yet.</div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
