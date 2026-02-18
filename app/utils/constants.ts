import {
  RiFileTextLine,
  RiGithubLine,
  RiGitRepositoryLine,
  RiLinkedinLine,
  RiMailLine,
  RiTwitterXLine,
} from "react-icons/ri";

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveLink: string;
  githubLink: string;
}

export interface OpenSource {
  title: string;
  description: string;
  technologies: string[];
  npmLink?: string;
  websiteLink?: string;
  githubLink: string;
  stats?: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  tags: string[];
  publishedDate: string;
  readTime: string;
  author: string;
  link: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  description: string;
  websiteLink: string;
  endDate: string | null;
  startDate: string;
  currentlyWorking: boolean;
  technologies: string[];
}
export interface Certificate {  
  id: number;
  title: string;
  url: string;
  description: string;
}

export interface Education {
  schoolName: string;
  degree: string;
  duration: string;
}

export interface SocialLink {
  name: string;
  icon: React.ElementType;
  href: string;
}

export interface Skill {
  category: string;
  skills: string[];
}

export const projects: Project[] = [
  {
    title: "CodePencil",
    description:
      "Developed an online code editor where users can create profile, set avatar, practice their frontend skills, and save them. Currently 15+ active users.",
    technologies: [
      "React",
      "Tailwind CSS",
      "Redux Toolkit",
      "Js",
      "Firebase",
      "Node Js",
      "Daisy UI",
      "Framer Motion",
    ],
    liveLink: "https://codepencil-swart.vercel.app/",
    githubLink: "https://github.com/armaan-yadav/codepencil",
  },
  {
    title: "Zomaggy",
    description:
      "A food delivery website with real-time fetching of user's location and restaurants based on that location. Integrated Firebase for authentication. Implemented veg-nonVeg filters in restaurants menu. Using Redux Toolkit, implemented the cart feature where users can add, update, delete, and read the items selected.",
    technologies: ["React", "Tailwind CSS", "Redux Toolkit", "Js", "Firebase"],
    liveLink: "https://zomaggy.netlify.app/",
    githubLink: "https://github.com/armaan-yadav/Zomaggy",
  },
  {
    title: "Snapgram",
    description:
      "Developed a social media web app where users can drag and drop photos and upload them with Appwrite as a backend service.",
    technologies: [
      "React",
      "Tailwind CSS",
      "Redux Toolkit",
      "Appwrite",
      "React Query",
      "Ts",
      "ShadCn",
    ],
    liveLink: "https://snapgram-by-armaan.vercel.app/",
    githubLink: "https://github.com/armaan-yadav/Snapgram",
  },
  {
    title: "YOUTUBE UI CLONE",
    description:
      "Provided live Youtube Data API. Implemented search functionality and infinite scroll feature in comments and videos.",
    technologies: ["React Js", "Context API", "Tailwind CSS"],
    liveLink: "https://yt-clone-react-weld.vercel.app/",
    githubLink: "https://github.com/armaan-yadav/yt-clone-react",
  },
];

export const openSourceContributions: OpenSource[] = [
  {
    title: "create-react-jaldi",
    description:
      "Developed and published an NPM package to streamline React TypeScript/JavaScript project setup, now with 1,100+ all-time downloads. Provides a fully configured stack with ESLint, Prettier, Shadcn, Vite, Redux Toolkit, React Router DOM, and Tailwind CSS.",
    technologies: ["React", "TypeScript", "NPM", "Vite", "Redux Toolkit", "Tailwind CSS"],
    npmLink: "https://www.npmjs.com/package/create-react-jaldi",
    githubLink: "https://github.com/armaan-yadav/create-react-jaldi",
    stats: "1,100+ downloads",
    date: "March 2025",
  },
];

