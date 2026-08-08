export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  techStack: string[];
  problem: string;
  solution: string;
  architectureDetails: string[];
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
  metrics: { label: string; value: string }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  bulletPoints: string[];
  techTags: string[];
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  description: string;
  badge: string;
  date?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level?: string; iconName?: string }[];
}

export const RESUME_DATA = {
  personalInfo: {
    name: "Rishitha Mondi",
    title: "AI/ML & Full-Stack Engineer",
    subTitle: "B.Tech in CSE (Data Science)",
    cgpa: "9.36",
    institution: "Vignan's Institute of Information Technology",
    location: "Visakhapatnam, Andhra Pradesh, India",
    email: "rishithashivanandh@gmail.com",
    phone: "+91 6304075658",
    socialLinks: {
      github: "https://github.com/rishithamondi",
      linkedin: "https://www.linkedin.com/in/rishitha-shivanandh/",
      leetcode: "https://leetcode.com/u/rishithamondi/",
      codechef: "https://www.codechef.com/users/rishithamondi",
    },
    shortQuote: "“Code is a discipline of thought, written with paper-like clarity and AI precision.”",
    bio: "I am an AI/ML and Full-Stack Developer with a 9.36 CGPA in Computer Science & Data Science. I focus on engineering enterprise-grade conversational AI systems, high-concurrency microservices, and modern web applications with clean, responsive user interfaces.",
    currentFocus: "Architecting multilingual real-time AI speech & text streaming microservices and interactive coding analysis platforms."
  },

  experience: [
    {
      id: "exp-1",
      role: "AI/ML Intern",
      company: "Kreative TimeBox Pvt. Ltd.",
      location: "Remote",
      period: "July 2026 – Present",
      isCurrent: true,
      bulletPoints: [
        "Contributing to the development of ConversaAI, an enterprise-grade multilingual conversational AI platform integrating Large Language Models (LLMs), Speech-to-Text (STT), Text-to-Speech (TTS), real-time translation, and streaming communication through a scalable microservices architecture.",
        "Developing and enhancing cross-platform web and mobile applications using React, React Native, and modern frontend technologies while collaborating on backend services, REST APIs, WebSocket-based real-time communication, authentication workflows, and platform-wide feature integration."
      ],
      techTags: ["LLMs", "STT/TTS", "React", "React Native", "WebSockets", "Microservices", "REST APIs"]
    },
    {
      id: "exp-2",
      role: "Web Developer Intern",
      company: "CodSoft",
      location: "Remote",
      period: "June 2025 – July 2025",
      isCurrent: false,
      bulletPoints: [
        "Built responsive React-based interfaces for a cloud cafe management platform by integrating backend APIs, modular UI components, and optimized frontend workflows to deliver a scalable and maintainable application."
      ],
      techTags: ["React.js", "RESTful APIs", "UI Components", "Frontend Workflows"]
    }
  ] as Experience[],

  projects: [
    {
      id: "lucy-ai",
      title: "LUCY AI",
      subtitle: "AI-Powered Technical Interview & Voice Workspace Platform",
      category: "AI & Real-Time Engineering",
      techStack: ["Next.js", "FastAPI", "PostgreSQL", "OpenRouter", "faster-whisper", "OpenAI TTS", "Tailwind CSS"],
      problem: "Traditional technical interviewing platforms lack interactive logic visualizers and bidirectional real-time voice feedback during code execution.",
      solution: "Engineered an immersive voice AI technical interview platform synchronizing live voice transcripts, flowchart visualizers, dynamic complexity graphs, and isolated code evaluation.",
      architectureDetails: [
        "Bidirectional voice streaming via faster-whisper STT and OpenAI TTS.",
        "Interactive flowchart visualizer translating code logic into execution graphs.",
        "Isolated code execution engine evaluating live test cases with metrics.",
        "Automated rubric generator synthesizing session data into performance feedback."
      ],
      highlights: [
        "Engineered an interactive visualizer mapping user logic to step-by-step flowcharts and dynamic time complexity graphs.",
        "Built a secure code execution engine evaluating live submissions against isolated test suites to track real-time metrics.",
        "Designed an immersive interview workspace synchronizing bidirectional voice AI, live transcripts, and active code editing.",
        "Developed an automated grading system synthesizing session data into detailed performance rubrics & actionable feedback."
      ],
      liveUrl: "https://lucy-ai-dsa.vercel.app/",
      githubUrl: "https://github.com/rishithamondi/lucy-ai",
      metrics: [
        { label: "Voice AI Sync", value: "Real-time" },
        { label: "Graphing Engine", value: "Dynamic Flow" },
        { label: "Code Runtime", value: "Isolated Suites" }
      ]
    },
    {
      id: "leavex",
      title: "LeaveX",
      subtitle: "Hostel Leave Management System & Pass Engine",
      category: "Full-Stack Web Application",
      techStack: ["Next.js", "FastAPI", "TypeScript", "SupaBase", "Tailwind CSS", "JWT"],
      problem: "Manual hostel leave approvals cause operational bottlenecks, lost medical records, and unverifiable paper exit passes.",
      solution: "Architected a secure, centralized web platform automating the end-to-end leave application lifecycle with dynamic role-based dashboards and cryptographic QR digital passes.",
      architectureDetails: [
        "Role-based authorization for students, wardens, and admin staff.",
        "Conditional medical certificate enforcement based on leave duration.",
        "Cryptographically signed QR token engine for instant digital verification.",
        "Real-time aggregation engine for active leave balances and statistics."
      ],
      highlights: [
        "Streamlined workflows via role-based dashboards, dynamically enforcing conditional medical certificate uploads.",
        "Developed an automated QR verification system utilizing cryptographic tokens to instantly authenticate digital passes.",
        "Engineered a real-time statistics engine to dynamically compute active leave balances and aggregate student metrics.",
        "Architected a secure, centralized web platform to completely digitize and automate the end-to-end leave application lifecycle."
      ],
      liveUrl: "https://leavex-hms.vercel.app/",
      githubUrl: "https://github.com/rishithamondi/leavex",
      metrics: [
        { label: "Pass Verification", value: "Instant QR" },
        { label: "Automation", value: "100% Digital" },
        { label: "Security", value: "JWT + SupaBase" }
      ]
    },
    {
      id: "photo-frames",
      title: "Sri Lakshmi Ganapathi Frames",
      subtitle: "Custom E-Commerce Platform & Admin AI Suite",
      category: "Full-Stack E-Commerce",
      techStack: ["React.js", "TypeScript", "Node.js", "Express.js", "Neon", "Tailwind CSS"],
      problem: "N+1 relational query overhead and slow image asset loading degraded e-commerce browsing performance.",
      solution: "Designed a high-performance custom e-commerce engine featuring relational eager loading, zero-disk streaming, and automated Gemini AI SEO generation.",
      architectureDetails: [
        "Eager-loaded SQL query optimization with Neon database.",
        "Zero-disk image streaming directly through admin APIs.",
        "Cloudinary URL transformations for responsive web delivery.",
        "Dual-mode soft-delete and permanent purge architecture with CDN cleanup."
      ],
      highlights: [
        "Engineered dynamic server-side filtering and eliminated costly N+1 database queries via relational eager-loading.",
        "Developed a secure admin API featuring atomic transactions, zero-disk image streaming, and Gemini AI SEO generation.",
        "Optimized frontend caching utilizing TanStack Query and responsive image delivery via Cloudinary URL transformations.",
        "Designed a dual-mode deletion architecture supporting secure soft-deletes and permanent removals with CDN cleanup."
      ],
      liveUrl: "https://srilakshmiganapathiphotoframes.vercel.app/",
      githubUrl: "https://github.com/rishithamondi/SLGPhotoFrames",
      metrics: [
        { label: "N+1 Overhead", value: "Eliminated" },
        { label: "SEO Generator", value: "Gemini AI" },
        { label: "Image Delivery", value: "Zero-Disk" }
      ]
    }
  ] as Project[],

  skillCategories: [
    {
      category: "Programming & Query Languages",
      skills: [
        { name: "Python", level: "Advanced" },
        { name: "Java", level: "Proficient" },
        { name: "SQL", level: "Advanced" },
        { name: "JavaScript", level: "Advanced" },
        { name: "TypeScript", level: "Advanced" }
      ]
    },
    {
      category: "Frontend Development",
      skills: [
        { name: "React.js", level: "Expert" },
        { name: "Next.js", level: "Advanced" },
        { name: "Tailwind CSS", level: "Expert" },
        { name: "React Native", level: "Intermediate" }
      ]
    },
    {
      category: "Backend Development",
      skills: [
        { name: "FastAPI", level: "Advanced" },
        { name: "Node.js", level: "Advanced" },
        { name: "Express.js", level: "Advanced" },
        { name: "RESTful APIs", level: "Expert" },
        { name: "JWT Auth", level: "Advanced" },
        { name: "WebSockets", level: "Proficient" }
      ]
    },
    {
      category: "AI / ML & Voice Tech",
      skills: [
        { name: "Large Language Models (LLMs)", level: "Advanced" },
        { name: "faster-whisper (STT)", level: "Proficient" },
        { name: "OpenAI TTS", level: "Proficient" },
        { name: "OpenRouter APIs", level: "Advanced" },
        { name: "Gemini AI APIs", level: "Advanced" }
      ]
    },
    {
      category: "Databases",
      skills: [
        { name: "MySQL", level: "Advanced" },
        { name: "PostgreSQL", level: "Advanced" },
        { name: "MongoDB", level: "Proficient" },
        { name: "Neon SQL", level: "Advanced" },
        { name: "SupaBase", level: "Advanced" }
      ]
    },
    {
      category: "Tools & Deployment",
      skills: [
        { name: "Git & GitHub", level: "Expert" },
        { name: "Docker", level: "Proficient" },
        { name: "VS Code", level: "Expert" },
        { name: "Postman", level: "Advanced" },
        { name: "Vercel", level: "Advanced" },
        { name: "Render", level: "Advanced" }
      ]
    }
  ] as SkillCategory[],

  certifications: [
    {
      id: "cert-1",
      title: "Introduction to Generative AI",
      issuer: "Google Skills Boost"
    },
    {
      id: "cert-2",
      title: "HTML, CSS & Java, Python Essentials 1 & 2",
      issuer: "Cisco Networking Academy"
    },
    {
      id: "cert-3",
      title: "Power BI for Beginners",
      issuer: "Simplilearn"
    },
    {
      id: "cert-4",
      title: "Data Science Mastery",
      issuer: "Udemy"
    }
  ] as Certification[],

  achievements: [
    {
      id: "ach-1",
      title: "Reliance Foundation Undergraduate Scholarship",
      organization: "Reliance Foundation",
      badge: "Scholarship Award",
      description: "Awarded prestigious undergraduate scholarship for exceptional academic excellence and research potential."
    },
    {
      id: "ach-2",
      title: "Top 5 Position - Cursors Hackathon",
      organization: "ANITS",
      badge: "Hackathon Winner",
      description: "Secured a Top 5 finish among competing technical teams for rapid software engineering and prototype design."
    },
    {
      id: "ach-3",
      title: "Innovation Hackathons (IdeaThon & SusHacks)",
      organization: "Andhra University / Regional Events",
      badge: "Participant & Finalist",
      description: "Participated in university-level innovation events focusing on sustainable software solutions and AI ideas."
    },
    {
      id: "ach-4",
      title: "All India ServiceNow AI Skills Summit",
      organization: "ServiceNow India",
      badge: "Summit Delegate",
      description: "Gained hands-on exposure to enterprise AI implementations, workflow automation, and industry innovations."
    },
    {
      id: "ach-5",
      title: "Discipline Committee Member",
      organization: "Vignan's Institute of Information Technology",
      badge: "Leadership Role",
      description: "Contributed to campus organization, event management, and cultural coordination."
    }
  ] as Achievement[]
};
