import { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Send } from 'lucide-react';
import { fadeUp, stagger } from '../utils/animations';
import { socials, siteConfig } from '../config/siteConfig';

const FloatingGeometry = lazy(() => import('../components/3d/FloatingGeometry'));

const customSocials = [
  {
    platform: 'GitHub',
    icon: 'github',
    followers: '1',
    handle: 'Muhammad08-dot',
    desc: 'Check out my ML, automation, and Agentic AI repositories.',
    url: 'https://github.com/Muhammad08-dot',
    color: '#00ff41',
    bg: 'rgba(0,255,65,0.1)'
  },
  {
    platform: 'LinkedIn',
    icon: 'linkedin',
    followers: '500+',
    handle: 'muhammad-abdullah-ramday',
    desc: 'Professional network, AI workflow showcases, and career updates.',
    url: 'https://www.linkedin.com/in/muhammad-abdullah-ramday/',
    color: '#00d4ff',
    bg: 'rgba(0,212,255,0.1)'
  },
  {
    platform: 'Instagram',
    icon: '🔗',
    followers: '200+',
    handle: 'coded_by_mabdullah',
    desc: 'Code snippets, automation builds, and tech developer lifestyle.',
    url: 'https://instagram.com',
    color: '#bd93f9',
    bg: 'rgba(189,147,249,0.1)'
  },
  {
    platform: 'Email',
    icon: 'email',
    followers: 'Direct',
    handle: 'mabdullahramday56@gmail.com',
    desc: "Let's collaborate on production-grade AI or multi-stack web projects.",
    url: 'mailto:mabdullahramday56@gmail.com',
    color: '#00ff41',
    bg: 'rgba(0,255,65,0.1)'
  }
];

