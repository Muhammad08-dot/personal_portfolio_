import { useEffect, useRef, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Star, GitFork, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { projects, techStack, siteConfig, blogPosts } from '../config/siteConfig';
import TypingEffect from '../components/TypingEffect';
import { fadeUp, stagger } from '../utils/animations';

const HeroScene = lazy(() => import('../components/3d/HeroScene'));
import SciFiChaseCanvas from '../components/SciFiChaseCanvas';

const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const winH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = winH > 0 ? (window.scrollY / winH) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-progress" ref={barRef} />;
}

function BackToTop() {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (ref.current) ref.current.style.opacity = window.scrollY > 300 ? '1' : '0';
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      ref={ref}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed', bottom: '32px', right: '32px', zIndex: 50,
        width: '40px', height: '40px', borderRadius: '50%',
        background: 'var(--bg-secondary)', border: '1px solid var(--accent-primary)',
        color: 'var(--accent-primary)', opacity: 0, cursor: 'pointer',
        boxShadow: '0 0 10px var(--glow)', transition: 'opacity 0.3s',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'JetBrains Mono',
      }}
    >
      ↑
    </button>
  );
}

export default function Home() {
  return (
    <div style={{ background: 'var(--bg-primary)' }}>
      <ScrollProgress />
      <BackToTop />

      {/* ── Hero Section ── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
        style={{ paddingTop: '80px', paddingBottom: '100px' }}
      >
        <div className="absolute inset-0 z-0">
          <Suspense fallback={
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'var(--accent-primary)', fontFamily: 'JetBrains Mono', fontSize: '12px' }}>Loading 3D scene...</span>
            </div>
          }>
            <HeroScene />
          </Suspense>
        </div>

        <div className="absolute inset-0 z-[1]" style={{ background: 'radial-gradient(ellipse at center, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.85) 70%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-32 z-[1]" style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }} />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} style={{ fontFamily: 'JetBrains Mono', color: 'var(--accent-primary)', fontSize: '14px', marginBottom: '16px' }}>
              &gt; Hello, World! 👋
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="glitch"
              data-text={siteConfig.name}
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: 'clamp(48px, 8vw, 80px)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: 'var(--text-primary)',
                marginBottom: '16px',
              }}
            >
              {siteConfig.name}
            </motion.h1>

            <motion.div
              variants={fadeUp}
              style={{ fontFamily: 'JetBrains Mono', fontSize: 'clamp(16px, 2.5vw, 22px)', color: 'var(--accent-secondary)', minHeight: '60px', marginBottom: '24px' }}
            >
              <TypingEffect
                lines={['> AI/ML Explorer', '> Full-Stack Developer', '> Open Source Enthusiast', '> Builder of Things']}
                speed={60}
              />
            </motion.div>

            <motion.p
              variants={fadeUp}
              style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto 20px', color: 'var(--text-secondary)', lineHeight: 1.7 }}
            >
              I craft immersive digital experiences at the intersection of design and engineering.
              Passionate about performance, 3D graphics, and building tools developers love.
            </motion.p>

            <motion.div
              variants={fadeUp}
              style={{ 
                fontFamily: 'JetBrains Mono', 
                fontSize: '15px', 
                color: 'var(--accent-primary)', 
                opacity: 0.9,
                margin: '0 auto 40px',
                fontStyle: 'italic',
                maxWidth: '600px'
              }}
            >
              "The best way to predict the future is to build it."
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/projects"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '12px 24px', borderRadius: '8px',
                  background: 'var(--accent-primary)', color: '#000',
                  fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: '14px',
                  boxShadow: '0 0 20px var(--glow)', textDecoration: 'none',
                  transition: 'all 0.3s',
                }}
              >
                View Projects <ArrowRight size={16} />
              </Link>
              <Link
                to="/connect"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '12px 24px', borderRadius: '8px',
                  border: '1px solid var(--accent-primary)',
                  color: 'var(--accent-primary)',
                  fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: '14px',
                  textDecoration: 'none', transition: 'all 0.3s',
                }}
              >
                Get in Touch <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)' }}>scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ChevronDown size={20} style={{ color: 'var(--accent-primary)' }} />
          </motion.div>
        </div>
      </section>

      {/* ── Quick Intro ── */}
      <section style={{ padding: '96px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center' }}
          >
            <motion.div variants={fadeUp}>
              <div className="terminal-window">
                <div className="terminal-titlebar">
                  <div className="terminal-dot red" />
                  <div className="terminal-dot yellow" />
                  <div className="terminal-dot green" />
                  <span style={{ marginLeft: '16px', fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)' }}>~ about.sh</span>
                </div>
                <div className="terminal-body">
                  <p style={{ color: 'var(--accent-primary)' }}>$ <span style={{ color: 'var(--text-primary)' }}>whoami</span></p>
                  <br />
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                    Hey! I'm a full-stack developer and AI/ML Explorer. I love turning complex problems into elegant, user-friendly solutions using the power of Agentic AI.
                  </p>
                  <br />
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                    When I'm not writing code, you'll find me exploring Machine Learning models, developing AI tools, and embracing vibe coding to build the future.
                  </p>
                  <br />
                  <p style={{ color: 'var(--accent-primary)' }}>$ <span className="blink" style={{ color: 'var(--text-primary)' }}>_</span></p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Year Experience', value: '1', icon: '⚡' },
                { label: 'Projects Shipped', value: '10+', icon: '🚀' },
                { label: 'Stars (WIP) (Work In Progress)', value: '0', icon: '⭐' },
                { label: 'Cups Injected', value: '0', icon: '☕' },
              ].map(stat => (
                <div
                  key={stat.label}
                  className="glow-card"
                  style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px' }}
                >
                  <span style={{ fontSize: '28px' }}>{stat.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '24px', color: 'var(--accent-primary)' }}>{stat.value}</div>
                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Sci-Fi Chase Scene Canvas ── */}
      <div style={{ width: '100%', height: '100px', padding: '0', borderTop: '1px solid var(--border)' }}>
        <SciFiChaseCanvas />
      </div>

      {/* ── Tech Stack Marquee ── */}
      <section style={{ padding: '48px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
        <div className="marquee-container">
          <div className="marquee-track">
            {[...techStack, ...techStack].map((tech, i) => (
              <Link
                to={`/article/${encodeURIComponent(tech)}`}
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '8px 16px', borderRadius: '8px',
                  background: 'var(--bg-primary)', border: '1px solid var(--border)',
                  color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono',
                  fontSize: '13px', whiteSpace: 'nowrap', cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'var(--accent-primary)';
                  el.style.color = 'var(--accent-primary)';
                  el.style.boxShadow = '0 0 10px var(--glow)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'var(--border)';
                  el.style.color = 'var(--text-secondary)';
                  el.style.boxShadow = 'none';
                }}
              >
                <span style={{ color: 'var(--accent-primary)' }}>▸</span> {tech}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section style={{ padding: '96px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={stagger}>
            <motion.div variants={fadeUp} style={{ marginBottom: '48px' }}>
              <p className="section-header">// projects</p>
              <h2 className="section-title">Featured Work</h2>
              <p style={{ marginTop: '12px', color: 'var(--text-secondary)' }}>A selection of projects I'm most proud of.</p>
            </motion.div>

            <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {featuredProjects.map((project) => (
                <motion.div key={project.id} variants={fadeUp} className="glow-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: '4px', fontFamily: 'Fira Code', fontSize: '11px', background: `${project.color}18`, color: project.color, border: `1px solid ${project.color}40` }}>
                      ⭐ Featured
                    </span>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)' }}>{project.year}</span>
                  </div>

                  <div style={{ height: '120px', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', background: `linear-gradient(135deg, ${project.color}18, ${project.color}08)`, border: `1px solid ${project.color}30` }}>
                    {project.category === 'Full-Stack' ? '🖥️' : project.category === 'AI/ML' ? '🧠' : '⌨️'}
                  </div>

                  <h3 style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '18px', color: 'var(--text-primary)', marginBottom: '8px' }}>{project.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1, marginBottom: '16px' }}>{project.description}</p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {project.tech.slice(0, 3).map(t => <span key={t} className="tech-tag" style={{ fontSize: '11px' }}>{t}</span>)}
                    {project.tech.length > 3 && <span className="tech-tag" style={{ fontSize: '11px' }}>+{project.tech.length - 3}</span>}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={12} /> {project.stars}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><GitFork size={12} /> {project.forks}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                          style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border)', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'all 0.2s' }}
                          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--accent-primary)'; el.style.color = 'var(--accent-primary)'; }}
                          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.color = 'var(--text-secondary)'; }}
                        >Code</a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer"
                          style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'JetBrains Mono', fontSize: '12px', padding: '6px 12px', borderRadius: '6px', background: 'var(--accent-primary)', color: '#000', textDecoration: 'none' }}
                        >Live <ExternalLink size={10} /></a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link to="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'JetBrains Mono', fontSize: '14px', color: 'var(--accent-primary)', textDecoration: 'none' }}>
                View All Projects <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── GitHub Stats ── */}
      <section style={{ padding: '96px 24px', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={stagger}>
            <motion.div variants={fadeUp} style={{ marginBottom: '48px', textAlign: 'center' }}>
              <p className="section-header">// github</p>
              <h2 className="section-title">Activity & Stats</h2>
            </motion.div>

            <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
              {[
                { label: 'Working on new projects', value: '12 Repos', icon: '📁' },
                { label: 'Contributions', value: '200+', icon: '📝' },
                { label: 'Stars Earned', value: '0', icon: '⭐' },
                { label: 'Current Streak', value: '10 days', icon: '🔥' },
              ].map(stat => (
                <motion.div key={stat.label} variants={fadeUp} style={{ padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-primary)', textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '24px', color: 'var(--accent-primary)', marginBottom: '4px' }}>{stat.value}</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} style={{ borderRadius: '12px', border: '1px solid var(--border)', padding: '24px', background: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <p style={{ fontFamily: 'JetBrains Mono', fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>Contribution Activity</p>
                <span style={{ fontSize: '16px' }}>😉</span>
              </div>
              <div className="marquee-container" style={{ paddingBottom: '16px' }}>
                <div className="marquee-track" style={{ display: 'flex', gap: '32px' }}>
                  {[1, 2].map((blockId) => (
                    <div key={blockId} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {[
                        "00010 00000 00000 00000 00000 01000 00000 00000 00000 00000 00000 00000 00000 00000 00010 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 01000 ",
                        "00100 00000 00000 00000 00100 00100 00000 10000 00000 11110 11110 01110 10001 11111 00100 01010 10010 01110 00000 11111 10010 11110 11110 11110 00000 00000 10000 11110 11111 00100 01110 00000 11100 10001 01110 10000 11100 00000 11111 01110 01110 11110 11111 10010 11110 11110 00100 01010 00100 ",
                        "01000 00000 00000 00000 01010 00010 00000 01000 00000 10001 10001 00100 11001 00100 01000 01010 10010 00100 00000 00100 10010 10000 10001 10000 00000 00000 10000 10000 00100 00100 10000 00000 10010 10001 00100 10000 10010 00000 00100 10001 10000 10000 00100 10010 10000 10001 00100 01010 00010 ",
                        "01000 00000 11111 00000 10001 00010 00000 00100 00000 11110 11110 00100 10101 00100 01000 00000 11110 00100 00000 00100 11110 11100 11110 11100 00000 00000 10000 11100 00100 00000 01110 00000 11100 10001 00100 10000 10010 00000 00100 10001 10110 11100 00100 11110 11100 11110 00100 00000 00010 ",
                        "01000 00000 00000 00000 00000 00010 00000 01000 00000 10000 10100 00100 10011 00100 01000 00000 10010 00100 00000 00100 10010 10000 10100 10000 00100 00000 10000 10000 00100 00000 00001 00000 10010 10001 00100 10000 10010 00000 00100 10001 10010 10000 00100 10010 10000 10100 00000 00000 00010 ",
                        "00100 00000 00000 11111 00000 00100 00000 10000 00000 10000 10010 01110 10001 00100 00100 00000 10010 01110 00000 00100 10010 11110 10010 11110 01000 00000 11110 11110 00100 00000 01110 00000 11100 01110 01110 11110 11100 00000 00100 01110 01110 11110 00100 10010 11110 10010 00100 00000 00100 ",
                        "00010 00000 00000 11111 00000 01000 00000 00000 00000 00000 00000 00000 00000 00000 00010 00000 00000 00000 00000 00000 00000 00000 00000 00000 01000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 00000 01000 "
                      ].map((row, rowIndex) => (
                        <div key={rowIndex} style={{ display: 'flex', gap: '2px', width: 'max-content' }}>
                          {row.replace(/ /g, '0').split('').map((char, colIndex) => {
                            const isActive = char === '1';
                            const opacity = isActive ? (Math.random() > 0.5 ? 1 : 0.8) : 0.05;
                            return (
                              <div key={colIndex} style={{ width: '4px', height: '4px', borderRadius: '1px', background: `rgba(0,255,65,${opacity})`, flexShrink: 0 }} />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)' }}>Less</span>
                {[0.05, 0.2, 0.45, 0.7, 1].map((o, i) => (
                  <div key={i} style={{ width: '12px', height: '12px', borderRadius: '2px', background: `rgba(0,255,65,${o})` }} />
                ))}
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)' }}>More</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Latest Blog Posts ── */}
      <section style={{ padding: '96px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={stagger}>
            <motion.div variants={fadeUp} style={{ marginBottom: '48px' }}>
              <p className="section-header">// blog</p>
              <h2 className="section-title">Latest Articles</h2>
            </motion.div>

            <motion.div variants={stagger} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {blogPosts.slice(0, 3).map(post => (
                <motion.div
                  key={post.id}
                  variants={fadeUp}
                  className="glow-card"
                  style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '24px', cursor: 'pointer' }}
                >
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: 'var(--text-muted)', minWidth: '90px', display: 'none' }}>{post.date.slice(0, 7)}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)', marginBottom: '6px' }}>{post.title}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{post.excerpt}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                    <span className="tech-tag">{post.category}</span>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)' }}>{post.readingTime}</span>
                    <ArrowRight size={16} style={{ color: 'var(--accent-primary)' }} />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginTop: '32px' }}>
              <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'JetBrains Mono', fontSize: '14px', color: 'var(--accent-primary)', textDecoration: 'none' }}>
                Read All Articles <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '96px 24px', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(0,255,65,0.05) 0%, transparent 70%)' }} />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}
        >
          <motion.p variants={fadeUp} className="section-header">// connect</motion.p>
          <motion.h2 variants={fadeUp} className="section-title" style={{ marginBottom: '16px' }}>Let's Build Something</motion.h2>
          <motion.p variants={fadeUp} style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '32px' }}>
            Interested in working together? Whether it's a freelance project, full-time role, or just
            want to geek out about tech — I'd love to hear from you.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/connect" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '8px', background: 'var(--accent-primary)', color: '#000', fontFamily: 'JetBrains Mono', fontWeight: 600, boxShadow: '0 0 20px var(--glow)', textDecoration: 'none' }}>
              Say Hello <ArrowRight size={16} />
            </Link>
            <a href={`mailto:${siteConfig.email}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '8px', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)', fontFamily: 'JetBrains Mono', fontWeight: 600, textDecoration: 'none' }}>
              Email Directly
            </a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
