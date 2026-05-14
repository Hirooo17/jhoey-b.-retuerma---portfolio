import { motion } from 'motion/react';
import {
  MapPin,
  GraduationCap,
  Calendar,
  Heart,
  Code2,
  Smartphone,
  BrainCircuit,
  Coffee,
  Gamepad2,
  Music,
  ArrowLeft,
  Download,
} from 'lucide-react';

interface AboutPageProps {
  onNavigateHome: () => void;
}

export default function AboutPage({ onNavigateHome }: AboutPageProps) {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={onNavigateHome}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors mb-12 cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </motion.button>

        {/* ─── Hero Section ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 mb-24">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 flex justify-center lg:justify-start"
          >
            <div className="relative group">
              {/* Animated gradient ring */}
              <div className="absolute -inset-[3px] rounded-3xl bg-gradient-to-br from-emerald-500/40 via-transparent to-indigo-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[2px]" />
              <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden border border-zinc-800/50 bg-zinc-900/50">
                <img
                  src="/profile.svg"
                  alt="Hero Jhoey B. Retuerma"
                  className="w-full h-full object-cover object-center"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
              </div>
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-zinc-900/90 border border-zinc-800/50 backdrop-blur-xl px-4 py-2 rounded-full"
              >
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-zinc-300">Open to opportunities</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <span className="text-emerald-400 font-mono text-sm tracking-wider uppercase mb-4 block">
              About Me
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-[1.1]">
              Hero Jhoey B.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-500">
                Retuerma
              </span>
            </h1>

            <div className="flex flex-wrap gap-3 mb-8">
              <InfoBadge icon={<MapPin className="w-3.5 h-3.5" />} text="Makati City, Philippines" />
              <InfoBadge icon={<GraduationCap className="w-3.5 h-3.5" />} text="BSCS — EARIST" />
              <InfoBadge icon={<Calendar className="w-3.5 h-3.5" />} text="Fresh Graduate" />
            </div>

            <div className="space-y-4 text-zinc-400 text-[15px] leading-relaxed">
              <p>
                Hey there! I'm <span className="text-white font-medium">Hero Jhoey</span> — but most
                people just call me Jhoey. I'm a passionate software developer from{' '}
                <span className="text-white font-medium">Makati City, Philippines</span>, and a proud
                graduate of{' '}
                <span className="text-white font-medium">
                  Bachelor of Science in Computer Science
                </span>{' '}
                from the{' '}
                <span className="text-emerald-400 font-medium">
                  Eulogio "Amang" Rodriguez Institute of Science and Technology (EARIST)
                </span>
                .
              </p>
              <p>
                I've always been fascinated by technology and how it can solve real-world problems.
                During my college years, I dove deep into{' '}
                <span className="text-white font-medium">mobile development</span>,{' '}
                <span className="text-white font-medium">machine learning</span>, and{' '}
                <span className="text-white font-medium">web development</span> — building projects
                that range from AI-powered voice detection systems to cross-platform mobile apps.
              </p>
              <p>
                What drives me is the thrill of turning complex ideas into polished, user-friendly
                products. I believe in writing clean code, designing intuitive interfaces, and
                continuously learning new technologies to stay ahead of the curve.
              </p>
              <p>
                When I'm not coding, you'll probably find me exploring new tech, gaming, or vibing to
                music. I'm currently <span className="text-emerald-400 font-medium">open to new opportunities</span> —
                whether it's full-time roles, freelance projects, or exciting collaborations.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <motion.a
                whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(16,185,129,0.15)' }}
                whileTap={{ scale: 0.97 }}
                href="mailto:retuerma.h.bscs@gmail.com"
                className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black rounded-full font-semibold hover:bg-emerald-400 transition-colors text-sm"
              >
                Get in Touch
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#"
                className="flex items-center gap-2 px-6 py-3 border border-zinc-700 text-white rounded-full font-medium hover:border-zinc-500 hover:bg-zinc-900/50 transition-all text-sm"
              >
                <Download className="w-4 h-4" />
                Download CV
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* ─── Skills & Tech Stack ─── */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <span className="text-emerald-400 font-mono text-sm tracking-wider uppercase mb-4 block">
            Skills
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-12 tracking-tight">
            Tech Stack & Tools
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkillCategory
              icon={<Code2 className="w-5 h-5" />}
              color="amber"
              title="Web Development"
              skills={['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Node.js', 'HTML/CSS', 'JavaScript', 'Vite']}
              delay={0.1}
            />
            <SkillCategory
              icon={<Smartphone className="w-5 h-5" />}
              color="emerald"
              title="Mobile Development"
              skills={['Flutter', 'Dart', 'Expo Go', 'React Native', 'Android SDK', 'Firebase', 'SQLite']}
              delay={0.2}
            />
            <SkillCategory
              icon={<BrainCircuit className="w-5 h-5" />}
              color="indigo"
              title="Machine Learning"
              skills={['Python', 'TensorFlow', 'scikit-learn', 'Librosa', 'NumPy', 'Pandas', 'Jupyter', 'FastAPI']}
              delay={0.3}
            />
          </div>
        </motion.section>

        {/* ─── Interests / Hobbies ─── */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <span className="text-emerald-400 font-mono text-sm tracking-wider uppercase mb-4 block">
            Beyond Code
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-12 tracking-tight">
            When I'm Not Coding
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <InterestCard icon={<Coffee className="w-6 h-6" />} title="Coffee Enthusiast" description="Fueled by caffeine and curiosity" delay={0.1} />
            <InterestCard icon={<Gamepad2 className="w-6 h-6" />} title="Gaming" description="Unwinding with games after long coding sessions" delay={0.15} />
            <InterestCard icon={<Music className="w-6 h-6" />} title="Music" description="Always coding with a good playlist on" delay={0.2} />
            <InterestCard icon={<Heart className="w-6 h-6" />} title="Learning" description="Continuously exploring new technologies" delay={0.25} />
          </div>
        </motion.section>

        {/* ─── Education Timeline ─── */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-emerald-400 font-mono text-sm tracking-wider uppercase mb-4 block">
            Education
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-12 tracking-tight">
            My Journey
          </h2>

          <div className="space-y-6">
            <TimelineItem
              year="2021 — 2025"
              title="Bachelor of Science in Computer Science"
              org={'EARIST — Eulogio "Amang" Rodriguez Institute of Science and Technology'}
              description="Focused on software engineering, data structures, machine learning, and mobile development. Developed a thesis on synthetic voice detection using deep learning."
              delay={0.1}
            />
            <TimelineItem
              year="2019 — 2021"
              title="Senior High School — STEM Strand"
              org="Makati City"
              description="Built a strong foundation in mathematics, science, and introductory programming. Developed a passion for technology and problem-solving."
              delay={0.2}
            />
          </div>
        </motion.section>

        {/* Back to top */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-zinc-500 hover:text-emerald-400 text-sm font-mono transition-colors cursor-pointer flex items-center gap-2"
          >
            ↑ Back to top
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Sub-components ─── */

function InfoBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900/60 border border-zinc-800/50 rounded-full text-xs text-zinc-400">
      <span className="text-emerald-400">{icon}</span>
      {text}
    </div>
  );
}

function SkillCategory({
  icon,
  color,
  title,
  skills,
  delay,
}: {
  icon: React.ReactNode;
  color: string;
  title: string;
  skills: string[];
  delay: number;
}) {
  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'group-hover:border-emerald-500/30' },
    indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'group-hover:border-indigo-500/30' },
    amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'group-hover:border-amber-500/30' },
  };
  const c = colorMap[color] || colorMap.emerald;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
      className={`group bg-zinc-900/30 border border-zinc-800/50 ${c.border} rounded-2xl p-6 transition-all duration-500`}
    >
      <div className={`${c.bg} w-10 h-10 rounded-lg flex items-center justify-center mb-5 border border-zinc-800/30`}>
        <div className={c.text}>{icon}</div>
      </div>
      <h3 className="font-display text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="text-xs font-mono px-3 py-1.5 bg-zinc-800/50 text-zinc-400 rounded-full border border-zinc-700/30 hover:border-zinc-600/50 hover:text-zinc-300 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function InterestCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 rounded-2xl p-6 text-center transition-all duration-300"
    >
      <div className="text-zinc-500 group-hover:text-emerald-400 transition-colors duration-300 mb-3 flex justify-center">
        {icon}
      </div>
      <h3 className="font-display text-sm font-semibold text-white mb-1">{title}</h3>
      <p className="text-zinc-500 text-xs leading-relaxed">{description}</p>
    </motion.div>
  );
}

function TimelineItem({
  year,
  title,
  org,
  description,
  delay,
}: {
  year: string;
  title: string;
  org: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative pl-8 border-l-2 border-zinc-800/50 hover:border-emerald-500/30 transition-colors duration-500 group"
    >
      {/* Timeline dot */}
      <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-zinc-900 border-2 border-zinc-700 group-hover:border-emerald-500 transition-colors duration-300">
        <div className="absolute inset-1 rounded-full bg-zinc-600 group-hover:bg-emerald-400 transition-colors duration-300" />
      </div>

      <span className="text-emerald-400 font-mono text-xs tracking-wider uppercase mb-2 block">
        {year}
      </span>
      <h3 className="font-display text-xl font-semibold text-white mb-1">{title}</h3>
      <p className="text-zinc-500 text-sm font-medium mb-3">{org}</p>
      <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}
