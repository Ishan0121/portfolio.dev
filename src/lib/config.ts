export const siteConfig = {
  title: "Portfolio | Creative Developer",
  description: "Personal portfolio showcasing my work and experience",
  web3formsAccessKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "", // Set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local
  navLinks: [
    { title: "Home", href: "/", icon: "lucide:home", keywords: "Home" },
    { title: "About", href: "/about", icon: "lucide:user", keywords: "About me resume contact" },
    { title: "Projects", href: "/projects", icon: "lucide:folder-dot", keywords: "Projects portfolio work" },
    { title: "Skills", href: "/skills", icon: "lucide:code-2", keywords: "Skills technologies" },
    { title: "3D Lab", href: "/3d", icon: "lucide:box", keywords: "3D Lab experimental" },
    { title: "Contact", href: "/contact", icon: "lucide:mail", keywords: "Contact email message" },
  ],
  github: {
    excludeRepos: ["Ishan0121", "portfolio", "Portfolio-dna", "Portfolio3.0"],
  },
};

export const portfolioInfo = {
  name: "Ishan Maiti",
  bio: "CS student from West Bengal building AI, Linux, web, and hardware projects with a focus on local-first and self-hosted systems.",
  messages: [
    "I build things I can't leave alone.",
    "Curious about what's happening underneath.",
    "Linux, AI, hardware, and everything between.",
    "I tinker until it feels right.",
    "Building beyond the tutorial.",
    "I like knowing how things actually work.",
    "From ESP32s to AI assistants.",
    "I build, break, learn, rebuild.",
    "I turn curiosity into little experiments.",
    "Not just using tools\u2014taking them apart.",
    "I make software talk to hardware.",
    "If it works, I might still change it.",
  ],
  resumePath: "./docs/ISHAN MAITI_CV.pdf",
  resumeName: "My Resume.pdf",
  githubUsername: "Ishan0121",
  person: {
    role: "Computer Science Student & Developer",
    location: "West Bengal, India",
    languages: ["English", "Hindi", "Bengali"],
    avatar: "https://github.com/Ishan0121.png",
    intro: "I\u2019m a computer science student from West Bengal, India. I like building things that sit somewhere between software, hardware, and experimentation\u2014and I\u2019m usually more interested in how something works than in just making it work.\n\nFor me, a project isn\u2019t finished when it runs. If it doesn\u2019t feel right, I\u2019ll keep tinkering with it. Still learning, still experimenting, and usually have another idea waiting.",
  },
  timeline: [
    {
      id: "education-foundation",
      title: "Computer Science — Where It Started",
      period: "Undergraduate / ongoing",
      type: "Education",
      summary: "Started a 4-year B.Sc. Computer Science programme at Vidyasagar University, West Bengal, under the NEP/CCFUP curriculum.",
      description: "The degree provided the formal foundation: programming, algorithms, computer architecture, operating systems, databases, networking, software engineering, compiler design, artificial intelligence, mathematics and related areas.",
      icon: "lucide:graduation-cap",
      tags: [
        { name: "C", icon: "logos:c" },
        { name: "Java", icon: "logos:java" }
      ]
    },
    {
      id: "linux-journey",
      title: "Linux — Learning the Machine",
      period: "3+ years",
      type: "Technical Journey",
      summary: "Linux became more than an operating system I used for programming. It became a system I wanted to understand, customize and control.",
      description: "Over 3+ years, I experimented with different Linux distributions and environments, learning through installation, customization, troubleshooting and breaking/fixing systems.",
      icon: "lucide:terminal",
      tags: [
        { name: "Linux", icon: "logos:linux-tux" },
        { name: "Arch Linux", icon: "logos:archlinux" },
        { name: "Bash", icon: "logos:bash-icon" }
      ]
    },
    {
      id: "programming-evolution",
      title: "Programming — From Coursework to Building",
      period: "Ongoing",
      type: "Development",
      summary: "Expanded from foundational programming into multiple languages and practical software development.",
      description: "Programming gradually shifted from solving academic exercises toward building complete applications, tools, automation and experimental systems.",
      icon: "lucide:code-2",
      tags: [
        { name: "Python", icon: "logos:python" },
        { name: "C++", icon: "logos:c-plusplus" },
        { name: "TypeScript", icon: "logos:typescript-icon" }
      ]
    },
    {
      id: "web-development",
      title: "Web Development — Building Interfaces",
      period: "Ongoing",
      type: "Development",
      summary: "Moved into modern web development and started building complete frontend/backend applications.",
      description: "I became interested not just in programming individual pieces but in connecting interfaces, application logic, APIs and databases into complete systems.",
      icon: "lucide:layout-template",
      tags: [
        { name: "React", icon: "logos:react" },
        { name: "Next.js", icon: "logos:nextjs-icon" },
        { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
        { name: "Node.js", icon: "logos:nodejs-icon" }
      ]
    },
    {
      id: "ai-exploration",
      title: "AI — From Coursework to Local Intelligence",
      period: "Ongoing",
      type: "AI / Research / Experimentation",
      summary: "Academic exposure to AI, machine learning and NLP developed into hands-on experimentation with local AI systems.",
      description: "Instead of treating AI only as a cloud API, I became interested in running models locally and understanding the infrastructure around them.",
      icon: "lucide:brain-circuit",
      tags: [
        { name: "Python", icon: "logos:python" },
        { name: "NumPy", icon: "logos:numpy" },
        { name: "Pandas", icon: "logos:pandas-icon" }
      ]
    },
    {
      id: "voice-ai",
      title: "Voice AI — Building Aisha",
      period: "Ongoing project",
      type: "Personal Project",
      summary: "A local-first voice assistant concept designed around privacy, modularity and low-latency local processing.",
      description: "Aisha grew from experimenting with speech recognition, local language models and text-to-speech into a broader assistant architecture.",
      icon: "lucide:mic",
      tags: [
        { name: "Python", icon: "logos:python" },
        { name: "Ollama", icon: "lucide:brain-circuit" },
        { name: "Docker", icon: "logos:docker-icon" }
      ]
    },
    {
      id: "containers-self-hosting",
      title: "Self-Hosting — Running My Own Systems",
      period: "Ongoing",
      type: "Systems / Infrastructure",
      summary: "The next step was learning to run and connect my own services rather than only writing applications.",
      description: "Worked on a self-hosted Immich deployment involving containerized services, persistent storage, user/library configuration and remote access.",
      icon: "lucide:server",
      tags: [
        { name: "Docker", icon: "logos:docker-icon" },
        { name: "Podman", icon: "logos:podman" }
      ]
    },
    {
      id: "networking-security",
      title: "Networking & Security — Understanding the Connections",
      period: "Ongoing",
      type: "Systems / Security",
      summary: "Working with self-hosted systems naturally pushed me deeper into networking, remote access and cybersecurity.",
      description: "Explored threat/vulnerability analysis, cryptography, network security, web security, authentication, secure communication and digital forensics concepts.",
      icon: "lucide:shield-check",
      tags: [
        { name: "Networking", icon: "lucide:network" },
        { name: "Security", icon: "lucide:lock" }
      ]
    },
    {
      id: "embedded-electronics",
      title: "Electronics — Making Software Physical",
      period: "Ongoing",
      type: "Hardware / Embedded",
      summary: "Started combining software with physical electronics through ESP32-S3 experiments.",
      description: "Electronics became another layer of the same curiosity: instead of stopping at software, I wanted to understand how software interacts with physical devices.",
      icon: "lucide:cpu",
      tags: [
        { name: "ESP32", icon: "lucide:cpu" },
        { name: "C++", icon: "logos:c-plusplus" }
      ]
    },
    {
      id: "ai-hardware-convergence",
      title: "AI + Hardware — Connecting the Layers",
      period: "Ongoing",
      type: "Personal Research / Experimentation",
      summary: "The separate interests in Linux, AI and electronics started converging.",
      description: "This is the direction represented most strongly by Aisha. It demonstrates the type of systems I enjoy building: not just an interface, not just a model, and not just a circuit, but the connection between all of them.",
      icon: "lucide:network",
      tags: [
        { name: "Linux", icon: "logos:linux-tux" },
        { name: "AI", icon: "lucide:bot" },
        { name: "Hardware", icon: "lucide:microchip" }
      ]
    },
    {
      id: "current-state",
      title: "Today — Building Beyond the Syllabus",
      period: "Present / ongoing",
      type: "Current Identity",
      summary: "I am still a Computer Science student, but my learning now extends well beyond coursework.",
      description: "Still learning. Still building. Still figuring out what happens under the hood.",
      icon: "lucide:rocket",
      tags: [
        { name: "Full Stack", icon: "lucide:layers" },
        { name: "Systems", icon: "lucide:server" }
      ]
    }
  ],
  socials: {
    github: "https://github.com/Ishan0121",
    linkedin: "https://www.linkedin.com/in/ishan-maiti-785212297",
    twitter: "https://x.com/maiti_ishan",
    email: "ishanmaiti1234@gmail.com",
    calcom: "https://cal.com/ishan-maiti",
  },
  socialLinks: [
    {
      id: "github",
      label: "GitHub",
      url: "https://github.com/Ishan0121",
      icon: "mdi:github",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/ishan-maiti-785212297",
      icon: "mdi:linkedin",
    },
    {
      id: "email",
      label: "Email",
      url: "mailto:ishanmaiti1234@gmail.com",
      icon: "mdi:email",
    },
    {
      id: "twitter",
      label: "Twitter",
      url: "https://x.com/maiti_ishan",
      icon: "mdi:twitter",
    },
  ],
};
