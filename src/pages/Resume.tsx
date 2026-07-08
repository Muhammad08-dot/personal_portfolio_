import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../utils/animations';
import { experience, education, skills, siteConfig, certifications, projects } from '../config/siteConfig';

export default function Resume() {
  const coreAI = skills.coreAI || [];
  const topFrontend = skills.frontend || [];
  const topBackend = skills.backend || [];
  const topDB = skills.database || [];
  const toolsCloud = skills.toolsCloud || [];

  return (
    <div style={{ background: 'var(--bg-primary)', paddingTop: '80px' }}>
      {/* Controls */}
      <section style={{ padding: '32px 24px', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: 'var(--accent-primary)', marginBottom: '4px' }}>// resume</p>
            <h1 style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '24px', color: 'var(--text-primary)' }}>Curriculum Vitae</h1>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px', background: 'var(--accent-primary)', color: '#000', fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer', boxShadow: '0 0 15px var(--glow)' }}
              onClick={() => window.print()}
            >
              ↓ Download PDF
            </button>
          </div>
        </div>
      </section>

      {/* Resume Content */}
      <section style={{ padding: '60px 24px' }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          style={{ maxWidth: '900px', margin: '0 auto', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}
        >
          {/* Header */}
          <motion.div
            variants={fadeUp}
            style={{ padding: '48px', background: 'linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary))', borderBottom: '1px solid var(--border)' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
              <div>
                <h2 style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '36px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {siteConfig.name}
                </h2>
                <p style={{ fontFamily: 'JetBrains Mono', fontSize: '18px', color: 'var(--accent-primary)', marginBottom: '16px' }}>{siteConfig.title}</p>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', lineHeight: 1.7 }}>
                  {siteConfig.tagline}
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
                {[
                  { icon: '✉️', label: siteConfig.email },
                  { icon: '📍', label: siteConfig.location },
                  { icon: '⌥', label: siteConfig.github.replace('https://', '') },
                  { icon: '🌐', label: siteConfig.website.replace('https://', '') },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{item.icon}</span>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: 'var(--text-secondary)' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0' }}>
            {/* Main Column */}
            <div style={{ padding: '40px', borderRight: '1px solid var(--border)' }}>
              {/* Experience */}
              <motion.div variants={fadeUp} style={{ marginBottom: '40px' }}>
                <h2 style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '16px', color: 'var(--accent-primary)', letterSpacing: '0.1em', marginBottom: '24px', paddingBottom: '8px', borderBottom: '1px solid rgba(0,255,65,0.2)' }}>
                  EXPERIENCE
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  {experience.map((job) => (
                    <div key={job.company}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', flexWrap: 'wrap', gap: '4px' }}>
                        <div>
                          <h3 style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)' }}>{job.role}</h3>
                          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: job.color }}>{job.company}</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)' }}>{job.duration}</div>
                          <div style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)' }}>{job.location}</div>
                        </div>
                      </div>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
                        {job.description.map((bullet, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                            <span style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px', fontSize: '12px' }}>▸</span>
                            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Education */}
              <motion.div variants={fadeUp}>
                <h2 style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '16px', color: 'var(--accent-primary)', letterSpacing: '0.1em', marginBottom: '24px', paddingBottom: '8px', borderBottom: '1px solid rgba(0,255,65,0.2)' }}>
                  EDUCATION
                </h2>
                {education.map(edu => (
                  <div key={edu.institution}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <div>
                        <h3 style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)', marginBottom: '4px' }}>{edu.institution}</h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{edu.degree}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</p>
                      </div>
                      <span style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)' }}>{edu.duration}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                      {edu.achievements.map(a => (
                        <span key={a} style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(0,255,65,0.08)', border: '1px solid rgba(0,255,65,0.15)', color: 'var(--accent-primary)', fontFamily: 'JetBrains Mono', fontSize: '11px' }}>{a}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Side Column */}
            <div style={{ padding: '40px' }}>
              {/* Skills */}
              <motion.div variants={fadeUp} style={{ marginBottom: '32px' }}>
                <h2 style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '16px', color: 'var(--accent-primary)', letterSpacing: '0.1em', marginBottom: '20px', paddingBottom: '8px', borderBottom: '1px solid rgba(0,255,65,0.2)' }}>
                  SKILLS
                </h2>
                {[
                  { label: 'Core AI & Agents', items: coreAI },
                  { label: 'Frontend', items: topFrontend },
                  { label: 'Backend', items: topBackend },
                  { label: 'Databases', items: topDB },
                  { label: 'Tools & Cloud', items: toolsCloud },
                ].map(group => (
                  <div key={group.label} style={{ marginBottom: '16px' }}>
                    <h4 style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.05em' }}>{group.label}</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {group.items.map(s => (
                        <span key={s.name} style={{ padding: '2px 8px', borderRadius: '4px', background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono', fontSize: '11px' }}>{s.name}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Projects */}
              <motion.div variants={fadeUp} style={{ marginBottom: '32px' }}>
                <h2 style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '16px', color: 'var(--accent-primary)', letterSpacing: '0.1em', marginBottom: '20px', paddingBottom: '8px', borderBottom: '1px solid rgba(0,255,65,0.2)' }}>
                  NOTABLE PROJECTS
                </h2>
                {projects.slice(0, 3).map(p => (
                  <div key={p.title} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                      <span style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{p.title}</span>
                      <span style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: 'var(--accent-primary)' }}>⭐ {p.stars}</span>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{p.description.substring(0, 50)}...</span>
                  </div>
                ))}
              </motion.div>

              {/* Languages */}
              <motion.div variants={fadeUp} style={{ marginBottom: '32px' }}>
                <h2 style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '16px', color: 'var(--accent-primary)', letterSpacing: '0.1em', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid rgba(0,255,65,0.2)' }}>
                  LANGUAGES
                </h2>
                {[{ lang: 'English', level: 'Fluent' }, { lang: 'Urdu', level: 'Native' }].map(l => (
                  <div key={l.lang} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{l.lang}</span>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)' }}>{l.level}</span>
                  </div>
                ))}
              </motion.div>

              {/* Certifications */}
              <motion.div variants={fadeUp}>
                <h2 style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '16px', color: 'var(--accent-primary)', letterSpacing: '0.1em', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid rgba(0,255,65,0.2)' }}>
                  CERTIFICATIONS
                </h2>
                {certifications.map(c => (
                  <div key={c.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{c.name}</span>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)' }}>{c.issuer}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
