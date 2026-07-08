import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { blogPosts } from '../config/siteConfig';
import { fadeUp, stagger } from '../utils/animations';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', background: 'var(--bg-primary)' }}>
        <h1 style={{ fontFamily: 'JetBrains Mono', color: 'var(--accent-error)', fontSize: '24px' }}>404 - Article Not Found</h1>
        <Link to="/blog" style={{ color: 'var(--text-secondary)', textDecoration: 'none', borderBottom: '1px solid var(--accent-primary)' }}>Return to Blog</Link>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-primary)', paddingTop: '100px', paddingBottom: '80px', minHeight: '100vh' }}>
      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} style={{ marginBottom: '32px' }}>
            <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', fontFamily: 'JetBrains Mono', fontSize: '14px', transition: 'color 0.2s' }}>
              <ArrowLeft size={16} /> Back to Articles
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <span className="tech-tag">{post.category}</span>
            {post.tags.map(t => <span key={t} style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: 'var(--text-muted)' }}>#{t}</span>)}
          </motion.div>

          <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, lineHeight: 1.2, color: 'var(--text-primary)', marginBottom: '24px' }}>
            {post.title}
          </motion.h1>

          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '24px', paddingBottom: '32px', borderBottom: '1px solid var(--border)', marginBottom: '40px', color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono', fontSize: '13px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} /> {post.date}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> {post.readingTime}</span>
          </motion.div>

          <motion.div variants={fadeUp} className="terminal-body" style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '32px', border: '1px solid var(--border)' }}>
            <div style={{ whiteSpace: 'pre-wrap', color: 'var(--text-primary)', lineHeight: 1.8, fontSize: '16px' }}>
              {post.content}
            </div>
          </motion.div>
        </motion.div>
      </article>
    </div>
  );
}
