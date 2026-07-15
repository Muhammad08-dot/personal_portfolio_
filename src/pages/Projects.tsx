import { useState, useMemo, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, Star, GitFork, Filter } from 'lucide-react';
import { fadeUp, stagger } from '../utils/animations';
import { projects } from '../config/siteConfig';

const DataStream = lazy(() => import('../components/3d/DataStream'));

type Category = 'All' | 'Frontend' | 'Backend' | 'Full-Stack' | 'AI/ML' | 'Open Source';

const categories: Category[] = ['All', 'Frontend', 'Backend', 'Full-Stack', 'AI/ML', 'Open Source'];

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  active: { label: 'Active', color: '#28ca42', dot: '🟢' },
  'in-progress': { label: 'In Progress', color: '#ffb86c', dot: '🟡' },
  archived: { label: 'Archived', color: '#ff5555', dot: '🔴' },
};

export default function Projects() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>('All');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    return projects.filter(p => {
      const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()) || p.tech.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchCategory = category === 'All' || p.category === category;
      return matchSearch && matchCategory;
    });
  }, [search, category]);

  const featured = filtered.filter(p => p.featured);
  const rest = filtered.filter(p => !p.featured);

  return (
    <div style={{ background: 'var(--bg-primary)', paddingTop: '80px' }}>
      {/* Header */}
      <section style={{ padding: '0', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden', minHeight: '260px' }}>
        {/* 3D DataStream background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Suspense fallback={null}>
            <DataStream height="260px" />
          </Suspense>
        </div>
        {/* Dark overlay so text stays readable */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.92) 40%, rgba(10,10,10,0.5) 100%)', zIndex: 1 }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px', position: 'relative', zIndex: 2 }}>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="section-header">// ls ~/projects</motion.p>
            <motion.h1 variants={fadeUp} className="section-title" style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: '12px' }}>
              My <span style={{ color: 'var(--accent-primary)' }}>Projects</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              "A collection of things I've built, broken, and rebuilt."
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Filter & Search ── */}
      <section style={{ padding: '32px 24px', borderBottom: '1px solid var(--border)', background: 'rgba(10,10,10,0.95)', position: 'sticky', top: '60px', zIndex: 40, backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Terminal search */}
          <div style={{ marginBottom: '20px', padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', gap: '12px', maxWidth: '500px' }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: 'var(--accent-primary)' }}>$</span>
            <Search size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder='find projects --filter="..."'
              style={{
                background: 'none', border: 'none', outline: 'none', flex: 1,
                fontFamily: 'JetBrains Mono', fontSize: '13px', color: 'var(--text-primary)',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            {/* Category pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Filter size={14} style={{ color: 'var(--text-muted)' }} />
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  style={{
                    padding: '6px 14px', borderRadius: '20px', cursor: 'pointer',
                    fontFamily: 'JetBrains Mono', fontSize: '12px',
                    border: `1px solid ${category === cat ? 'var(--accent-primary)' : 'var(--border)'}`,
                    background: category === cat ? 'rgba(0,255,65,0.1)' : 'transparent',
                    color: category === cat ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* View toggle */}
            <div style={{ display: 'flex', gap: '4px', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
              {(['grid', 'list'] as const).map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  style={{
                    padding: '8px 12px', cursor: 'pointer', border: 'none',
                    background: view === v ? 'rgba(0,255,65,0.1)' : 'transparent',
                    color: view === v ? 'var(--accent-primary)' : 'var(--text-muted)',
                    fontFamily: 'JetBrains Mono', fontSize: '13px', transition: 'all 0.2s',
                  }}
                >
                  {v === 'grid' ? '⊞' : '≡'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              <p>No projects found matching "{search}"</p>
              <p style={{ fontSize: '13px', marginTop: '8px' }}>$ find projects --name="*" --type=all</p>
            </div>
          )}

          {/* Featured Section */}
          {featured.length > 0 && (
            <div style={{ marginBottom: '60px' }}>
              <h2 style={{ fontFamily: 'JetBrains Mono', fontSize: '14px', color: 'var(--accent-primary)', marginBottom: '24px', letterSpacing: '0.1em' }}>⭐ FEATURED</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                <AnimatePresence>
                  {featured.map((project, i) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.1 }}
                      className="gradient-border"
                      onClick={() => project.githubUrl && window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                      style={{ padding: '24px', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                    >
                      {/* Gradient border visible always for featured */}
                      <div style={{ position: 'absolute', inset: -1, borderRadius: '11px', background: `linear-gradient(135deg, ${project.color}, ${project.color}60, transparent)`, zIndex: -1, opacity: 0.6 }} />

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <span style={{ padding: '3px 10px', borderRadius: '4px', fontFamily: 'Fira Code', fontSize: '11px', background: `${project.color}18`, color: project.color, border: `1px solid ${project.color}40` }}>⭐ Featured</span>
                          <span style={{ padding: '3px 10px', borderRadius: '4px', fontFamily: 'Fira Code', fontSize: '11px', background: 'var(--bg-secondary)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>{project.category}</span>
                        </div>
                        <span style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)' }}>
                          {statusConfig[project.status]?.dot} {statusConfig[project.status]?.label}
                        </span>
                      </div>

                      <div style={{ height: '140px', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '56px', background: `linear-gradient(135deg, ${project.color}18, ${project.color}06)`, border: `1px solid ${project.color}25` }}>
                        {project.category === 'Full-Stack' ? '🖥️' : project.category === 'AI/ML' ? '🧠' : '⌨️'}
                      </div>

                      <h3 style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '18px', color: 'var(--text-primary)', marginBottom: '8px' }}>{project.title}</h3>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1, marginBottom: '16px' }}>{project.description}</p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                        {project.tech.map(t => <span key={t} className="tech-tag" style={{ fontSize: '11px' }}>{t}</span>)}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '12px', fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)', alignItems: 'center' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={12} /> {project.stars}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><GitFork size={12} /> {project.forks}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {project.githubUrl && <a href={project.githubUrl} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border)', color: 'var(--text-secondary)', textDecoration: 'none', fontFamily: 'JetBrains Mono', fontSize: '12px' }}>Code</a>}
                          {project.live && <a href={project.live} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '6px', background: 'var(--accent-primary)', color: '#000', textDecoration: 'none', fontFamily: 'JetBrains Mono', fontSize: '12px' }}>Live <ExternalLink size={10} /></a>}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* All Projects */}
          {rest.length > 0 && (
            <div>
              <h2 style={{ fontFamily: 'JetBrains Mono', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px', letterSpacing: '0.1em' }}>ALL PROJECTS ({rest.length})</h2>

              {view === 'grid' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                  <AnimatePresence>
                    {rest.map((project, i) => (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: i * 0.08 }}
                        className="glow-card"
                        onClick={() => project.githubUrl && window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                        style={{ padding: '20px', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <span className="tech-tag" style={{ fontSize: '11px' }}>{project.category}</span>
                          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: statusConfig[project.status]?.color }}>{statusConfig[project.status]?.dot} {statusConfig[project.status]?.label}</span>
                        </div>
                        <h3 style={{ fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: '16px', color: 'var(--text-primary)', marginBottom: '8px' }}>{project.title}</h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1, marginBottom: '12px' }}>{project.description}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                          {project.tech.slice(0, 3).map(t => <span key={t} className="tech-tag" style={{ fontSize: '10px' }}>{t}</span>)}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {project.githubUrl && <a href={project.githubUrl} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textAlign: 'center', padding: '6px', borderRadius: '6px', border: '1px solid var(--border)', color: 'var(--text-secondary)', textDecoration: 'none', fontFamily: 'JetBrains Mono', fontSize: '11px' }}>Code</a>}
                          {project.live && <a href={project.live} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '6px', borderRadius: '6px', background: 'rgba(0,255,65,0.1)', border: '1px solid rgba(0,255,65,0.2)', color: 'var(--accent-primary)', textDecoration: 'none', fontFamily: 'JetBrains Mono', fontSize: '11px' }}>Live <ExternalLink size={10} /></a>}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <AnimatePresence>
                    {rest.map((project, i) => (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="glow-card"
                        onClick={() => project.githubUrl && window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                        style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', cursor: 'pointer' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: '200px' }}>
                          <div style={{ fontSize: '28px' }}>
                            {project.category === 'Full-Stack' ? '🖥️' : project.category === 'AI/ML' ? '🧠' : '⌨️'}
                          </div>
                          <div>
                            <h3 style={{ fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)', marginBottom: '4px' }}>{project.title}</h3>
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{project.description}</p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {project.tech.slice(0, 3).map(t => <span key={t} className="tech-tag" style={{ fontSize: '10px' }}>{t}</span>)}
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={12} /> {project.stars}</span>
                          {project.githubUrl && <a href={project.githubUrl} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border)', color: 'var(--text-secondary)', textDecoration: 'none', fontFamily: 'JetBrains Mono', fontSize: '12px' }}>Code</a>}
                          {project.live && <a href={project.live} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '6px', background: 'var(--accent-primary)', color: '#000', textDecoration: 'none', fontFamily: 'JetBrains Mono', fontSize: '12px' }}>Live <ExternalLink size={10} /></a>}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
