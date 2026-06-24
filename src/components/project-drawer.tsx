"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getReadme } from "@/app/actions/getReadme";
import { Drawer } from "vaul";
import { Project } from "@/lib/github-projects-fetcher";
import { Icon } from "@iconify/react";

interface ProjectDrawerProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDrawer({ project, open, onOpenChange }: ProjectDrawerProps) {
  const [mdxSource, setMdxSource] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!project || !open) return;

    const fetchReadme = async () => {
      setLoading(true);
      setMdxSource(null);
      setErrorMsg(null);
      try {
        if (project.githubUrl) {
          const urlParts = project.githubUrl.split('/');
          const username = urlParts[urlParts.length - 2];
          const repo = urlParts[urlParts.length - 1];

          if (username && repo) {
            const result = await getReadme(username, repo);
            if (result.source) {
              setMdxSource(result.source);
            } else {
              setErrorMsg(result.error || "Failed to load README.");
            }
          } else {
            setErrorMsg("Invalid GitHub URL.");
          }
        } else {
           setErrorMsg("No GitHub URL associated with this project.");
        }
      } catch (error) {
        console.error("Error fetching README:", error);
        setErrorMsg("Failed to load README.");
      } finally {
        setLoading(false);
      }
    };

    fetchReadme();
  }, [project, open]);

  if (!project) return null;

  const isAutoLiveUrl = project.liveUrl.includes(".github.io") && project.liveUrl.includes(project.title.toLowerCase().replace(/\s+/g, '-'));

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" />
        <Drawer.Content className="bg-card flex flex-col rounded-t-[20px] h-[90vh] mt-24 fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 focus:outline-none overflow-hidden mx-auto max-w-4xl">
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-border/80 mt-4 mb-2" />
          
          <div className="p-6 border-b border-border/50 flex-shrink-0">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
              <Drawer.Title className="text-2xl font-bold tracking-tight text-foreground">
                {project.title}
              </Drawer.Title>
              <div className="flex gap-2">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-medium bg-accent text-accent-foreground border border-border/50 px-4 py-2 rounded-full hover:bg-background transition-colors">
                    <Icon icon="mdi:github" className="w-4 h-4 mr-2" /> Code
                  </a>
                )}
                {project.liveUrl && !isAutoLiveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-colors">
                    <Icon icon="lucide:external-link" className="w-4 h-4 mr-2" /> Live
                  </a>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-48 space-y-4 text-muted-foreground">
                <Icon icon="lucide:loader-2" className="w-8 h-8 animate-spin text-primary" />
                <p>Fetching project documentation...</p>
              </div>
            ) : mdxSource ? (
              <div className="prose prose-sm md:prose-base dark:prose-invert prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl prose-img:border prose-img:border-border max-w-none pb-12">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{mdxSource}</ReactMarkdown>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 space-y-4 text-muted-foreground">
                <Icon icon="lucide:book-open" className="w-12 h-12 opacity-20" />
                <p>{errorMsg || "Documentation not available."}</p>
              </div>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
