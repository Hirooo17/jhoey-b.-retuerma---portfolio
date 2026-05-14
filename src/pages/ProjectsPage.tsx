import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { projects, categories, type ProjectCategory } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

interface ProjectsPageProps {
  onNavigateHome: () => void;
}

export default function ProjectsPage({ onNavigateHome }: ProjectsPageProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all');

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <motion.button
            onClick={onNavigateHome}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors mb-8 cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </motion.button>

          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-400 font-mono text-sm tracking-wider uppercase">
              Portfolio
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
            All Projects
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
            Explore my complete collection of projects spanning web development, mobile applications,
            and machine learning solutions.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700/50'
              }`}
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="filter-pill"
                  className="absolute inset-0 bg-emerald-500/15 border border-emerald-500/30 rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Projects count */}
        <motion.p
          key={filteredProjects.length}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-zinc-500 text-sm font-mono mb-8"
        >
          Showing {filteredProjects.length} project
          {filteredProjects.length !== 1 ? 's' : ''}
        </motion.p>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} delay={0.05 * index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-zinc-500 text-lg">No projects found in this category.</p>
          </motion.div>
        )}

        {/* Back to top */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 flex justify-center"
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
