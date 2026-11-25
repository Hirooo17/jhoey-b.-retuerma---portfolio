export const profile = {
  name: "Hero Jhoey B. Retuerma",
  email: "retuerma.h.bscs@gmail.com",
  github: "https://github.com/Hirooo17",
  linkedin: "https://www.linkedin.com/in/hero-jhoey-retuerma-210a1a351",
  resume: "/Retuerma-Resume.pdf",
};

export const projects = [
  {
    title: "Synthetic Voice Detection",
    category: "Machine learning",
    year: "2025",
    art: "audio",
    description:
      "Listening for the difference between a human voice and a synthetic one.",
    notes:
      "For my EARIST capstone, I designed and trained a hybrid WavLM–AASIST model to classify speech. A React interface sends audio to a Flask API for real-time inference. The model reached 90% classification accuracy on the training and test datasets.",
    tags: ["Python", "TensorFlow", "Librosa", "NumPy", "React", "Flask"],
    repo: "Thesiiis",
  },
  {
    title: "CleanComm",
    category: "Community platform",
    year: "2023",
    art: "map",
    description:
      "A shared place for residents to report barangay concerns and follow their progress.",
    notes:
      "Also listed as Clean.com, this MERN application brings reports into one place. I implemented role-based access, report management and live updates so administrators can track a concern from submission through follow-up.",
    tags: ["MongoDB", "Express", "React", "Node.js", "Vite", "Tailwind CSS"],
    repo: "Cleancom",
  },
  {
    title: "GoParent",
    category: "Mobile development",
    year: "2023–24",
    art: "steps",
    description:
      "A playful way for families to keep schedules, tasks and daily routines together.",
    notes:
      "I developed a Flutter app for Android, iOS and web. Family activities can be added, edited, retrieved and removed, with Firebase keeping the records available between sessions. The project includes mission screens, an activity history and a profile editor.",
    tags: ["Flutter", "Dart", "Firebase"],
    repo: "app-go-parent",
  },
  {
    title: "Dental Management System",
    category: "Clinic software",
    year: "2024",
    art: "dental",
    description: "A desktop management application for a dental clinic.",
    notes:
      "The Visual Basic .NET project separates appointment viewing, reservations, patient profiles and patient history into desktop forms. An appointment viewer and a patient history view give the clinic different ways to look up a visit.",
    tags: ["Visual Basic", ".NET"],
    repo: "DentalManageMentSystemPLSPLSPLS",
  },
  {
    title: "Personal Portfolio Website",
    category: "Creative development",
    year: "2025–26",
    art: "type",
    description:
      "An interactive workbench for exploring my projects and the person behind them.",
    notes:
      "I use this portfolio to experiment with typography, responsive interfaces and motion. Its pocket-sized computer pairs original SVG artwork with controls you can operate by keyboard or touch.",
    tags: ["React", "TypeScript", "Vite", "CSS"],
    repo: "jhoey-b.-retuerma---portfolio",
    demo: "https://jhoey-b-retuerma-portfolio.vercel.app",
  },
];

export const experience = [
  [
    "Current · Aug 2026 onward",
    "PLDT Service Care",
    "L1 Backend Support",
    "My formal role is L1 Technical Support Engineer with Infocom | PLDT Service Care. I handle backend network reconfiguration tickets, guide customers through troubleshooting and coordinate service escalations with technicians.",
  ],
  [
    "One-month contract · Hybrid",
    "Withcenter Inc., Korea",
    "Freelance Flutter Developer",
    "I collaborated with other developers on a mobile application for a BPO company. My focus was quality assurance and backend security features alongside Flutter development.",
  ],
  [
    "Feb – Aug 2026 · Internship",
    "Infosys BPM Limited",
    "Software Developer / QA & IT Service Desk Intern",
    "During the SKIPP program I built UI components under senior guidance, wrote test cases, checked fixes and documented defects. On the service desk I supported hardware, software and network troubleshooting, ticket follow-ups and escalations.",
  ],
];

export const toolbox: Record<string, string[]> = {
  Web: [
    "React",
    "TypeScript",
    "JavaScript",
    "HTML / CSS",
    "Tailwind CSS",
    "Next.js",
    "Vite",
    "Node.js",
    "Express",
    "Flask",
    "FastAPI",
    "Git",
    "GitHub",
    "Vercel",
    "Postman",
    "Socket.IO",
  ],
  Mobile: [
    "Flutter",
    "Dart",
    "React Native",
    "Expo Go",
    "Android SDK",
    "Firebase",
    "SQLite",
  ],
  Data: [
    "Python",
    "TensorFlow",
    "PyTorch",
    "WavLM",
    "AASIST",
    "scikit-learn",
    "Librosa",
    "NumPy",
    "Pandas",
    "Jupyter",
    "MongoDB",
    "PostgreSQL",
    "Supabase",
  ],
  Quality: [
    "Playwright",
    "Selenium",
    "Test cases",
    "Regression testing",
    "Bug reporting",
    "Manual testing",
    "QA documentation",
    "Backend security",
  ],
  Support: [
    "Backend support",
    "IT service desk",
    "Hardware and software troubleshooting",
    "Ticketing systems",
    "Customer communication",
  ],
};
