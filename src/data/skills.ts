export type SkillCategory = {
  name: string;
  skills: {
    name: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    description: string;
    icon?: string;
  }[];
};

export const skillsData: SkillCategory[] = [
  {
    name: "Frontend Development",
    skills: [
      {
        name: "HTML5",
        level: "Advanced",
        description: "Structuring and presenting web content",
        icon: "logos:html-5",
      },
      {
        name: "CSS",
        level: "Advanced",
        description: "Styling web applications for responsive designs",
        icon: "logos:css-3",
      },
      {
        name: "JavaScript",
        level: "Advanced",
        description: "Building dynamic and interactive web applications",
        icon: "logos:javascript",
      },
      {
        name: "Tailwind CSS",
        level: "Advanced",
        description: "Utility-first CSS framework for rapid UI development",
        icon: "logos:tailwindcss-icon",
      },
      {
        name: "React",
        level: "Advanced",
        description:
          "Building modern web applications with React and its ecosystem",
        icon: "logos:react",
      },
      {
        name: "Next.js",
        level: "Intermediate",
        description: "Creating performant and SEO-friendly web applications",
        icon: "logos:nextjs-icon",
      },
      {
        name: "TypeScript",
        level: "Intermediate",
        description: "Writing type-safe code for scalable applications",
        icon: "logos:typescript-icon",
      },
      {
        name: "Ant Design",
        level: "Intermediate",
        description: "Design system for building enterprise-level UIs",
        icon: "logos:ant-design",
      },
      {
        name: "Vite",
        level: "Intermediate",
        description: "Frontend build tool for fast and modern web development",
        icon: "logos:vitejs",
      },
    ],
  },
  {
    name: "Backend Development",
    skills: [
      {
        name: "PHP",
        level: "Intermediate",
        description: "Server-side scripting for web applications",
        icon: "logos:php",
      },
      {
        name: "Node.js",
        level: "Beginner",
        description: "Building scalable server-side applications",
        icon: "logos:nodejs-icon",
      },
      {
        name: "PostgreSQL",
        level: "Intermediate",
        description: "Designing and managing relational databases",
        icon: "logos:postgresql",
      },
      {
        name: "MySQL",
        level: "Intermediate",
        description: "Managing relational database systems",
        icon: "logos:mysql",
      },
      {
        name: "MongoDB",
        level: "Intermediate",
        description:
          "Working with NoSQL databases for flexible data structures",
        icon: "logos:mongodb-icon",
      },
    ],
  },
  {
    name: "Operating Systems & Distributions",
    skills: [
      {
        name: "Ubuntu",
        level: "Intermediate",
        description: "Popular Linux distribution for beginners and developers",
        icon: "logos:ubuntu",
      },
      {
        name: "Linux Mint",
        level: "Intermediate",
        description: "Beginner-friendly Linux distribution for daily use",
        icon: "logos:linux-mint",
      },
      {
        name: "Fedora",
        level: "Intermediate",
        description: "Cutting-edge Linux distribution sponsored by Red Hat",
        icon: "logos:fedora",
      },
      {
        name: "Kali Linux",
        level: "Intermediate",
        description:
          "Penetration testing and ethical hacking Linux distribution",
        icon: "simple-icons:kalilinux",
      },
      {
        name: "Pop!_OS",
        level: "Intermediate",
        description:
          "Linux distribution focused on productivity and development",
        icon: "simple-icons:popos",
      },
      {
        name: "Garuda",
        level: "Intermediate",
        description: "User-friendly Arch-based Linux with gaming focus",
        icon: "simple-icons:garudalinux",
      },
      {
        name: "Archcraft",
        level: "Intermediate",
        description: "Minimal and aesthetically focused Arch-based Linux",
        icon: "/images/archcraft.svg",
      },
      {
        name: "Arch",
        level: "Intermediate",
        description: "Minimalistic and user-controlled Linux distribution",
        icon: "logos:archlinux",
      },
      {
        name: "BlackArch",
        level: "Intermediate",
        description:
          "Security-focused Linux distribution for penetration testing",
        icon: "/images/blackarch.png",
      },
    ],
  },
  {
    name: "Programming Languages",
    skills: [
      {
        name: "C",
        level: "Advanced",
        description: "Developing system-level applications",
        icon: "logos:c",
      },
      {
        name: "C++",
        level: "Intermediate",
        description: "Object-oriented programming with advanced capabilities",
        icon: "logos:c-plusplus",
      },
      {
        name: "Java",
        level: "Intermediate",
        description: "Object-oriented programming for scalable solutions",
        icon: "logos:java",
      },
      {
        name: "Python",
        level: "Intermediate",
        description: "Developing scalable applications and scripts",
        icon: "logos:python",
      },
      {
        name: "C#",
        level: "Beginner",
        description: "Building desktop and game applications",
        icon: "logos:c-sharp",
      },
      {
        name: "Markdown",
        level: "Advanced",
        description: "Creating structured documentation with ease",
        icon: "logos:markdown",
      },
      {
        name: "R",
        level: "Beginner",
        description: "Statistical computing and graphics programming",
        icon: "logos:r-lang",
      },
    ],
  },
  {
    name: "Productivity Tools",
    skills: [
      {
        name: "Microsoft Word",
        level: "Intermediate",
        description: "Creating and formatting professional documents",
        icon: "vscode-icons:file-type-word",
      },
      {
        name: "Microsoft Excel",
        level: "Intermediate",
        description: "Data analysis, visualization, and management",
        icon: "vscode-icons:file-type-excel",
      },
      {
        name: "Microsoft PowerPoint",
        level: "Intermediate",
        description: "Creating visually appealing presentations",
        icon: "vscode-icons:file-type-powerpoint",
      },
      {
        name: "MS Office Suite",
        level: "Intermediate",
        description: "Proficiency in Microsoft Office applications",
        icon: "logos:microsoft-icon",
      },
      {
        name: "Obsidian",
        level: "Intermediate",
        description: "Knowledge management and note-taking using markdown",
        icon: "simple-icons:obsidian",
      },
    ],
  },
  {
    name: "Tools & Others",
    skills: [
      {
        name: "Git",
        level: "Advanced",
        description: "Version control and collaboration",
        icon: "logos:git-icon",
      },
      {
        name: "GitHub",
        level: "Advanced",
        description: "Managing repositories and collaboration",
        icon: "logos:github-icon",
      },
      {
        name: "Docker",
        level: "Intermediate",
        description: "Containerization and deployment",
        icon: "logos:docker-icon",
      },
      {
        name: "Cloudflare",
        level: "Intermediate",
        description: "Optimizing and securing web traffic",
        icon: "logos:cloudflare-icon",
      },
      {
        name: "NPM",
        level: "Intermediate",
        description: "JavaScript package management",
        icon: "logos:npm-icon",
      },
      {
        name: "Bun",
        level: "Intermediate",
        description: "An all-in-one JavaScript runtime",
        icon: "logos:bun",
      },
    ],
  },
  {
    name: "Design & Multimedia",
    skills: [
      {
        name: "Draw.io",
        level: "Intermediate",
        description: "Creating diagrams and flowcharts easily",
        icon: "mdi:draw",
      },
      {
        name: "Blender",
        level: "Beginner",
        description: "3D modeling and animation software",
        icon: "logos:blender",
      },
    ],
  },
];
