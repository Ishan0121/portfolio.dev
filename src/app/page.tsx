"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import SocialLinks from "@/components/SocialLinks";

const siteConfig = {
  name: "Ishan Maiti",
  bio: "Passionate about crafting seamless digital experiences through clean code and innovative solutions. Building systems and exploring new technologies.",
  taglines: [
    "Welcome to my Universe",
    "I am a Developer",
    "I Love Coding",
    "Exploring Technologies",
    "A Programmer",
  ],
  resumeUrl: "#",
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)", 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  },
};

function AnimatedText({ texts, speed = 65, pause = 2000 }: { texts: string[], speed?: number, pause?: number }) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleType = () => {
      const currentText = texts[textIndex];
      
      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), pause);
        return;
      }
      
      if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
        return;
      }

      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    };

    const typingSpeed = isDeleting ? speed / 2 : speed;
    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, texts, speed, pause]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <span className="inline-block border-r-2 border-primary pr-1 animate-pulse">
      {texts[textIndex]?.substring(0, charIndex) || ""}
    </span>
  );
}

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center py-10 relative">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl flex flex-col items-center justify-center text-center px-4 relative z-10"
      >
        <div className="space-y-10 flex flex-col items-center justify-center">
          <motion.div
            variants={fadeUp}
            className="space-y-6 flex flex-col items-center justify-center"
          >
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] text-foreground max-w-4xl drop-shadow-2xl font-heading">
              <span className="block text-primary/80 text-2xl sm:text-3xl font-medium tracking-normal mb-4">Hello, I am</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/50">
                {siteConfig.name}
              </span>
            </h1>
            <div className="text-xl sm:text-2xl text-muted-foreground min-h-[3.5rem] sm:min-h-[2.5rem] tracking-tight font-mono max-w-2xl text-balance flex items-center justify-center">
              <AnimatedText texts={siteConfig.taglines} />
            </div>
          </motion.div>
              
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl font-normal leading-relaxed text-balance"
          >
            {siteConfig.bio}
          </motion.p>
              
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-6 pt-6 w-full justify-center">
            <Link 
              href="/projects"
              className="flex items-center justify-center h-12 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg"
            >
              View My Work
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
            <a
              href={siteConfig.resumeUrl}
              download
              className="flex items-center justify-center h-12 px-8 rounded-full border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors shadow-sm"
            >
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </a>
          </motion.div>
                        
          <motion.div variants={fadeUp} className="pt-10 flex flex-col items-center gap-4">
            <span className="text-sm font-medium tracking-widest uppercase opacity-50">Connect</span>
            <div className="p-4 rounded-full border border-border/50 bg-card shadow-sm backdrop-blur-md">
              <SocialLinks size="lg" className="gap-6" />
            </div>
          </motion.div>
          
          <motion.div variants={fadeUp} className="pt-16 pb-8 flex flex-col items-center w-full max-w-4xl opacity-80 hover:opacity-100 transition-opacity">
            <h3 className="text-xl font-semibold mb-6">Open Source Contributions</h3>
            <div className="glass p-6 w-[90vw] md:w-full overflow-x-auto min-h-[160px] flex items-center justify-start md:justify-center">
              <div className="min-w-max">
                {isMounted ? (
                  <GitHubCalendar 
                    username="Ishan0121" 
                    colorScheme="dark"
                    theme={{
                      dark: ["hsl(var(--muted))", "hsl(var(--primary) / 0.4)", "hsl(var(--primary) / 0.6)", "hsl(var(--primary) / 0.8)", "hsl(var(--primary))"]
                    }}
                    errorMessage="GitHub contributions are currently unavailable."
                  />
                ) : (
                  <div className="text-muted-foreground animate-pulse">Loading calendar...</div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
