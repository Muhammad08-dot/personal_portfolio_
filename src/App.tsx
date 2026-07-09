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
      {/* CMD K hint */}
      <div
        className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-50 flex items-center gap-[6px] px-3 py-1.5 rounded-md border border-[var(--border)] cursor-pointer"
        style={{ background: 'rgba(17,17,17,0.8)', backdropFilter: 'blur(8px)' }}
        onClick={() => setCmdOpen(true)}
      >
        <kbd style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: 'var(--text-muted)' }}>⌘K</kbd>
        <span className="hidden md:inline" style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: 'var(--text-muted)' }}>Command Palette</span>
        <span className="md:hidden" style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: 'var(--text-muted)' }}>Cmd</span>
      </div>
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
