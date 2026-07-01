"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Icon } from "@iconify/react";
import { siteConfig, portfolioInfo } from "@/lib/config";
import { Project, fetchProjectsWithCache } from "@/lib/github-projects-fetcher";
import { skillsData } from '@/data/skills';
import { useNotificationStore } from "@/store/useNotificationStore";

interface CommandMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CommandMenu({ open, setOpen }: CommandMenuProps) {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);

  // Fetch projects when command menu opens
  useEffect(() => {
    async function loadProjects() {
      if (!open || projects.length > 0) return;
      const data = await fetchProjectsWithCache({
        username: portfolioInfo.githubUsername,
        maxProjects: 30,
        sortBy: "updated",
        excludeRepos: siteConfig.github.excludeRepos,
      });
      setProjects(data);
    }
    loadProjects();
  }, [open, projects.length]);

  // Handle global shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    const toggleMenu = () => setOpen(!open);

    document.addEventListener("keydown", down);
    document.addEventListener("toggle-command-menu", toggleMenu);
    return () => {
      document.removeEventListener("keydown", down);
      document.removeEventListener("toggle-command-menu", toggleMenu);
    };
  }, [open, setOpen]);

  // Execute an action and close
  const runCommand = useCallback(
    (command: () => unknown) => {
      setOpen(false);
      command();
    },
    [setOpen]
  );

  return (
    <>
      {/* Background Blur Overlay Hooked into Dialog State */}
      {open && (
        <div 
          className="fixed inset-0 z-[40] bg-blue-900/10 backdrop-blur-[2px] transition-opacity duration-300 pointer-events-none"
          aria-hidden="true"
        />
      )}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search for projects, skills..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Navigation">
            {siteConfig.navLinks.map((link) => (
              <CommandItem key={link.title} value={link.keywords} onSelect={() => runCommand(() => router.push(link.href))}>
                <Icon icon={link.icon} className="mr-2 h-4 w-4" />
                <span>{link.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          
          <CommandSeparator />

          {projects.length > 0 && (
            <>
              <CommandGroup heading="Projects">
                {projects.map((project) => (
                  <CommandItem
                    key={project.githubUrl}
                    value={`${project.title} ${project.description} ${project.tags.join(" ")}`}
                    onSelect={() => {
                      runCommand(() => window.open(project.liveUrl || project.githubUrl, "_blank"));
                    }}
                  >
                    <Icon icon="lucide:folder-dot" className="mr-2 h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="flex flex-col overflow-hidden">
                      <span className="truncate">{project.title}</span>
                      <span className="text-xs text-muted-foreground truncate">{project.description}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          <CommandGroup heading="Skills">
            {skillsData.flatMap(cat => cat.skills).map((skill) => (
              <CommandItem
                key={skill.name}
                value={`${skill.name} ${skill.description}`}
                onSelect={() => runCommand(() => router.push("/skills"))}
              >
                <Icon icon="lucide:code-2" className="mr-2 h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate">{skill.name}</span>
                  <span className="text-xs text-muted-foreground truncate">{skill.description}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />
          
          <CommandGroup heading="Actions">
            <CommandItem
              value="Download Resume PDF CV"
              onSelect={() => {
                runCommand(() => {
                  const link = document.createElement('a');
                  link.href = portfolioInfo.resumePath;
                  link.download = portfolioInfo.resumeName;
                  link.click();
                });
              }}
            >
              <Icon icon="lucide:file-down" className="mr-2 h-4 w-4" />
              <span>Download Resume</span>
            </CommandItem>
            <CommandItem 
              value="Toggle Do Not Disturb Notifications DND Mute" 
              onSelect={() => runCommand(() => useNotificationStore.getState().toggleDnd())}
            >
              <Icon icon="lucide:bell-off" className="mr-2 h-4 w-4" />
              <span>Toggle Do Not Disturb</span>
            </CommandItem>
          </CommandGroup>
          
          <CommandSeparator />
          
          <CommandGroup heading="Theme">
            <CommandItem value="Light Theme Appearance" onSelect={() => runCommand(() => setTheme("light"))}>
              <Icon icon="lucide:sun" className="mr-2 h-4 w-4" />
              <span>Light Theme</span>
            </CommandItem>
            <CommandItem value="Dark Theme Appearance" onSelect={() => runCommand(() => setTheme("dark"))}>
              <Icon icon="lucide:moon" className="mr-2 h-4 w-4" />
              <span>Dark Theme</span>
            </CommandItem>
            <CommandItem value="System Theme Appearance" onSelect={() => runCommand(() => setTheme("system"))}>
              <Icon icon="lucide:monitor" className="mr-2 h-4 w-4" />
              <span>System Theme</span>
            </CommandItem>
          </CommandGroup>

        </CommandList>
      </CommandDialog>
    </>
  );
}
