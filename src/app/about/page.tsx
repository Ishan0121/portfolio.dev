"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import SocialLinks from "@/components/SocialLinks";
import { siteConfig } from "@/lib/config";

const { person, work, studies, technical } = siteConfig;

function TableOfContents() {
  const structure = [
    { title: "Introduction", id: "introduction" },
    { title: "Work Experience", id: "work" },
    { title: "Studies", id: "studies" },
    { title: "Technical skills", id: "technical" },
  ];

  const scrollTo = (id: string, offset: number) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
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
          <div className="h-[2px] w-5 bg-foreground/20 group-hover:bg-foreground transition-colors"></div>
          <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
            {section.title}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function AboutPage() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-6 py-7 pb-32 relative">
      <TableOfContents />
      
      <div className="flex flex-col md:flex-row gap-12 lg:gap-24 relative justify-center">
        
        {/* Avatar Sidebar (Left) */}
        <div className="w-full md:w-1/3 lg:w-[30%] flex flex-col items-center md:items-start">
          <div className="md:sticky top-24 flex flex-col items-center gap-6 w-full py-8">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border border-border shadow-sm bg-card">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                  <span className="text-muted-foreground/50 text-3xl font-bold">{person.name[0]}</span>
                </div>
              )}
              <img 
                src={person.avatar} 
                alt={person.name} 
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/30 border border-border/50 rounded-full text-sm font-medium backdrop-blur-md cursor-pointer hover:bg-secondary/50 transition-colors mb-8">
              <Icon icon="lucide:calendar" className="text-muted-foreground" width={16} height={16} />
              <span>Schedule a call</span>
              <Icon icon="lucide:chevron-right" width={16} height={16} />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight mb-2">
              {person.name}
            </h1>
            <h2 className="text-xl text-muted-foreground font-medium mb-6">
              {person.role}
            </h2>
            
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8 p-2 border border-border/50 rounded-full glass bg-secondary/10 ">
              <SocialLinks size="md" className="gap-3" showName />
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              {person.intro}
            </p>
          </section>

          {/* Work Experience */}
          {work && work.length > 0 && (
            <section id="work" className="space-y-8">
              <h2 className="text-3xl font-semibold text-foreground">
                Work Experience
              </h2>
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
              <h2 className="text-3xl font-semibold text-foreground">
                Studies
              </h2>
              <div className="flex flex-col gap-8">
                {studies.map((item, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <h3 className="text-2xl font-bold text-foreground">{item.name}</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Technical Skills */}
          {technical && technical.length > 0 && (
            <section id="technical" className="space-y-8">
              <h2 className="text-3xl font-semibold text-foreground">
                Technical skills
              </h2>
              <div className="flex flex-col gap-8">
                {technical.map((skill, i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <h3 className="text-2xl font-bold text-foreground">{skill.title}</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {skill.description}
                    </p>
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
    </div>
  );
}

