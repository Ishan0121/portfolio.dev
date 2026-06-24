"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  Home,
  User,
  FolderDot,
  Code2,
  Mail,
  Box,
  Search
} from "lucide-react";
import "./command-menu.css";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = useCallback(
    (command: () => unknown) => {
      setOpen(false);
      command();
    },
    []
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div 
        className="w-full max-w-lg bg-card border border-border/50 rounded-xl overflow-hidden shadow-2xl" 
        onClick={(e) => e.stopPropagation()}
      >
        <Command className="cmd-k" loop>
          <div className="flex items-center border-b border-border/50 px-4">
            <Search className="w-5 h-5 text-muted-foreground mr-2 shrink-0" />
            <Command.Input 
              placeholder="Type a command or search..." 
              className="flex w-full h-14 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
          
          <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">No results found.</Command.Empty>

            <Command.Group heading="Navigation" className="px-2 text-xs font-medium text-muted-foreground my-2">
              <Command.Item
                onSelect={() => runCommand(() => router.push("/"))}
                className="flex items-center gap-2 px-3 py-3 text-sm text-foreground rounded-lg cursor-pointer hover:bg-accent aria-selected:bg-accent transition-colors"
              >
                <Home className="w-4 h-4" /> Home
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/about"))}
                className="flex items-center gap-2 px-3 py-3 text-sm text-foreground rounded-lg cursor-pointer hover:bg-accent aria-selected:bg-accent transition-colors"
              >
                <User className="w-4 h-4" /> About
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/projects"))}
                className="flex items-center gap-2 px-3 py-3 text-sm text-foreground rounded-lg cursor-pointer hover:bg-accent aria-selected:bg-accent transition-colors"
              >
                <FolderDot className="w-4 h-4" /> Projects
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/skills"))}
                className="flex items-center gap-2 px-3 py-3 text-sm text-foreground rounded-lg cursor-pointer hover:bg-accent aria-selected:bg-accent transition-colors"
              >
                <Code2 className="w-4 h-4" /> Skills
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/contact"))}
                className="flex items-center gap-2 px-3 py-3 text-sm text-foreground rounded-lg cursor-pointer hover:bg-accent aria-selected:bg-accent transition-colors"
              >
                <Mail className="w-4 h-4" /> Contact
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/3d"))}
                className="flex items-center gap-2 px-3 py-3 text-sm text-foreground rounded-lg cursor-pointer hover:bg-accent aria-selected:bg-accent transition-colors"
              >
                <Box className="w-4 h-4" /> 3D Lab
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
