import { motion } from 'motion/react';
import { Award } from 'lucide-react';

export default function CertificationsPage() {
  const certifications = [
    {
      id: 1,
      title: "Infosys Trainee at BGC IT Helpdesk and IT Intern",
      date: "2024",
      description: "Provided IT support and Helpdesk services as a trainee and intern at Infosys BGC."
    },
    {
      id: 2,
      title: "CompTIA A+ Certification",
      date: "2023",
      description: "Certified in fundamental IT skills including hardware, software, and troubleshooting."
    }
  ];

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Certifications
          </span>
        </h1>
        <p className="text-zinc-400 max-w-2xl text-lg">
          My professional certifications and prominent training experiences.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 hover:bg-zinc-800/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                <Award size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
                <p className="text-sm text-emerald-400 mb-3">{cert.date}</p>
                <p className="text-zinc-400">{cert.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}