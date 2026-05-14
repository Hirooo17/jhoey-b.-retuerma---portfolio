import { motion } from 'motion/react';
import { useState, useEffect, type ReactNode } from 'react';
import type { Page } from '../App';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page, scrollTarget?: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNavClick = (target: string) => {
    if (currentPage === 'home') {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('home', target);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 transition-all duration-500 ${
        scrolled ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.button
          onClick={() => onNavigate('home')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="font-display font-bold text-xl tracking-tighter text-white cursor-pointer relative group"
        >
          HJBR<span className="text-emerald-400">.</span>
          <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-[2px] bg-emerald-400 transition-all duration-300" />
        </motion.button>

        <div className="flex items-center gap-0.5 bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/30 rounded-full px-1.5 py-1.5">
          <NavLink active={currentPage === 'home'} onClick={() => onNavigate('home')}>
            Home
          </NavLink>
          <NavLink active={currentPage === 'about'} onClick={() => onNavigate('about')}>
            About
          </NavLink>
          <NavLink active={false} onClick={() => handleNavClick('expertise')}>
            Expertise
          </NavLink>
          <NavLink active={currentPage === 'projects'} onClick={() => onNavigate('projects')}>
            Projects
          </NavLink>
          <NavLink active={false} onClick={() => handleNavClick('contact')}>
            Contact
          </NavLink>
        </div>
      </div>
    </motion.nav>
  );
}

function NavLink({
  children,
  active,
  onClick,
}: {
  children: ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer ${
        active ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
      }`}
    >
      {active && (
        <motion.div
          layoutId="nav-active-pill"
          className="absolute inset-0 bg-zinc-800/80 rounded-full border border-zinc-700/30"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
