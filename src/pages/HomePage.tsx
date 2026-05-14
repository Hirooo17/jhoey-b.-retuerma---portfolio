import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';
import {
  Code2,
  Smartphone,
  BrainCircuit,
  ArrowRight,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

interface HomePageProps {
  onNavigateToProjects: () => void;
  onNavigateToAbout: () => void;
}

export default function HomePage({ onNavigateToProjects, onNavigateToAbout }: HomePageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <div ref={containerRef}>
      {/* ─── Hero Section ─── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden px-6">
        {/* Animated background orbs */}
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.08)_0%,_transparent_50%)]" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[150px]"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[150px]"
          />
        </motion.div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 z-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '3rem' }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-[2px] bg-emerald-400 mb-6"
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-emerald-400 font-mono text-sm md:text-base mb-6 tracking-wider uppercase"
            >
              Hello, I'm
            </motion.h2>

            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter leading-[0.9] mb-8">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Hero Jhoey B.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-500"
              >
                Retuerma
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col md:flex-row gap-6 md:items-center mt-12"
            >
              <div className="h-[1px] w-12 bg-zinc-700 hidden md:block" />
              <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl font-light leading-relaxed">
                A passionate developer from{' '}
                <span className="text-white font-medium">Makati City</span>,{' '}
                BSCS Graduate from{' '}
                <span className="text-white font-medium">EARIST</span>.{' '}
                <br className="hidden md:block" />
                Crafting intelligent systems, seamless mobile experiences, and modern web
                applications.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4 mt-10"
            >
              <motion.a
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 0 40px rgba(16,185,129,0.2)',
                }}
                whileTap={{ scale: 0.97 }}
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-8 py-4 bg-emerald-500 text-black rounded-full font-semibold transition-all hover:bg-emerald-400"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onNavigateToAbout}
                className="flex items-center gap-2 px-8 py-4 border border-zinc-700 text-white rounded-full font-medium hover:border-zinc-500 hover:bg-zinc-900/50 transition-all cursor-pointer"
              >
                About Me
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onNavigateToProjects}
                className="flex items-center gap-2 px-8 py-4 border border-zinc-700 text-zinc-400 rounded-full font-medium hover:border-zinc-500 hover:text-white hover:bg-zinc-900/50 transition-all cursor-pointer"
              >
                View Work
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500"
        >
          <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Stats Strip ─── */}
      <section className="py-12 px-6 relative z-10 border-y border-zinc-800/30 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            <StatItem value="8+" label="Projects Completed" delay={0} />
            <StatItem value="3" label="Areas of Expertise" delay={0.1} />
            <StatItem value="2+" label="Years Learning" delay={0.2} />
            <StatItem value="∞" label="Curiosity" delay={0.3} />
          </div>
        </div>
      </section>

      {/* ─── Expertise ─── */}
      <section id="expertise" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            label="What I Do"
            title="Areas of Expertise"
            description="Specialized in building end-to-end solutions across mobile, web, and machine learning domains."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ExpertiseCard
              icon={<Smartphone className="w-7 h-7" />}
              iconColor="text-emerald-400"
              bgColor="bg-emerald-500/10"
              borderColor="group-hover:border-emerald-500/30"
              title="Mobile Dev"
              description="Building cross-platform Android applications with fluid animations and native-like performance."
              tags={['Flutter', 'Expo Go', 'Android']}
              delay={0.1}
            />
            <ExpertiseCard
              icon={<BrainCircuit className="w-7 h-7" />}
              iconColor="text-indigo-400"
              bgColor="bg-indigo-500/10"
              borderColor="group-hover:border-indigo-500/30"
              title="Machine Learning"
              description="Developing AI models and intelligent systems. Previous work includes creating synthetic voice detection models."
              tags={['Python', 'Voice Detection', 'Data Science']}
              delay={0.2}
            />
            <ExpertiseCard
              icon={<Code2 className="w-7 h-7" />}
              iconColor="text-amber-400"
              bgColor="bg-amber-500/10"
              borderColor="group-hover:border-amber-500/30"
              title="Web Development"
              description="Crafting responsive, accessible, and highly interactive web interfaces with modern frontend tooling."
              tags={['React', 'Tailwind CSS', 'TypeScript']}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ─── Featured Projects ─── */}
      <section id="projects" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <SectionHeader
              label="Portfolio"
              title="Selected Works"
              description="A showcase of my recent projects across mobile, web, and machine learning."
              className="mb-0"
            />
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNavigateToProjects}
              className="flex items-center gap-2 px-6 py-3 bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/40 text-white rounded-full font-medium transition-all group cursor-pointer shrink-0 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
            >
              See All Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} delay={0.1 * (index + 1)} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section id="contact" className="py-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl p-10 md:p-16 text-center overflow-hidden"
          >
            {/* Gradient border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-zinc-800/50 to-indigo-500/20 p-[1px]">
              <div className="absolute inset-[1px] rounded-3xl bg-[#0a0a0a]" />
            </div>

            {/* Top glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,_rgba(16,185,129,0.1)_0%,_transparent_60%)]" />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="text-emerald-400 font-mono text-sm tracking-wider uppercase mb-4 block">
                  Contact
                </span>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                  Let's build something great.
                </h2>
                <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                  Currently open for new opportunities. Whether you have a question or just want to
                  say hi, I'll try my best to get back to you!
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <motion.a
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 30px rgba(16,185,129,0.2)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:retuerma.h.bscs@gmail.com"
                  className="flex items-center gap-2 bg-emerald-500 text-black px-8 py-4 rounded-full font-semibold hover:bg-emerald-400 transition-colors w-full sm:w-auto justify-center"
                >
                  <Mail className="w-5 h-5" />
                  Say Hello
                </motion.a>

                <div className="flex gap-3 w-full sm:w-auto justify-center">
                  <SocialButton icon={<Github className="w-5 h-5" />} href="#" />
                  <SocialButton icon={<Linkedin className="w-5 h-5" />} href="#" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ─── Sub-components ─── */

function SectionHeader({
  label,
  title,
  description,
  className = 'mb-16',
}: {
  label: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
      className={className}
    >
      <span className="text-emerald-400 font-mono text-sm tracking-wider uppercase mb-4 block">
        {label}
      </span>
      <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
        {title}
      </h2>
      <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">{description}</p>
    </motion.div>
  );
}

function StatItem({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="text-center md:text-left"
    >
      <div className="font-display text-3xl md:text-4xl font-bold text-white mb-1">{value}</div>
      <div className="text-zinc-500 text-sm font-medium">{label}</div>
    </motion.div>
  );
}

function ExpertiseCard({
  icon,
  iconColor,
  bgColor,
  borderColor,
  title,
  description,
  tags,
  delay,
}: {
  icon: React.ReactNode;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  title: string;
  description: string;
  tags: string[];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className={`group bg-zinc-900/30 border border-zinc-800/50 ${borderColor} rounded-2xl p-8 transition-all duration-500 flex flex-col h-full hover:shadow-lg hover:shadow-zinc-900/50`}
    >
      <div
        className={`${bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-zinc-800/30`}
      >
        <div className={iconColor}>{icon}</div>
      </div>
      <h3 className="font-display text-2xl font-semibold text-white mb-4">{title}</h3>
      <p className="text-zinc-400 leading-relaxed mb-8 flex-grow text-[15px]">{description}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono px-3 py-1.5 bg-zinc-800/50 text-zinc-400 rounded-full border border-zinc-700/30"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function SocialButton({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <motion.a
      whileHover={{ scale: 1.1, backgroundColor: 'rgba(39, 39, 42, 0.8)' }}
      whileTap={{ scale: 0.9 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-14 h-14 rounded-full bg-zinc-900/80 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
    >
      {icon}
    </motion.a>
  );
}
