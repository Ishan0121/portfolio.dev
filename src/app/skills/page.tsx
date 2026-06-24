"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skillsData } from "@/data/skills";
import { TechTree } from "@/components/tech-tree";
import { LayoutGrid, Network } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function SkillsPage() {
  const [view, setView] = useState<"grid" | "tree">("tree");

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 pb-32">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="space-y-10"
      >
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-10">
          <div className="space-y-6 max-w-2xl">
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold font-heading text-foreground">
              Technical Arsenal
            </motion.h1>
            <motion.div variants={fadeUp} className="w-20 h-1 bg-primary rounded-full" />
            <motion.p variants={fadeUp} className="text-xl text-muted-foreground leading-relaxed">
              A comprehensive overview of my technical skills, tools, and environments I use to build digital experiences.
            </motion.p>
          </div>

          <motion.div variants={fadeUp} className="flex bg-card border border-border/50 rounded-full p-1 shadow-sm">
            <button
              onClick={() => setView("tree")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                view === "tree" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Network size={16} /> Tree View
            </button>
            <button
              onClick={() => setView("grid")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                view === "grid" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid size={16} /> Grid View
            </button>
          </motion.div>
        </section>

        <motion.section variants={fadeUp}>
          {view === "tree" ? (
            <TechTree />
          ) : (
            <motion.div className="space-y-16 w-full" variants={container}>
              {skillsData.map((category, index) => (
                <motion.div key={index} variants={fadeUp} className="space-y-6 overflow-hidden">
                  <h3 className="text-2xl font-semibold">{category.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.skills.map((skill, sIndex) => (
                      <SkillAnimationWrapper key={skill.name} index={sIndex}>
                        <div className="glass glass-hover p-4 h-full">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold">{skill.name}</h3>
                              <span className="text-sm text-muted-foreground">{skill.level}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{skill.description}</p>
                          </div>
                        </div>
                      </SkillAnimationWrapper>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.section>
      </motion.div>
    </div>
  );
}

function SkillAnimationWrapper({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{
        x: index % 2 === 0 ? -50 : 50,
        opacity: 0,
      }}
      animate={
        isInView
          ? { x: 0, opacity: 1 }
          : { x: index % 2 === 0 ? -50 : 50, opacity: 0 }
      }
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="overflow-hidden h-full"
    >
      {children}
    </motion.div>
  );
}
