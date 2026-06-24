"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Globe, MapPin, Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import SocialLinks from "@/components/SocialLinks";

const person = {
  name: "Ishan Maiti",
  role: "Computer Science Student & Developer",
  location: "Kolkata, India",
  languages: ["English", "Hindi", "Bengali"],
  avatar: "https://github.com/Ishan0121.png",
  intro: "I am a developer driven by the desire to understand how systems work from the ground up. Over the years, I've evolved from creating simple web interfaces to developing complex systems that bridge the gap between software, hardware, and creative technologies. My focus is always on performance, clean architecture, and delivering a premium user experience.",
};

const work = [
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
];

const studies = [
  {
    name: "Computer Science & Engineering",
    description: "Bachelor of Technology - Focusing on System Architecture, Data Structures, and Modern Web Technologies.",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 pb-32 pt-24">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-row gap-12 lg:gap-24 relative"
      >
        {/* Left Column: Avatar & Details (Sticky) */}
        <motion.div 
          variants={fadeUp} 
          className="w-full md:w-1/3 lg:w-1/4 flex flex-col items-center md:items-start"
        >
          <div className="sticky top-32 flex flex-col items-center md:items-start gap-6 w-full">
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-border/50 shadow-xl bg-card">
              <img 
                src={person.avatar} 
                alt={person.name} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
              />
            </div>
            
            <div className="flex flex-col items-center md:items-start gap-3 w-full">
              <div className="flex items-center gap-2 text-muted-foreground font-medium">
                <MapPin size={18} />
                <span>{person.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-medium">
                <Globe size={18} />
                <span>Languages</span>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-1">
                {person.languages.map((lang, i) => (
                  <span key={i} className="px-3 py-1 bg-accent text-accent-foreground text-xs font-mono rounded-full border border-border/50">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Main Content */}
        <motion.div variants={fadeUp} className="w-full md:w-2/3 lg:w-3/4 flex flex-col gap-16">
          
          {/* Header & Intro */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium backdrop-blur-md cursor-pointer hover:bg-primary/20 transition-colors">
              <Calendar size={16} />
              <span>Schedule a call</span>
              <ArrowUpRight size={16} />
            </div>
            
            <div>
              <h1 className="text-5xl md:text-7xl font-bold font-heading text-foreground tracking-tight mb-4">
                {person.name}
              </h1>
              <h2 className="text-xl md:text-2xl text-muted-foreground font-medium">
                {person.role}
              </h2>
            </div>
            
            {/* Socials */}
            <div className="flex gap-4">
              <SocialLinks size="lg" className="gap-4" />
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {person.intro}
            </p>
          </div>

          <hr className="border-border/50" />

          {/* Work Experience */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold font-heading text-foreground flex items-center gap-3">
              <Briefcase className="text-primary" /> Experience
            </h3>
            <div className="space-y-12">
              {work.map((item, i) => (
                <div key={i} className="flex flex-col gap-4 group glass glass-hover p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h4 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{item.company}</h4>
                    <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest">{item.timeframe}</span>
                  </div>
                  <h5 className="text-lg font-medium text-primary/80">{item.role}</h5>
                  <ul className="space-y-3 list-none">
                    {item.achievements.map((ach, j) => (
                      <li key={j} className="text-muted-foreground flex gap-3">
                        <span className="text-primary/50 mt-1">✦</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-border/50" />

          {/* Studies */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold font-heading text-foreground flex items-center gap-3">
              <GraduationCap className="text-primary" /> Studies
            </h3>
            <div className="space-y-8">
              {studies.map((item, i) => (
                <div key={i} className="flex flex-col gap-2 glass glass-hover p-8">
                  <h4 className="text-2xl font-bold text-foreground">{item.name}</h4>
                  <p className="text-lg text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
}
