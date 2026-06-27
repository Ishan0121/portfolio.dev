"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from '@/components/shared/section-heading';
import { SkillsSection } from '@/components/sections/skills-section';
import { TechTree } from '@/components/sections/tech-tree';
import { Button } from "@/components/ui/button";
import { skillsData } from '@/data/skills-data';
import { containerVariants, fadeInUpVariants } from "@/lib/animations";

export default function SkillsClient() {
  const [view, setView] = useState<"grid" | "tree">("grid");

  return (
    <motion.section
      className="max-w-7xl mx-auto px-6 lg:py-12 flex flex-col items-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={fadeInUpVariants}>
        <SectionHeading
          title="Skills & Expertise"
          description="A comprehensive overview of my technical skills and proficiency levels"
        />
      </motion.div>

      {/* View toggle */}
      <motion.div variants={fadeInUpVariants} className="flex justify-center mb-10 w-full z-20">
        <div className="glass p-1 rounded-full flex items-center gap-1 border border-white/10 shadow-lg relative bg-blue-900/10">
          <Button
            variant="ghost"
            onClick={() => setView("grid")}
            className={`rounded-full z-10 w-32 ${view === "grid" ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-transparent"}`}
          >
            Grid View
          </Button>
          <Button
            variant="ghost"
            onClick={() => setView("tree")}
            className={`rounded-full z-10 w-32 ${view === "tree" ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-transparent"}`}
          >
            Tree View
          </Button>
          {/* Sliding background indicator */}
          <div
            className="absolute top-1 bottom-1 w-[calc(50%-6px)] bg-primary/20 border border-primary/30 rounded-full transition-transform duration-300 ease-out z-0"
            style={{ transform: view === "grid" ? "translateX(0)" : "translateX(calc(100% + 4px))", left: "4px" }}
          />
        </div>
      </motion.div>

      {view === "grid" ? (
        <motion.div className="space-y-16 w-full" variants={containerVariants}>
          {skillsData.map((category) => (
            <motion.div key={category.name} variants={fadeInUpVariants}>
              <SkillsSection category={category} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div variants={fadeInUpVariants} className="w-full max-w-7xl z-10">
          <TechTree />
        </motion.div>
      )}
    </motion.section>
  );
}
