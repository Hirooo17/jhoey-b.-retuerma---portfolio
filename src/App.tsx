import { AnimatePresence, motion } from 'motion/react';
import { useState, useCallback, useEffect } from 'react';
import Navigation from './components/Navigation';
import ScrollProgress from './components/ScrollProgress';
import CursorGlow from './components/CursorGlow';
import Footer from './components/Footer';
import AiBot from './components/AiBot';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import PageTransition from './components/PageTransition';

export type Page = 'home' | 'projects' | 'about';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const navigateTo = useCallback((page: Page, scrollTarget?: string) => {
    setCurrentPage(page);
    if (scrollTarget) {
      setTimeout(() => {
        document.getElementById(scrollTarget)?.scrollIntoView({ behavior: 'smooth' });
      }, 600);
    } else {
      window.scrollTo({ top: 0 });
    }
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-zinc-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <CursorGlow />
          <ScrollProgress />
          <AiBot />
          <Navigation currentPage={currentPage} onNavigate={navigateTo} />

          <AnimatePresence mode="wait">
            {currentPage === 'home' && (
              <PageTransition key="home">
                <HomePage onNavigateToProjects={() => navigateTo('projects')} onNavigateToAbout={() => navigateTo('about')} />
              </PageTransition>
            )}
            {currentPage === 'projects' && (
              <PageTransition key="projects">
                <ProjectsPage onNavigateHome={() => navigateTo('home')} />
              </PageTransition>
            )}
            {currentPage === 'about' && (
              <PageTransition key="about">
                <AboutPage onNavigateHome={() => navigateTo('home')} />
              </PageTransition>
            )}
          </AnimatePresence>

          <Footer />
        </motion.div>
      )}
    </div>
  );
}

function LoadingScreen() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[200] bg-[#050505] flex items-center justify-center"
    >
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-5xl md:text-7xl font-bold text-white tracking-tighter mb-4"
        >
          HJBR<span className="text-emerald-400">.</span>
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="h-[2px] bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto rounded-full"
          style={{ maxWidth: '200px' }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-zinc-500 text-sm font-mono mt-4 tracking-wider"
        >
          Loading experience...
        </motion.p>
      </div>
    </motion.div>
  );
}
