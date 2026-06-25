"use client";

import React, { ErrorInfo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import SocialLinks from "@/components/SocialLinks";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

class GithubErrorBoundary extends React.Component<{ children: React.ReactNode, fallback: React.ReactNode, resetKey: any }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode, fallback: React.ReactNode, resetKey: any }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.resetKey !== prevProps.resetKey) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const siteConfig = {
  name: "Ishan Maiti",
  bio: "Passionate about crafting seamless digital experiences through clean code and innovative solutions. Building systems and exploring new technologies.",
  taglines: [
    "Welcome to my Universe!",
    "I am a Developer.",
    "I Love Coding.",
    "Exploring Technologies!",
    "A Programmer...",
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
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } 
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
  const [githubYear, setGithubYear] = useState<number | "last">("last");
  
  const currentYear = new Date().getFullYear();
  const years: (number | "last")[] = ["last"];
  for (let y = currentYear; y >= 2023; y--) {
    years.push(y);
  }

  useEffect(() => {
    setIsMounted(true);
    
    // Welcome Toast Notification
    const hasVisited = sessionStorage.getItem("welcomeToastShown");
    if (!hasVisited) {
      setTimeout(() => {
        toast.info("Welcome to my digital universe!", {
          description: "Feel free to explore my portfolio and projects.",
          duration: 5000,
        });
        sessionStorage.setItem("welcomeToastShown", "true");
      }, 1000);
    }
  }, []);

  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center pt-10 lg:py-30 relative">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl flex flex-col items-center justify-center text-center px-4 sm:py-3 relative z-10"
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
              <Icon icon="lucide:arrow-up-right" className="ml-2 h-4 w-4" />
            </Link>
            <a
              href={siteConfig.resumeUrl}
              download
              onClick={() => toast.info("Preparing your download...", { description: "The resume PDF should start downloading shortly." })}
              className="flex items-center justify-center h-12 px-8 rounded-full border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors shadow-sm"
            >
              <Icon icon="lucide:download" className="mr-2 h-4 w-4" />
              Download CV
            </a>
          </motion.div>
                        
          <motion.div variants={fadeUp} className="flex flex-col items-center gap-4">
            <span className="text-sm font-medium tracking-widest uppercase opacity-50">Connect</span>
            <div className="p-4 rounded-full border border-border/50 bg-card shadow-sm backdrop-blur-md">
              <SocialLinks size="lg" className="gap-6" />
            </div>
          </motion.div>
          
          <motion.div variants={fadeUp} className="pt-16 pb-8 flex flex-col items-center w-full max-w-4xl opacity-80 hover:opacity-100 transition-opacity">
            <div className="flex flex-col sm:flex-row items-center justify-between w-full mb-6">
              <h3 className="text-xl font-semibold mb-4 sm:mb-0">Open Source Contributions</h3>
              <select
                value={githubYear}
                onChange={(e) => setGithubYear(e.target.value === "last" ? "last" : parseInt(e.target.value))}
                className="bg-card border border-border/50 text-sm font-medium rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
              >
                {years.map(y => (
                  <option key={y} value={y}>{y === "last" ? "Last Year" : y}</option>
                ))}
              </select>
            </div>
            
            <div className="glass p-6 w-[90vw] md:w-full overflow-x-auto min-h-[160px] flex items-center justify-start md:justify-center">
              <div className="min-w-max">
                {isMounted ? (
                  <GithubErrorBoundary 
                    resetKey={githubYear}
                    fallback={
                      <div className="text-muted-foreground flex items-center justify-center h-full min-h-[120px]">
                        No contributions found for {githubYear === "last" ? "the last year" : githubYear}.
                      </div>
                    }
                  >
                    <TooltipProvider delayDuration={50}>
                      <GitHubCalendar 
                        username="Ishan0121" 
                        colorScheme="dark"
                        year={githubYear}
                        theme={{
                          light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                          dark: ["#1f1f1f", "#444444", "#666666", "#aaaaaa", "#ffffff"]
                        }}
                        errorMessage="GitHub contributions are currently unavailable."
                        renderBlock={(block, activity) => (
                          <Tooltip key={activity.date}>
                            <TooltipTrigger asChild>
                              {block}
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-xs bg-card border border-border/50 px-2 py-1 rounded">
                              {activity.count} contributions on {activity.date}
                            </TooltipContent>
                          </Tooltip>
                        )}
                      />
                    </TooltipProvider>
                  </GithubErrorBoundary>
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
