"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { siteConfig } from "@/lib/config";
import { skillsData } from '@/data/skills-data';
import SocialLinks from '@/components/shared/SocialLinks';
import { GridBackground } from '@/components/layout/GridBackground';
import { useNotificationStore } from "@/store/useNotificationStore";
import { Button } from "@/components/ui/button";

import { FlipWords } from "@/components/effects/flip-words";
import { InfiniteMovingCards } from "@/components/effects/infinite-moving-cards";
import { Meteors } from "@/components/effects/meteors";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } 
  },
};


export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);
  const notify = useNotificationStore((state) => state.notify);

  useEffect(() => {
    setIsMounted(true);
    
    // Welcome Toast Notification
    const hasVisited = sessionStorage.getItem("welcomeToastShown");
    if (!hasVisited) {
      setTimeout(() => {
        useNotificationStore.getState().notify("welcome", { force: true, type: "info" });
        sessionStorage.setItem("welcomeToastShown", "true");
      }, 1000);
    }
  }, []);

  if (!isMounted) return null;

  return (
    <div className="relative min-h-screen lg:pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {/* Ambient glowing blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-primary/20 blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[10%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/10 blur-[150px]" 
        />
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl space-y-16"
      >
        {/* Hero Section */}
        <motion.section variants={fadeUp} className="flex flex-col items-center text-center pt-10 lg:pt-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/30 border border-border/50 rounded-full text-sm font-medium backdrop-blur-md mb-8 hover:bg-secondary/50 transition-colors cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>Available for new opportunities</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl lg:text-[6rem] font-bold tracking-tight text-foreground max-w-4xl drop-shadow-2xl leading-[1.1]">
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/50">
              Creative Developer
            </span>
          </h1>
          
          <div className="text-xl sm:text-2xl text-muted-foreground mt-8 min-h-[3.5rem] sm:min-h-[2.5rem] tracking-tight font-mono max-w-2xl text-balance flex items-center justify-center">
            <FlipWords words={siteConfig.messages} duration={3000} />
          </div>
        </motion.section>

        {/* Bento Grid */}
        <motion.section variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-[minmax(220px,auto)] md:auto-rows-[220px]">
          
          {/* About Card */}
          <Link href="/about" className="lg:col-span-2 row-span-1 glass rounded-[2rem] p-6 px-20 sm:py-8 sm:px-12 border border-border/50 hover:border-primary/50 transition-all group relative flex flex-col-reverse sm:flex-row items-center justify-center sm:justify-start shadow-sm hover:shadow-md">
            <div className="flex-1 flex flex-col gap-2 z-10 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/60 text-xs font-semibold w-fit border border-border/30 mb-2 mx-auto sm:mx-0">
                <Icon icon="lucide:map-pin" className="w-3.5 h-3.5 text-primary" /> {siteConfig.person.location}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{siteConfig.name}</h2>
              <p className="text-muted-foreground font-medium text-balance">{siteConfig.person.role}</p>
            </div>
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 shrink-0 z-10">
              <div className="absolute inset-0 rounded-full bg-linear-to-tr from-primary to-blue-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <Image src={siteConfig.person.avatar} width={400} height={400} className="relative w-full h-full object-cover rounded-full border-2 border-border/50 shadow-xl group-hover:scale-105 transition-transform duration-500" alt="Avatar"/>
            </div>
            <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center backdrop-blur-md group-hover:bg-primary group-hover:text-primary-foreground transition-colors z-10">
              <Icon icon="lucide:arrow-up-right" className="w-5 h-5" />
            </div>
          </Link>

          {/* 3D Lab Card */}
          <Link href="/3d" className="lg:col-span-1 row-span-1 glass rounded-[2rem] p-8 border border-border/50 hover:border-primary/50 transition-all group overflow-hidden relative flex flex-col justify-between shadow-sm hover:shadow-md ">
            <Meteors number={20} />
            <div className="relative w-16 h-16 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-500 shadow-lg z-10">
              <Icon icon="lucide:box" className="w-8 h-8 text-primary drop-shadow-md" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-1 bg-primary/20 blur-sm rounded-full group-hover:w-6 transition-all duration-500"></div>
            </div>
            
            <div className="relative z-10 mt-auto pt-6">
              <h3 className="text-2xl font-bold">3D Lab</h3>
              <p className="text-sm text-muted-foreground mt-1">Interactive WebGL</p>
            </div>
            <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-background/50 flex items-center justify-center backdrop-blur-md group-hover:bg-primary group-hover:text-primary-foreground transition-colors z-10">
              <Icon icon="lucide:arrow-up-right" className="w-5 h-5" />
            </div>
          </Link>

          {/* Projects Card */}
          <Link href="/projects" className="lg:col-span-1 row-span-2 glass rounded-[2rem] p-0 border border-border/50 hover:border-primary/50 transition-all group overflow-hidden relative flex flex-col shadow-sm hover:shadow-md">
            <div className="flex-1 w-full bg-secondary/20 relative overflow-hidden flex items-center justify-center border-b border-border/30 z-10">
               {/* Decorative grid pattern */}
               <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'linear-gradient(theme(colors.foreground) 1px, transparent 1px), linear-gradient(90deg, theme(colors.foreground) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
               
               {/* Mock project cards */}
               <div className="relative flex gap-3 rotate-[-10deg] scale-110 group-hover:rotate-0 group-hover:scale-100 transition-all duration-700">
                 <div className="w-24 h-32 rounded-xl bg-background border border-border/50 shadow-md flex items-center justify-center -translate-y-4">
                   <Icon icon="lucide:layout" className="w-8 h-8 text-muted-foreground/30" />
                 </div>
                 <div className="w-24 h-32 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 shadow-lg flex items-center justify-center z-10 relative">
                   <Icon icon="lucide:folder-dot" className="w-10 h-10 text-primary" />
                 </div>
                 <div className="w-24 h-32 rounded-xl bg-background border border-border/50 shadow-md flex items-center justify-center translate-y-4">
                   <Icon icon="lucide:terminal" className="w-8 h-8 text-muted-foreground/30" />
                 </div>
               </div>
            </div>
            <div className="p-8 flex flex-col gap-4 bg-background/50 backdrop-blur-sm z-10">
              <div>
                <h3 className="text-3xl font-bold">Projects</h3>
                <p className="text-sm text-muted-foreground mt-1">Explore my recent work</p>
              </div>
              <Button variant="outline" className="w-full rounded-full gap-2 h-12" size="lg">
                <Icon icon="lucide:arrow-up-right" className="w-5 h-5" /> View Portfolio
              </Button>
            </div>
          </Link>

          {/* Connect / Resume Card */}
          <div className="lg:col-span-1 row-span-1 glass rounded-[2rem] p-8 border border-border/50 transition-all overflow-hidden relative flex flex-col justify-center items-center shadow-sm  hover:border-primary/50 ">
            <SocialLinks size="lg" className="gap-1" />
            <div className="flex flex-col w-full gap-3 mt-auto">
              <Button asChild className="w-full rounded-full gap-2 h-12" size="lg">
                <Link href="/contact">
                  <Icon icon="lucide:mail" className="w-4 h-4" /> Email Me
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full rounded-full gap-2 h-12 border-border/50 bg-secondary/30 hover:bg-secondary/60" size="lg">
                <a 
                  href={siteConfig.resumePath} 
                  download={siteConfig.resumeName} 
                  onClick={() => notify("download_resume", { type: "info" })}
                >
                  <Icon icon="lucide:download" className="w-4 h-4" /> Download CV
                </a>
              </Button>
            </div>
          </div>

          {/* Skills Card */}
          <Link href="/skills" className="lg:col-span-2 row-span-1 glass rounded-[2rem] p-8 border border-border/50 hover:border-primary/50 transition-all group overflow-hidden relative flex flex-col justify-center shadow-sm hover:shadow-md">
            <h3 className="text-xl font-bold mb-2 text-foreground/80 relative z-10">Tech Stack</h3>
            <InfiniteMovingCards items={skillsData.flatMap(category => category.skills)} direction="left" speed="slow" />
            <InfiniteMovingCards items={skillsData.flatMap(category => category.skills)} direction="right" speed="slow" />
            <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center backdrop-blur-md group-hover:bg-primary group-hover:text-primary-foreground transition-colors z-10">
              <Icon icon="lucide:arrow-up-right" className="w-5 h-5"/>
            </div>
          </Link>


        </motion.section>
      </motion.div>
    </div>
  );
}
