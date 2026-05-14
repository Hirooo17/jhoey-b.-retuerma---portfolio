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
    title: "E-Commerce Mobile App",
    description: "A fully functional cross-platform mobile application built with Flutter, featuring real-time inventory management and seamless checkout flow.",
    tags: ["Flutter", "Dart", "Firebase", "Stripe"],
    category: "mobile",
    githubUrl: "#",
    liveUrl: "#",
    featured: true,
    year: "2025",
  },
  {
    id: 3,
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
    title: "Task Manager Pro",
    description: "A productivity-focused mobile app with offline-first architecture, smart reminders, and project organization capabilities.",
    tags: ["Flutter", "SQLite", "Provider", "Hive"],
    category: "mobile",
    githubUrl: "#",
    year: "2024",
  },
  {
    id: 5,
    title: "Sentiment Analysis Tool",
    description: "An NLP-powered tool that analyzes customer feedback and social media posts to extract sentiment and trending topics in real-time.",
    tags: ["Python", "NLP", "scikit-learn", "FastAPI"],
    category: "ml",
    githubUrl: "#",
    liveUrl: "#",
    year: "2024",
  },
  {
    id: 6,
    title: "Real-time Chat Application",
    description: "A modern messaging platform with real-time communication, file sharing, and group chat functionality with end-to-end encryption.",
    tags: ["React", "Socket.io", "Node.js", "MongoDB"],
    category: "web",
    githubUrl: "#",
    liveUrl: "#",
    year: "2024",
  },
  {
    id: 7,
    title: "Fitness Companion",
    description: "A health and fitness tracker with workout routines, progress tracking, and personalized exercise recommendations powered by ML.",
    tags: ["React Native", "Expo", "Supabase", "Charts"],
    category: "mobile",
    githubUrl: "#",
    year: "2024",
  },
  {
    id: 8,
    title: "Image Classification API",
    description: "A RESTful API service for real-time image classification using deep learning, deployed as a scalable microservice with Docker.",
    tags: ["Python", "PyTorch", "FastAPI", "Docker"],
    category: "ml",
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
