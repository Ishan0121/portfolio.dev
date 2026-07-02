"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import SocialLinks from '@/components/shared/SocialLinks';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { portfolioInfo } from "@/lib/config";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { containerVariants, fadeUp } from "@/lib/animations";

import type { Props as GitHubCalendarProps } from "react-github-calendar";
import { Button } from "@/components/ui/button";
import { useNotificationStore } from "@/store/useNotificationStore";
const GitHubCalendar = dynamic<GitHubCalendarProps>(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar as React.ComponentType<GitHubCalendarProps>), 
  { ssr: false }
);


const { person, work, studies, technical } = portfolioInfo;

const structure = [
  { title: "Introduction", id: "introduction" },
  { title: "Work Experience", id: "work" },
  { title: "Studies", id: "studies" },
  { title: "Technical skills", id: "technical" },
  { title: "Open Source", id: "opensource" },
];

function TableOfContents() {
  const [activeSection, setActiveSection] = useState<string>("introduction");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    structure.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string, offset: number) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 pl-8 gap-8 hidden xl:flex flex-col z-50">
      {structure.map((section, index) => {
        const isActive = activeSection === section.id;
        return (
          <div
            key={index}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => scrollTo(section.id, 80)}
          >
            <div className={`h-0.5 transition-all duration-300 ${isActive ? 'w-8 bg-foreground' : 'w-5 bg-foreground/20 group-hover:bg-foreground/60'}`}></div>
            <span className={`text-sm font-medium transition-all duration-300 whitespace-nowrap ${isActive ? 'text-foreground font-semibold scale-105 origin-left' : 'text-muted-foreground group-hover:text-foreground/80'}`}>
              {section.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function AboutClient() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [githubYear, setGithubYear] = useState<number | "last">("last");
  const [showCalendar, setShowCalendar] = useState(false);
  const { resolvedTheme } = useTheme();

  const notify = useNotificationStore((state) => state.notify);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCalendar(true);
    }, 1300); // Wait 1.5s to let entry animations finish smoothly
    return () => clearTimeout(timer);
  }, []);

  const currentYear = new Date().getFullYear();
  const years: (number | "last")[] = ["last"];
  for (let y = currentYear; y >= 2023; y--) {
    years.push(y);
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto px-6 py-7 pb-32 relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <TableOfContents />
      <div className="px-6">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 relative justify-center">
          {/* Avatar Sidebar (Left) */}
          <motion.div
            variants={fadeUp}
            className="w-full md:w-1/3 lg:w-[30%] flex flex-col items-center md:items-start"
          >
            <div className="md:sticky top-24 flex flex-col items-center gap-6 w-full py-8">
              <div
                className="relative w-40 h-40 rounded-full overflow-hidden border border-border shadow-sm bg-card cursor-pointer hover:ring-2 hover:ring-primary/50 hover:scale-105 transition-all duration-300 group"
                onClick={() => setIsModalOpen(true)}
              >
                <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center backdrop-blur-[1px]">
                  <Icon
                    icon="lucide:zoom-in"
                    width={24}
                    height={24}
                    className="text-foreground drop-shadow-md"
                  />
                </div>
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                    <span className="text-6xl font-bold font-heading text-muted-foreground/30">
                      {portfolioInfo.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <Image
                  unoptimized={true}
                  src={person.avatar}
                  alt={portfolioInfo.name}
                  width={400}
                  height={400}
                  onLoad={() => setImageLoaded(true)}
                  priority={true}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                />
              </div>

              <div className="flex flex-col items-center gap-3 w-full">
                <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                  <Icon icon="lucide:globe" width={16} height={16} />
                  <span>{person.location}</span>
                </div>
                {person.languages && person.languages.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {person.languages.map((lang, i) => (
                      <span
                        key={i}
                        className="px-4 py-1.5 bg-secondary/50 text-secondary-foreground text-sm font-medium rounded-full border border-border/50"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <Button
                className="w-40 rounded-full gap-2 h-10 border-border/50 flex items-center justify-center"
                size="lg"
                onClick={() => {
                  notify("view_resume", { type: "info" });
                  setIsResumeModalOpen(true);
                }}
              >
                <Icon icon="lucide:file-user" className="w-4 h-5" /> View CV
              </Button>
            </div>
          </motion.div>

          {/* Main Content (Right) */}
          <div className="w-full md:w-2/3 lg:w-[60%] flex flex-col gap-16">
            {/* Intro Section */}
            <motion.section
              variants={fadeUp}
              id="introduction"
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              {/* "Schedule a call" — links to cal.com */}
              <a
                href={portfolioInfo.socials.calcom}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/30 border border-border/50 rounded-full text-sm font-medium backdrop-blur-md cursor-pointer hover:bg-secondary/50 transition-colors mb-8"
              >
                <Icon
                  icon="lucide:calendar"
                  className="text-muted-foreground"
                  width={16}
                  height={16}
                />
                <span>Schedule a call</span>
                <Icon icon="lucide:chevron-right" width={16} height={16} />
              </a>

              <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight mb-2">
                {portfolioInfo.name}
              </h1>
              <h2 className="text-xl text-muted-foreground font-medium mb-6">
                {person.role}
              </h2>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8 p-2 border border-border/50 lg:rounded-full glass bg-secondary/10">
                <SocialLinks size="md" className="gap-3" showName />
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed text-justify">
                {person.intro}
              </p>
            </motion.section>

            {/* Work Experience */}
            {work && work.length > 0 && (
              <motion.section
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                id="work"
                className="space-y-8"
              >
                <h2 className="text-3xl font-semibold text-foreground flex items-center gap-4">
                  <Icon icon="lucide:briefcase-business" className="w-6 h-6" />
                  Work Experience
                </h2>
                <div className="flex flex-col gap-10">
                  {work.map((item, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-1">
                        <h3 className="text-2xl font-bold text-foreground">
                          {item.company}
                        </h3>
                        <span className="text-sm font-medium text-muted-foreground">
                          {item.timeframe}
                        </span>
                      </div>
                      <h4 className="text-base font-medium text-primary/80 mb-3">
                        {item.role}
                      </h4>
                      <ul className="space-y-3">
                        {item.achievements.map((ach, j) => (
                          <li
                            key={j}
                            className="text-muted-foreground flex gap-3 text-base leading-relaxed text-justify"
                          >
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Studies */}
            {studies && studies.length > 0 && (
              <motion.section
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                id="studies"
                className="space-y-8"
              >
                <h2 className="text-3xl font-semibold text-foreground flex items-center gap-4">
                  <Icon icon="lucide:graduation-cap" className="w-6 h-6" />
                  Studies
                </h2>
                <div className="flex flex-col gap-8">
                  {studies.map((item, i) => (
                    <div key={i} className="flex flex-col gap-1.5">
                      <h3 className="text-2xl font-bold text-foreground">
                        {item.name}
                      </h3>
                      <p className="text-muted-foreground text-base leading-relaxed text-justify">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Technical Skills */}
            {technical && technical.length > 0 && (
              <motion.section
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                id="technical"
                className="space-y-8"
              >
                <h2 className="text-3xl font-semibold text-foreground flex items-center gap-4">
                  <Icon icon="lucide:bug" className="w-6 h-6" />
                  Technical skills
                </h2>
                <div className="flex flex-col gap-8">
                  {technical.map((skill, i) => (
                    <div key={i} className="flex flex-col gap-3">
                      <h3 className="text-2xl font-bold text-foreground">
                        {skill.title}
                      </h3>
                      <p className="text-muted-foreground text-base leading-relaxed text-justify">
                        {skill.description}
                      </p>
                      {skill.tags && skill.tags.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-2">
                          {skill.tags.map((tag, j) => (
                            <span
                              key={j}
                              className="flex items-center gap-2 px-4 py-2 bg-secondary/20 text-secondary-foreground text-sm font-medium rounded-lg border border-border/50"
                            >
                              {tag.icon && (
                                <Icon icon={tag.icon} width={18} height={18} />
                              )}
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        </div>

        {/* GitHub Calendar (Open Source) */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          id="opensource"
          className="space-y-8 w-full mt-16 pt-8 border-t border-border/30"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-2">
            <h2 className="text-3xl font-semibold text-foreground flex items-center gap-4">
              <Icon icon="lucide:git-pull-request-arrow" className="w-6 h-6" />
              Open Source Contributions
            </h2>
            <select
              value={githubYear}
              onChange={(e) =>
                setGithubYear(
                  e.target.value === "last" ? "last" : parseInt(e.target.value),
                )
              }
              className="bg-card border border-border/50 text-sm font-medium rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y === "last" ? "Last Year" : y}
                </option>
              ))}
            </select>
          </div>

          <div className="glass p-6 w-full overflow-x-auto min-h-[160px] flex items-center justify-start md:justify-center rounded-xl border border-border/50">
            <div className="min-w-max">
              <ErrorBoundary
                resetKey={githubYear}
                fallback={
                  <div className="text-muted-foreground flex items-center justify-center h-full min-h-[120px]">
                    No contributions found for{" "}
                    {githubYear === "last" ? "the last year" : githubYear}.
                  </div>
                }
              >
                <TooltipProvider delayDuration={50}>
                  {showCalendar ? (
                    <GitHubCalendar
                      username={portfolioInfo.githubUsername}
                      colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
                      year={githubYear}
                      theme={{
                        light: [
                          "#ebedf0",
                          "#9be9a8",
                          "#40c463",
                          "#30a14e",
                          "#216e39",
                        ],
                        dark: [
                          "#1f1f1f",
                          "#444444",
                          "#666666",
                          "#aaaaaa",
                          "#ffffff",
                        ],
                      }}
                      errorMessage="GitHub contributions are currently unavailable."
                      renderBlock={(block, activity) => (
                        <Tooltip key={activity.date}>
                          <TooltipTrigger asChild>{block}</TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="text-xs bg-card border border-border/50 px-2 py-1 rounded"
                          >
                            {activity.count} contributions on {activity.date}
                          </TooltipContent>
                        </Tooltip>
                      )}
                    />
                  ) : (
                    <div className="w-full h-37.5 flex items-center justify-center animate-pulse">
                      <div className="flex items-center gap-3 text-muted-foreground/60">
                        <Icon
                          icon="lucide:loader-2"
                          className="w-5 h-5 animate-spin"
                        />
                        <span className="text-sm font-mono tracking-widest uppercase">
                          Syncing GitHub...
                        </span>
                      </div>
                    </div>
                  )}
                </TooltipProvider>
              </ErrorBoundary>
            </div>
          </div>
        </motion.section>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-2xl max-h-[90vh] w-full rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card/50 backdrop-blur-xl flex items-center justify-center p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-20 p-2.5 bg-background/60 hover:bg-background/90 backdrop-blur-md rounded-full text-foreground transition-all duration-300 hover:scale-110 border border-border/50"
              >
                <Icon icon="lucide:x" width={20} height={20} />
              </button>
              <div className="w-full h-full relative rounded-xl overflow-hidden">
                <Image
                  unoptimized={true}
                  src={person.avatar}
                  alt={portfolioInfo.name}
                  width={1000}
                  height={1000}
                  className="w-full h-full object-contain max-h-[85vh] rounded-xl"
                  priority={true}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isResumeModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8"
            onClick={() => setIsResumeModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card/50 backdrop-blur-xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-border/50 bg-card/80 backdrop-blur-md">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Icon icon="lucide:file-text" /> Resume
                </h3>
                <div className="flex items-center gap-2">
                  <a
                    href={portfolioInfo.resumePath}
                    download={portfolioInfo.resumeName}
                    onClick={() => notify("download_resume", { type: "info" })}
                    className="p-2.5 bg-secondary/50 hover:bg-secondary/80 rounded-full transition-colors border border-border/50 text-foreground"
                    title="Download"
                  >
                    <Icon icon="lucide:download" width={18} height={18} />
                  </a>
                  <button
                    onClick={() => setIsResumeModalOpen(false)}
                    className="p-2.5 bg-background/60 hover:bg-background/90 rounded-full text-foreground transition-all duration-300 hover:scale-110 border border-border/50"
                  >
                    <Icon icon="lucide:x" width={18} height={18} />
                  </button>
                </div>
              </div>
              <div className="flex-1 w-full bg-muted/20 relative">
                <iframe
                  src={portfolioInfo.resumePath}
                  className="w-full h-full border-0"
                  title="Resume"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
