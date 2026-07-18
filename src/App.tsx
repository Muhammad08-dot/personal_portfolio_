import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import CommandPalette from './components/CommandPalette';
import GoToTop from './components/GoToTop';
import AskMuhammadAgent from './components/AskMuhammadAgent';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Skills = lazy(() => import('./pages/Skills'));
const Experience = lazy(() => import('./pages/Experience'));
const Projects = lazy(() => import('./pages/Projects'));
const Blog = lazy(() => import('./pages/Blog'));
const Connect = lazy(() => import('./pages/Connect'));
const Resume = lazy(() => import('./pages/Resume'));
const Article = lazy(() => import('./pages/Article'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const NotFound = lazy(() => import('./pages/NotFound'));

import { Command } from 'lucide-react';

const PageLoader = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', background: 'var(--bg-primary)' }}>
    <div style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: 'var(--accent-primary)' }}>
      Loading<span className="blink">_</span>
    </div>
  </div>
);

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -8 },
};

const pageTransition = {
  duration: 0.35,
};


function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/article/:skillId" element={<Article />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function AppContent() {
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(o => !o);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
      <Navbar />
      {/* CMD K hint / Mobile Commands FAB */}
      <motion.div
        className="fixed left-0 top-1/2 -translate-y-1/2 md:bottom-8 md:left-8 md:top-auto md:translate-y-0 z-50 flex items-center gap-2 px-3 py-2.5 md:px-3.5 md:py-2 rounded-r-lg md:rounded-lg border-y border-r border-l-0 md:border cursor-pointer select-none"
        style={{
          background: 'rgba(17, 17, 17, 0.85)',
          backdropFilter: 'blur(12px)',
          borderColor: 'var(--border)',
          color: 'var(--text-primary)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
        whileHover={{
          scale: 1.05,
          borderColor: 'var(--accent-primary)',
          boxShadow: '0 0 15px var(--glow), 0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setCmdOpen(true)}
      >
        <Command size={14} className="text-[var(--accent-primary)] animate-pulse" />
        
        {/* Desktop View */}
        <span className="hidden md:inline font-mono text-xs font-medium tracking-wide">
          Command Palette
        </span>
        <kbd className="hidden md:inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-mono border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-muted)] ml-1">
          ⌘K
        </kbd>

        {/* Mobile View */}
        <span className="md:hidden font-mono text-[11px] font-semibold tracking-wider text-[var(--accent-primary)]">
          COMMANDS
        </span>
      </motion.div>
      <main style={{ minHeight: '100vh' }}>
        <AnimatedRoutes />
      </main>
      <Footer />
      <GoToTop />
      <AskMuhammadAgent />
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      {/* Scanlines overlay */}
      <div className="scanlines" />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Loading screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: 'fixed', inset: 0, zIndex: 10000 }}
          >
            <LoadingScreen onDone={() => setLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main app */}
      {!loading && <AppContent />}
    </BrowserRouter>
  );
}
