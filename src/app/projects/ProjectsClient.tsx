"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/github-projects-fetcher";
import { PortfolioGrid } from '@/components/sections/PortfolioGrid';
import { Icon } from "@iconify/react";
import { siteConfig, portfolioInfo } from "@/lib/config";
import { containerVariants, fadeUp } from "@/lib/animations";

export default function ProjectsClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      const username = portfolioInfo.githubUsername;
      const CACHE_KEY = `github_projects_v2_${username}`;
      const CACHE_FINGERPRINT_KEY = `github_projects_fingerprint_v2_${username}`;
      
      // 1. Read from localStorage immediately for instant render
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cachedFingerprint = localStorage.getItem(CACHE_FINGERPRINT_KEY);
      
      if (cachedData) {
        try {
          setProjects(JSON.parse(cachedData));
          setIsLoading(false); // Stop loading skeleton instantly if we have cache
        } catch (e) {
          console.error("Failed to parse cached projects");
          setIsLoading(true);
        }
      } else {
        // If no cache, show loading skeleton
        setIsLoading(true);
      }

      // 2. Background revalidation to Server
      const config = {
        username,
        maxProjects: 30,
        sortBy: "updated" as const,
        excludeRepos: siteConfig.github.excludeRepos,
      };

      try {
        const { syncProjects } = await import("@/app/actions/projects");
        const response = await syncProjects(config, cachedFingerprint);
        
        if (response.updated && response.projects && response.metadata) {
          console.log("Projects updated from server");
          setProjects(response.projects);
          localStorage.setItem(CACHE_KEY, JSON.stringify(response.projects));
          localStorage.setItem(CACHE_FINGERPRINT_KEY, response.metadata.fingerprint);
        } else {
          console.log("Local cache is already up to date with GitHub state.");
        }
      } catch (error) {
        console.error("Error during background revalidation:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadProjects();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:py-12 pb-32">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-16"
      >
        <section className="space-y-6 pt-10 max-w-2xl">
          <div className="flex items-center gap-6">
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold font-heading text-foreground">
              Featured Work
            </motion.h1>
            <AnimatePresence>
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="glass !rounded-full px-4 py-2 flex items-center gap-3"
                >
                  <Icon icon="lucide:loader-2" width={16} height={16} className="animate-spin text-primary" />
                  <span className="text-xs font-mono uppercase tracking-widest opacity-80">Fetching Data</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.div variants={fadeUp} className="w-20 h-1 bg-primary rounded-full" />
          <motion.p variants={fadeUp} className="text-xl text-muted-foreground leading-relaxed">
            A selection of projects that showcase my focus on performance, 
            design, and engineering robust solutions.
          </motion.p>
        </section>

        <motion.section variants={fadeUp}>
          {isLoading && projects.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="glass h-[400px] animate-pulse flex flex-col justify-end p-6">
                  <div className="h-6 bg-muted/50 rounded w-2/3 mb-4"></div>
                  <div className="h-4 bg-muted/50 rounded w-1/2 mb-6"></div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-muted/50 rounded-full w-16"></div>
                    <div className="h-8 bg-muted/50 rounded-full w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <PortfolioGrid projects={projects} />
          )}
        </motion.section>
      </motion.div>
    </div>
  );
}
