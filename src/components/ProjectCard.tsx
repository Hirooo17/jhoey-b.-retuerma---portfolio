import { motion } from 'motion/react';
import { Code2, Smartphone, BrainCircuit, Github, ExternalLink } from 'lucide-react';
import type { Project } from '../data/projects';
import type { FC } from 'react';

const categoryIcons = {
  web: Code2,
  mobile: Smartphone,
  ml: BrainCircuit,
};

const ProjectCard: FC<{ project: Project; delay?: number }> = ({ project, delay = 0 }) => {
  const Icon = categoryIcons[project.category] || Code2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      {/* Animated gradient border on hover */}
      <div className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-emerald-500/20 via-transparent to-indigo-500/20 blur-[1px]" />

      <div className="relative bg-zinc-900/50 border border-zinc-800/50 group-hover:border-zinc-700/30 rounded-3xl p-8 transition-all duration-500 flex flex-col h-full overflow-hidden backdrop-blur-sm">
        {/* Background glow on hover */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/[0.03] rounded-full blur-3xl -mr-32 -mt-32 transition-opacity duration-700 group-hover:opacity-100 opacity-0" />

        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="bg-zinc-800/80 w-12 h-12 rounded-xl flex items-center justify-center border border-zinc-700/50 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all duration-300">
            <Icon className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400 transition-colors duration-300" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-600 group-hover:text-zinc-500 transition-colors">
              {project.year}
            </span>
            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-zinc-800/50"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-zinc-800/50"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        <h3 className="font-display text-xl font-semibold text-white mb-3 relative z-10 group-hover:text-emerald-300 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow relative z-10">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto relative z-10">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-3 py-1.5 bg-zinc-800/50 text-zinc-400 rounded-full border border-zinc-700/30 group-hover:border-zinc-600/30 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
