import { motion } from 'motion/react';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-10 px-6 border-t border-zinc-900/50"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-zinc-600 text-sm">
          © {new Date().getFullYear()} Hero Jhoey B. Retuerma. All rights reserved.
        </p>
        <p className="text-zinc-700 text-xs font-mono">Built with React + Motion</p>
      </div>
    </motion.footer>
  );
}
