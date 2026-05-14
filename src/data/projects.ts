export type ProjectCategory = 'web' | 'mobile' | 'ml';

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: ProjectCategory;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  year: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Synthetic Voice Detection",
    description: "A machine learning model designed to detect AI-generated and synthetic voices with high accuracy to prevent audio spoofing and deepfake attacks.",
    tags: ["Python", "TensorFlow", "Librosa", "NumPy"],
    category: "ml",
    githubUrl: "#",
    liveUrl: "#",
    featured: true,
    year: "2025",
  },
  {
    id: 2,
    title: "Modern Portfolio Website",
    description: "An interactive web portfolio built with React and Tailwind CSS, featuring smooth animations, page transitions, and a dark mode aesthetic.",
    tags: ["React", "Tailwind CSS", "TypeScript", "Motion"],
    category: "web",
    githubUrl: "#",
    liveUrl: "#",
    featured: true,
    year: "2025",
  },
  {
    id: 4,
    title: "Clean.com",
    description: "A Barangay Reporting website designed for community improvement.",
    tags: ["React", "Vite", "Tailwind CSS", "MongoDB"],
    category: "web",
    githubUrl: "#",
    liveUrl: "#",
    year: "2025",
  },
  {
    id: 5,
    title: "Dental Management System",
    description: "A comprehensive management system for dental clinics.",
    tags: [".NET", "Visual Basic"],
    category: "web",
    githubUrl: "#",
    liveUrl: "#",
    year: "2024",
  },
  {
    id: 6,
    title: "GoParent",
    description: "A gamified parenting app built for cross-platform compatibility.",
    tags: ["Flutter", "Dart"],
    category: "mobile",
    githubUrl: "#",
    liveUrl: "#",
    year: "2024",
  },
];

export const categories: { id: ProjectCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'ml', label: 'Machine Learning' },
];