export const edducation: Education[] = [
  {
    schoolName: "Indian Institute of Technology, Kanpur",
    degree: "Advanced Executive Certificate in Cybersecurity",
    duration: "December 2025 -  Present",
  },
  {
    schoolName: "Sigma Univeristy, Gujarat",
    degree: "Master of Computer Applications",
    duration: "October 2024 - May 2026",
  },
  {
    schoolName: "Kurukshetra Univeristy, Haryana",
    degree: "Bachelor of Computer Applications",
    duration: "August 2021 - July 2024",
  },
];
export const workExperiences: WorkExperience[] = [
  {
    company: "Freelance Software Developer",
    role: "Software Developer",
    description: `• Built custom video editor with AI avatars and automated workflows using Next.js, Remotion, and Docker
• Developed AI-driven tools for news media: headline generation, script writing, and voiceover synthesis
• Engineered centralized content publishing system for cross-platform automation (Instagram, Facebook, X, YouTube)
• Created full-stack NGO website with custom admin panel using React.js, Firebase, and Cloudinary
• Implemented local workflow for generating talking AI avatars with text-to-video and text-to-speech pipelines`,
    websiteLink: "",
    startDate: "September 2024",
    endDate: "Present",
    currentlyWorking: true,
    technologies: [
      "Next.js",
      "React.js",
      "Node.js",
      "Remotion",
      "Docker",
      "n8n",
      "Firebase",
      "Python",
      "Facebook Graph API",
      "YouTube API",
      "Cloudinary",
    ],
  },
  {
    company: "Quantbug Technologies And Research LLP",
    role: "Software Developer",
    description: `• Developed multiple full-stack applications: news portals, chat apps, and college ERP systems
• Led end-to-end development of SEO-optimized news portal (Yug Abhiyaan Times) using Next.js with SSR
• Built custom React.js admin panel with role-based access control and e-paper management
• Developed secure backend with Node.js, Express.js, and MongoDB implementing REST APIs and JWT authentication
• Designed and deployed mobile app and website from scratch using Flutter and React.js
• Managed Dockerized deployments on Ubuntu VPS via Coolify with CI/CD pipelines
• Implemented analytics tracking using Google Analytics and Search Console for performance insights`,
    websiteLink: "https://yugabhiyaantimes.com/",
    startDate: "July 2024",
    endDate: "August 2025",
    currentlyWorking: false,
    technologies: [
      "Next.js",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Flutter",
      "Docker",
      "Coolify",
      "Appwrite",
      "Google Analytics",
    ],
  },
];

export const certificates: Certificate[] = [
  {
    id: 3,
    title: "NAMASTE REACT",
    url: "https://drive.google.com/file/d/1d3v-UuH7hSszudURJGKKOyGyYdqVA16I/view?usp=drive_link",
    description:
      "",
  },
  {
    id: 2,
    title: "Programming Using C++ by Infosys SpringBoard",
    url: "https://drive.google.com/file/d/1lqBhUp8PXWxpvRPhH7Ri4FBm-SPq1VsH/view?usp=drive_link",
    description: "",
  },
];
export const skills: Skill[] = [
  {
    category: "Languages",
    skills: [
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "HTML5",
      "CSS3",
      "Dart",
    ],
  },
  {
    category: "Frameworks/Libraries",
    skills: [
      "React.js",
      "Redux",
      "RTK Query",
      "Node.js",
      "Express.js",
      "Tailwind",
      "Flutter",
      "Shadcn",
      "Material UI",
    ],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL","MongoDB", "Firestore", "MySQL", "Appwrite", ],
  },
  {
    category: "Developer Tools",
    skills: ["Docker","Git", "GitHub","Linux", "VS Code", "Android Studio", "Postman"],
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: "Email",
    icon: RiMailLine,
    href: "mailto:yadavarmaan10@gmail.com",
  },
  {
    name: "Twitter",
    icon: RiTwitterXLine,
    href: "https://x.com/armaan_y10",
  },
  {
    name: "LinkedIn",
    icon: RiLinkedinLine,
    href: "https://www.linkedin.com/in/armaan-yadav-a58805213/",
  },
  {
    name: "GitHub",
    icon: RiGithubLine,
    href: "https://github.com/armaan-yadav",
  },
  { name: "Resume", icon: RiFileTextLine, href: "/resume/resume.pdf" },
  {
    name: "Repository",
    icon: RiGitRepositoryLine,
    href: "https://github.com/armaan-yadav/portfolio02",
  },
];