function SocialCard({ social }: { social: typeof customSocials[0] }) {
  return (
    <motion.div
      variants={fadeUp}
      onClick={() => window.open(social.url, '_blank', 'noopener,noreferrer')}
      className="social-card"
      style={{ textDecoration: 'none', display: 'block', cursor: 'pointer' }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = social.color;
        el.style.boxShadow = `0 8px 30px ${social.color}25`;
        el.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'var(--border)';
        el.style.boxShadow = 'none';
        el.style.transform = 'translateY(0)';
      }}
    >
      <div
        className="social-card"
        style={{ textDecoration: 'none', padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}
      >
        <div
          style={{
            width: '44px', height: '44px', borderRadius: '10px',
            background: social.bg,
            border: `1px solid ${social.color}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px', flexShrink: 0,
          }}
        >
          {social.icon === 'github' ? '⌥' :
           social.icon === 'linkedin' ? '💼' :
           social.icon === 'fiverr' ? '⚡' :
           social.icon === 'twitter' ? '🐦' :
           social.icon === 'devto' ? '📝' :
           social.icon === 'stackoverflow' ? '📚' :
           social.icon === 'youtube' ? '▶️' :
           social.icon === 'discord' ? '💬' :
           social.icon === 'codepen' ? '✏️' :
           social.icon === 'medium' ? '📰' :
           social.icon === 'email' ? '✉️' : '🔗'}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <h3 style={{ fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>{social.platform}</h3>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: social.color, background: `${social.color}15`, padding: '2px 8px', borderRadius: '10px', flexShrink: 0, marginLeft: '8px' }}>{social.followers}</span>
          </div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{social.handle}</div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{social.desc}</div>
        </div>
      </div>
    </motion.div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('success'), 2000);
  };

  return (
    <div className="terminal-window">
      <div className="terminal-titlebar">
        <div className="terminal-dot red" />
        <div className="terminal-dot yellow" />
        <div className="terminal-dot green" />
        <span style={{ marginLeft: '16px', fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)' }}>~ contact.sh</span>
      </div>
      <div className="terminal-body">
        {status === 'success' ? (
          <div>
            <p style={{ color: 'var(--accent-primary)' }}>&gt; Message sent successfully! ✓</p>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>I'll get back to you within 24 hours.</p>
            <button
              onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }); }}
              style={{ marginTop: '16px', padding: '8px 20px', borderRadius: '6px', background: 'rgba(0,255,65,0.1)', border: '1px solid rgba(0,255,65,0.3)', color: 'var(--accent-primary)', fontFamily: 'JetBrains Mono', fontSize: '13px', cursor: 'pointer' }}
            >
              Send Another
            </button>
          </div>
        ) : status === 'error' ? (
          <div>
            <p style={{ color: 'var(--accent-error)' }}>&gt; Error: Failed to send. Please try again.</p>
            <button onClick={() => setStatus('idle')} style={{ marginTop: '16px', padding: '8px 20px', borderRadius: '6px', background: 'rgba(255,85,85,0.1)', border: '1px solid rgba(255,85,85,0.3)', color: 'var(--accent-error)', fontFamily: 'JetBrains Mono', fontSize: '13px', cursor: 'pointer' }}>Retry</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p style={{ color: 'var(--accent-primary)', marginBottom: '16px' }}>$ contact --new</p>
            {[
              { key: 'name', label: '> Enter your name', type: 'text', required: true },
              { key: 'email', label: '> Enter your email', type: 'email', required: true },
              { key: 'subject', label: '> Subject', type: 'text', required: false },
            ].map(field => (
              <div key={field.key} style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontFamily: 'JetBrains Mono', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  {field.label}:
                </label>
                <input
                  type={field.type}
                  value={form[field.key as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                  required={field.required}
                  className="terminal-input"
                />
              </div>
            ))}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontFamily: 'JetBrains Mono', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                &gt; Message:
              </label>
              <textarea
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                required
                rows={5}
                style={{
                  width: '100%', background: 'transparent', border: 'none',
                  borderBottom: '1px solid var(--border)', color: 'var(--text-primary)',
                  fontFamily: 'JetBrains Mono', fontSize: '13px', resize: 'vertical',
                  outline: 'none', padding: '8px 0', lineHeight: 1.6,
                }}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '12px 24px', borderRadius: '8px',
                background: status === 'sending' ? 'rgba(0,255,65,0.5)' : 'var(--accent-primary)',
                color: '#000', fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '13px',
                border: 'none', cursor: status === 'sending' ? 'wait' : 'pointer',
                transition: 'all 0.3s',
              }}
            >
              {status === 'sending' ? (
                <>
                  <span className="blink">■</span> Sending...
                </>
              ) : (
                <>
                  <Send size={14} /> Send Message
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: copied ? 'var(--accent-primary)' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'JetBrains Mono', fontSize: '11px', transition: 'all 0.2s' }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

export default function Connect() {
  return (
    <div style={{ background: 'var(--bg-primary)', paddingTop: '80px' }}>
      {/* Header */}
      <section style={{ padding: '60px 24px', position: 'relative', overflow: 'hidden', minHeight: '380px' }}>
        <div style={{ position: 'absolute', right: '5%', top: '-20px', width: '45%', height: '420px', opacity: 0.7, pointerEvents: 'none' }}>
          <Suspense fallback={null}>
            <FloatingGeometry shape="torus" color="#00d4ff" height="420px" />
          </Suspense>
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="section-header">// ping --connect</motion.p>
            <motion.h1 variants={fadeUp} className="section-title" style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: '16px' }}>
              Let's <span style={{ color: 'var(--accent-primary)' }}>Connect</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '550px', lineHeight: 1.7 }}>
              Find me across the internet or drop me a message directly. I respond within 24 hours.
            </motion.p>

            {/* Availability */}
            <motion.div
              variants={fadeUp}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginTop: '24px', padding: '10px 20px', borderRadius: '30px', border: '1px solid rgba(40,202,66,0.3)', background: 'rgba(40,202,66,0.1)' }}
            >
              <span className="pulse-dot green" />
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: '#28ca42' }}>{siteConfig.availabilityText}</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Cards Grid */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={stagger}>
            <motion.div variants={fadeUp} style={{ marginBottom: '32px' }}>
              <p className="section-header">// find me online</p>
              <h2 className="section-title" style={{ fontSize: '32px' }}>Social Profiles</h2>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(max(320px, 45%), 1fr))', gap: '20px' }}
            >
              {customSocials.map((social) => (
                <SocialCard key={social.platform} social={social} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form + Alt Methods */}
      <section style={{ padding: '80px 24px', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}
          >
            {/* Contact Form */}
            <motion.div variants={fadeUp}>
              <p className="section-header">// message</p>
              <h2 className="section-title" style={{ fontSize: '28px', marginBottom: '32px' }}>Send a Message</h2>
              <ContactForm />
            </motion.div>

            {/* Alt contact methods */}
            <motion.div variants={fadeUp}>
              <p className="section-header">// alternatives</p>
              <h2 className="section-title" style={{ fontSize: '28px', marginBottom: '32px' }}>Other Ways</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Email */}
                <div style={{ padding: '20px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-primary)' }}>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>$ echo "email" | pbcopy</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '14px', color: 'var(--accent-primary)' }}>{siteConfig.email}</span>
                    <CopyButton text={siteConfig.email} />
                  </div>
                </div>

                {/* Schedule */}
                <div style={{ padding: '20px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-primary)' }}>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>$ open cal.com/{siteConfig.name.split(' ')[0].toLowerCase()}</div>
                  <h3 style={{ fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)', marginBottom: '6px' }}>Schedule a Call</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>Book a 30-min intro call directly on my calendar.</p>
                  <button style={{ padding: '8px 20px', borderRadius: '6px', background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', color: 'var(--accent-secondary)', fontFamily: 'JetBrains Mono', fontSize: '13px', cursor: 'pointer' }}>
                    Book a Call →
                  </button>
                </div>

                {/* Response time */}
                <div style={{ padding: '20px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-primary)' }}>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>$ ping muhammadabdullah08.netlify.app --time</div>
                  <h3 style={{ fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)', marginBottom: '8px' }}>Response Time</h3>
                  {[
                    { method: 'Email', time: '< 24 hours', icon: '✉️' },
                    { method: 'LinkedIn', time: '1-2 days', icon: '💼' },
                    { method: 'WhatsApp (923356765854)', time: 'Instant / Active', icon: '📱' },
                  ].map(r => (
                    <div key={r.method} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                      <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{r.icon} {r.method}</span>
                      <span style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--accent-primary)' }}>{r.time}</span>
                    </div>
                  ))}
                </div>

                {/* Location */}
                <div style={{ padding: '20px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-primary)' }}>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>$ geolocate --city</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '24px' }}>📍</span>
                    <div>
                      <div style={{ fontFamily: 'JetBrains Mono', fontSize: '14px', color: 'var(--text-primary)' }}>{siteConfig.location}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>PST (UTC-8) · Open to remote worldwide</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
