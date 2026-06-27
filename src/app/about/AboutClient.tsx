"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useState } from "react";
import SocialLinks from '@/components/shared/SocialLinks';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { siteConfig } from "@/lib/config";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import type { Props as GitHubCalendarProps } from "react-github-calendar";
const GitHubCalendar = dynamic<GitHubCalendarProps>(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar as React.ComponentType<GitHubCalendarProps>), 
  { ssr: false }
);
import { TracingBeam } from "@/components/effects/tracing-beam";

const { person, work, studies, technical } = siteConfig;

function TableOfContents() {
  const structure = [
    { title: "Introduction", id: "introduction" },
    { title: "Work Experience", id: "work" },
    { title: "Studies", id: "studies" },
    { title: "Technical skills", id: "technical" },
    { title: "Open Source", id: "opensource" },
  ];

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
      {structure.map((section, index) => (
        <div
          key={index}
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => scrollTo(section.id, 80)}
        >
          <div className="h-0.5 w-5 bg-foreground/20 group-hover:bg-foreground transition-colors"></div>
          <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
            {section.title}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function AboutClient() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [githubYear, setGithubYear] = useState<number | "last">("last");
  const { resolvedTheme } = useTheme();

  const currentYear = new Date().getFullYear();
  const years: (number | "last")[] = ["last"];
  for (let y = currentYear; y >= 2023; y--) {
    years.push(y);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-7 pb-32 relative">
      <TableOfContents />
      <TracingBeam className="px-6">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 relative justify-center">

          {/* Avatar Sidebar (Left) */}
          <div className="w-full md:w-1/3 lg:w-[30%] flex flex-col items-center md:items-start">
            <div className="md:sticky top-24 flex flex-col items-center gap-6 w-full py-8">
              <div className="relative w-40 h-40 rounded-full overflow-hidden border border-border shadow-sm bg-card">
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                    <span className="text-6xl font-bold font-heading text-muted-foreground/30">
                      {siteConfig.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <Image
                  src={person.avatar}
                  alt={siteConfig.name}
                  width={400}
                  height={400}
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
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
                      <span key={i} className="px-4 py-1.5 bg-secondary/50 text-secondary-foreground text-sm font-medium rounded-full border border-border/50">
                        {lang}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content (Right) */}
          <div className="w-full md:w-2/3 lg:w-[60%] flex flex-col gap-16">

            {/* Intro Section */}
            <section id="introduction" className="flex flex-col items-center md:items-start text-center md:text-left">
              {/* "Schedule a call" — links to email as a fallback since no Calendly is configured */}
              <a
                href={`mailto:${siteConfig.socials.email}?subject=Let's connect`}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/30 border border-border/50 rounded-full text-sm font-medium backdrop-blur-md cursor-pointer hover:bg-secondary/50 transition-colors mb-8"
              >
                <Icon icon="lucide:calendar" className="text-muted-foreground" width={16} height={16} />
                <span>Schedule a call</span>
                <Icon icon="lucide:chevron-right" width={16} height={16} />
              </a>

              <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight mb-2">
                {siteConfig.name}
              </h1>
              <h2 className="text-xl text-muted-foreground font-medium mb-6">
                {person.role}
              </h2>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8 p-2 border border-border/50 lg:rounded-full glass bg-secondary/10">
                <SocialLinks size="md" className="gap-3" showName />
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {person.intro}
              </p>
            </section>

            {/* Work Experience */}
            {work && work.length > 0 && (
              <section id="work" className="space-y-8">
                <h2 className="text-3xl font-semibold text-foreground">Work Experience</h2>
                <div className="flex flex-col gap-10">
                  {work.map((item, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-1">
                        <h3 className="text-2xl font-bold text-foreground">{item.company}</h3>
                        <span className="text-sm font-medium text-muted-foreground">{item.timeframe}</span>
                      </div>
                      <h4 className="text-base font-medium text-primary/80 mb-3">{item.role}</h4>
                      <ul className="space-y-3">
                        {item.achievements.map((ach, j) => (
                          <li key={j} className="text-muted-foreground flex gap-3 text-base leading-relaxed">
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Studies */}
            {studies && studies.length > 0 && (
              <section id="studies" className="space-y-8">
                <h2 className="text-3xl font-semibold text-foreground">Studies</h2>
                <div className="flex flex-col gap-8">
                  {studies.map((item, i) => (
                    <div key={i} className="flex flex-col gap-1.5">
                      <h3 className="text-2xl font-bold text-foreground">{item.name}</h3>
                      <p className="text-muted-foreground text-base leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Technical Skills */}
            {technical && technical.length > 0 && (
              <section id="technical" className="space-y-8">
                <h2 className="text-3xl font-semibold text-foreground">Technical skills</h2>
                <div className="flex flex-col gap-8">
                  {technical.map((skill, i) => (
                    <div key={i} className="flex flex-col gap-3">
                      <h3 className="text-2xl font-bold text-foreground">{skill.title}</h3>
                      <p className="text-muted-foreground text-base leading-relaxed">{skill.description}</p>
                      {skill.tags && skill.tags.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-2">
                          {skill.tags.map((tag, j) => (
                            <span key={j} className="flex items-center gap-2 px-4 py-2 bg-secondary/20 text-secondary-foreground text-sm font-medium rounded-lg border border-border/50">
                              {tag.icon && <Icon icon={tag.icon} width={18} height={18} />}
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>

        {/* GitHub Calendar (Open Source) */}
        <section id="opensource" className="space-y-8 w-full mt-16 pt-8 border-t border-border/30">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-2">
            <h2 className="text-3xl font-semibold text-foreground">Open Source Contributions</h2>
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

          <div className="glass p-6 w-full overflow-x-auto min-h-[160px] flex items-center justify-start md:justify-center rounded-xl border border-border/50">
            <div className="min-w-max">
                <ErrorBoundary
                  resetKey={githubYear}
                  fallback={
                    <div className="text-muted-foreground flex items-center justify-center h-full min-h-[120px]">
                      No contributions found for {githubYear === "last" ? "the last year" : githubYear}.
                    </div>
                  }
                >
                  <TooltipProvider delayDuration={50}>
                    <GitHubCalendar
                      username={siteConfig.githubUsername}
                      colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
                      year={githubYear}
                      theme={{
                        light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                        dark: ["#1f1f1f", "#444444", "#666666", "#aaaaaa", "#ffffff"]
                      }}
                      errorMessage="GitHub contributions are currently unavailable."
                      renderBlock={(block, activity) => (
                        <Tooltip key={activity.date}>
                          <TooltipTrigger asChild>{block}</TooltipTrigger>
                          <TooltipContent side="top" className="text-xs bg-card border border-border/50 px-2 py-1 rounded">
                            {activity.count} contributions on {activity.date}
                          </TooltipContent>
                        </Tooltip>
                      )}
                    />
                  </TooltipProvider>
                </ErrorBoundary>
            </div>
          </div>
        </section>

      </TracingBeam>
    </div>
  );
}
