"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/shared/project-card";
import { ProjectDrawer } from "@/components/shared/project-drawer";
import { Project } from "@/lib/github-projects-fetcher";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 12;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [activeTag, setActiveTag] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Extract all tags and count occurrences
  const tagCounts = projects.flatMap(p => p.tags).reduce((acc, tag) => {
    if (tag) acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Sort by count (descending) and get top 8 tags to not overwhelm the UI
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(entry => entry[0]);

  const filterTags = ["All", ...topTags];

  const sortedProjects = [...projects].sort((a, b) => {
    const pinA = a.isPinned;
    const pinB = b.isPinned;

    if (pinA !== undefined && pinB !== undefined) {
      if (pinA !== pinB) {
        return pinA - pinB;
      }
    } else if (pinA !== undefined) {
      return -1;
    } else if (pinB !== undefined) {
      return 1;
    }

    const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    return dateB - dateA;
  });

  const filteredProjects = sortedProjects.filter((project) =>
    activeTag === "All" ? true : project.tags.includes(activeTag)
  );

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleTagChange = (tag: string) => {
    setActiveTag(tag);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      
      // Scroll to the top of the grid with an offset
      setTimeout(() => {
        const element = document.getElementById("portfolio-grid");
        if (element) {
          const topOffset = element.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: topOffset, behavior: "smooth" });
        }
      }, 50);
    }
  };

  return (
    <div className="space-y-8" id="portfolio-grid">
      {/* Top Bar: Filters + Page Indicator */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 w-full">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {filterTags.map((tag) => (
            <Button
              key={tag}
              onClick={() => handleTagChange(tag)}
              variant={activeTag === tag ? "default" : "secondary"}
              className="rounded-full px-4 py-2"
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[500px]" // Min height prevents huge layout shifts when paginating
      >
        <AnimatePresence mode="popLayout">
          {currentProjects.map((project, index) => (    
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              key={`${project.githubUrl || project.title}-${currentPage}-${index}`}
            >
              <ProjectCard {...project} tags={[...project.tags]} onClick={() => {
                setSelectedProject(project);
                setIsDrawerOpen(true);
              }} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {filteredProjects.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-center py-16 text-muted-foreground bg-card rounded-xl border border-border/50 flex flex-col justify-center min-h-[300px]"
        >
          <p className="text-xl font-medium mb-2">No projects found</p>
          <p>Try selecting a different filter option.</p>
        </motion.div>
      )}

      {/* Futuristic Pagination */}
      {totalPages > 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mt-12 pt-8 select-none"
        >
          <div className="flex items-center justify-center gap-1 sm:gap-2 p-1.5 rounded-full border border-border/50 shadow-sm bg-card backdrop-blur-md">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-full hover:bg-accent disabled:opacity-50 hover:text-foreground transition-all duration-300 text-muted-foreground w-9 h-9 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center"
            >
              <Icon icon="lucide:chevron-left" className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            <div className="flex items-center gap-1 sm:gap-2 px-1 sm:px-2">
              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                const isActive = page === currentPage;
                
                // Truncate logic for many pages
                if (
                  totalPages > 5 &&
                  page !== 1 &&
                  page !== totalPages &&
                  Math.abs(page - currentPage) > 1
                ) {
                  // Only show ellipsis once per block
                  if (page === 2 || page === totalPages - 1) {
                    return <span key={page} className="text-muted-foreground px-1">...</span>;
                  }
                  return null;
                }

                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-300
                      ${isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}
                    `}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-page-indicator"
                        className="absolute inset-0 bg-primary/90 rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                        initial={false}
                        transition={{ 
                          type: "spring", 
                          stiffness: 400, 
                          damping: 30 
                        }}
                      />
                    )}
                    <span className="relative z-10">{page}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded-full hover:bg-accent hover:text-foreground disabled:opacity-50 transition-all duration-300 text-muted-foreground w-9 h-9 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center"
            >
              <Icon icon="lucide:chevron-right" className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Project Detail Drawer */}
      {selectedProject && (
        <ProjectDrawer 
          project={selectedProject} 
          open={isDrawerOpen} 
          onOpenChange={setIsDrawerOpen} 
        />
      )}
    </div>
  );
}
