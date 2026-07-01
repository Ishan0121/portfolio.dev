export const siteConfig = {
  name: "Ishan Maiti",
  description: "Personal portfolio showcasing my work and experience",
  title: "Portfolio | Creative Developer",
  bio: "Passionate about crafting seamless digital experiences through \nclean code and \ninnovative solutions.",
  messages: [
    "Welcome to my Portfolio!",
    "I am a Developer.",
    "I Love Coding.",
    "Exploring Technologies.",
    "A Programmer.",
  ],
  resumePath: "./docs/ISHAN MAITI_CV2.pdf",
  resumeName: "My Resume.pdf",
  githubUsername: "Ishan0121",
  web3formsAccessKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "", // Set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local
  navLinks: [
    { title: "Home", href: "/", icon: "lucide:home", keywords: "Home" },
    { title: "About", href: "/about", icon: "lucide:user", keywords: "About me resume contact" },
    { title: "Projects", href: "/projects", icon: "lucide:folder-dot", keywords: "Projects portfolio work" },
    { title: "Skills", href: "/skills", icon: "lucide:code-2", keywords: "Skills technologies" },
    { title: "3D Lab", href: "/3d", icon: "lucide:box", keywords: "3D Lab experimental" },
    { title: "Contact", href: "/contact", icon: "lucide:mail", keywords: "Contact email message" },
  ],
  person: {
    role: "Computer Science Student & Developer",
    location: "Kolkata, India",
    languages: ["English", "Hindi", "Bengali"],
    avatar: "https://github.com/Ishan0121.png",
    intro: "I am a developer driven by the desire to understand how systems work from the ground up. Over the years, I've evolved from creating simple web interfaces to developing complex systems that bridge the gap between software, hardware, and creative technologies. My focus is always on performance, clean architecture, and delivering a premium user experience.",
  },
  work: [
    {
      company: "Freelance Developer",
      timeframe: "2023 - Present",
      role: "Full Stack Engineer",
      achievements: [
        "Built multiple Next.js applications with complex state management and animations.",
        "Integrated hardware and IoT systems using C++ and WebSockets for real-time data.",
        "Optimized 3D web experiences using React Three Fiber.",
      ],
    },
  ],
  studies: [
    {
      name: "Computer Science & Engineering",
      description: "Bachelor of Technology - Focusing on System Architecture, Data Structures, and Modern Web Technologies.",
    },
  ],
  technical: [
    {
      title: "Web Development",
      description: "Building next gen apps with Next.js, Tailwind CSS, and Framer Motion.",
      tags: [
        { name: "JavaScript", icon: "logos:javascript" },
        { name: "Next.js", icon: "logos:nextjs-icon" },
        { name: "React", icon: "logos:react" },
        { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
      ]
    },
    {
      title: "Hardware & IoT",
      description: "Integrating hardware systems using C++ and WebSockets.",
      tags: [
        { name: "C++", icon: "logos:c-plusplus" },
        { name: "Arduino", icon: "logos:arduino" },
      ]
    }
  ],
  github: {
    excludeRepos: ["Ishan0121", "portfolio", "Portfolio-dna", "Portfolio3.0"],
  },
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
