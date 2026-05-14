import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function CursorGlow() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [hasPointer, setHasPointer] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    setHasPointer(fine);
    if (!fine) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!hasPointer) return null;

  return (
    <motion.div
      animate={{
        x: mousePos.x - 200,
        y: mousePos.y - 200,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
      className="fixed w-[400px] h-[400px] rounded-full pointer-events-none z-[1]"
      style={{
        background:
          'radial-gradient(circle, rgba(16,185,129,0.07) 0%, rgba(16,185,129,0.02) 40%, transparent 70%)',
      }}
    />
  );
}
