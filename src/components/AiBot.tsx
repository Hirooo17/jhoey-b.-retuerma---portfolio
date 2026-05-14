import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export default function AiBot() {
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dialog, setDialog] = useState("Hi! I'm Hero Jhoey's AI assistant.");
  const [showDialog, setShowDialog] = useState(true);

  useEffect(() => {
    setTargetPos({ x: window.innerWidth - 80, y: 80 });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a') || target.closest('button');

      if (isInteractive) {
        setDialog('Great choice!');
      } else {
        setTargetPos({ x: e.clientX, y: e.clientY });
        const DIALOGS = [
          'Moving over here!',
          "What's in this area?",
          'Beep boop! On my way.',
          'Exploring the portfolio...',
          'Nice click!',
          "I'm following you!",
        ];
        setDialog(DIALOGS[Math.floor(Math.random() * DIALOGS.length)]);
      }

      setShowDialog(true);
      setTimeout(() => setShowDialog(false), 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const timer = setTimeout(() => setShowDialog(false), 4000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      clearTimeout(timer);
    };
  }, []);

  const dx = mousePos.x - targetPos.x;
  const dy = mousePos.y - targetPos.y;
  const angle = Math.atan2(dy, dx);
  const distance = Math.min(Math.sqrt(dx * dx + dy * dy), 8);

  const eyeX = Math.cos(angle) * distance;
  const eyeY = Math.sin(angle) * distance;

  return (
    <motion.div
      animate={{ x: targetPos.x - 24, y: targetPos.y - 24 }}
      transition={{ type: 'spring', stiffness: 80, damping: 12, mass: 1 }}
      className="fixed top-0 left-0 z-[100] pointer-events-none"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{
          opacity: showDialog ? 1 : 0,
          scale: showDialog ? 1 : 0.8,
          y: showDialog ? 0 : 10,
        }}
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-max max-w-[200px] bg-zinc-800 text-emerald-400 text-xs font-mono px-3 py-2 rounded-2xl rounded-br-sm border border-zinc-700 shadow-xl"
      >
        {dialog}
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="w-12 h-12 bg-zinc-900 border-2 border-emerald-500/50 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.2)] flex items-center justify-center relative overflow-hidden backdrop-blur-sm"
      >
        <motion.div animate={{ x: eyeX, y: eyeY }} className="flex gap-2">
          <div className="w-2 h-3 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <div className="w-2 h-3 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
