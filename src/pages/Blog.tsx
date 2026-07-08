import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Clock, ArrowRight } from 'lucide-react';
import { fadeUp, stagger } from '../utils/animations';
import { blogPosts } from '../config/siteConfig';

const allCategories = ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))];

export default function Blog() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    return blogPosts.filter(p => {
      const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'All' || p.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category]);

  const featured = filtered.find(p => p.featured);
  const rest = filtered.filter(p => !p.featured);

  return (
    <div style={{ background: 'var(--bg-primary)', paddingTop: '80px' }}>
      {/* Header */}
      <section style={{ padding: '60px 24px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="section-header">// blog</motion.p>
            <motion.h1 variants={fadeUp} className="section-title" style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: '16px' }}>
              Articles & <span style={{ color: 'var(--accent-primary)' }}>Thoughts</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '32px' }}>
              Writing about web development, performance, 3D graphics, and everything in between.
            </motion.p>

            {/* Search */}
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-primary)', maxWidth: '400px', flex: 1 }}>
                <Search size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search articles..."
                  style={{ background: 'none', border: 'none', outline: 'none', flex: 1, fontFamily: 'JetBrains Mono', fontSize: '13px', color: 'var(--text-primary)' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {allCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    style={{
                      padding: '8px 16px', borderRadius: '20px', cursor: 'pointer',
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
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Featured Post */}
          {featured && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              style={{ marginBottom: '60px' }}
            >
              <motion.h2 variants={fadeUp} style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: 'var(--accent-primary)', letterSpacing: '0.1em', marginBottom: '20px' }}>
                ⭐ FEATURED POST
              </motion.h2>
              <motion.div
                variants={fadeUp}
                className="gradient-border"
                onClick={() => navigate(`/blog/${featured.slug}`)}
                style={{ padding: '40px', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span className="tech-tag">{featured.category}</span>
                      {featured.tags.map(t => <span key={t} style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: 'var(--text-muted)' }}>#{t}</span>)}
                    </div>
                    <h2 style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '24px', color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '16px' }}>{featured.title}</h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px', fontSize: '15px' }}>{featured.excerpt}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <span style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: 'var(--text-muted)' }}>📅 {featured.date}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: 'var(--text-muted)' }}><Clock size={12} /> {featured.readingTime}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: 'var(--accent-primary)', cursor: 'pointer' }}>
                        Read Article <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                  <div style={{ width: '200px', height: '160px', borderRadius: '8px', background: 'linear-gradient(135deg, rgba(0,255,65,0.1), rgba(0,212,255,0.05))', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px', flexShrink: 0 }}>
                    📝
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Post Grid */}
          {rest.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.h2 variants={fadeUp} style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '24px' }}>
                ALL POSTS ({rest.length})
              </motion.h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                {rest.map((post) => (
                  <motion.article
                    key={post.id}
                    variants={fadeUp}
                    className="glow-card"
                    onClick={() => navigate(`/blog/${post.slug}`)}
                    style={{ padding: '28px', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                  >
                    <div style={{ height: '120px', borderRadius: '8px', background: 'linear-gradient(135deg, rgba(0,255,65,0.06), rgba(0,212,255,0.03))', border: '1px solid var(--border)', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
                      {post.category === 'Tutorial' ? '📖' : post.category === 'DevOps' ? '⚙️' : '💭'}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span className="tech-tag" style={{ fontSize: '11px' }}>{post.category}</span>
                      <span style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: 'var(--text-muted)' }}>{post.date}</span>
                    </div>
                    <h2 style={{ fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: '16px', color: 'var(--text-primary)', lineHeight: 1.4, marginBottom: '10px', flex: 1 }}>{post.title}</h2>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>{post.excerpt}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)' }}>
                        <Clock size={12} /> {post.readingTime}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--accent-primary)' }}>
                        Read <ArrowRight size={12} />
                      </span>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          )}

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
              <p>No articles matching your search.</p>
            </div>
          )}

          {/* Newsletter CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{ marginTop: '80px', padding: '48px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', textAlign: 'center' }}
          >
            <h3 style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>
              📬 Stay Updated
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Get notified when I publish new articles. No spam, unsubscribe anytime.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '400px', margin: '0 auto' }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{ flex: 1, minWidth: '200px', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: 'JetBrains Mono', fontSize: '13px', outline: 'none' }}
              />
              <button style={{ padding: '12px 24px', borderRadius: '8px', background: 'var(--accent-primary)', color: '#000', fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer' }}>
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
