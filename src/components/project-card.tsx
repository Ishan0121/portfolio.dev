import Image from "next/image";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

type ProjectCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  tags: string[];
  isLoading?: boolean;
  onClick?: () => void;
};

export function ProjectCard({
  title,
  description,
  imageUrl,
  liveUrl,
  githubUrl,
  tags,
  isLoading,
  onClick,
}: ProjectCardProps) {
  if (isLoading) {
    return (
      <div className="glass p-2 space-y-2 animate-pulse">
        <div className="h-[220px] w-full rounded-lg bg-muted" />
        <div className="p-4 space-y-4">
          <div className="h-6 w-3/4 bg-muted rounded" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-5/6 bg-muted rounded" />
          <div className="flex gap-2 pt-2">
            <div className="h-6 w-16 rounded-full bg-muted" />
            <div className="h-6 w-16 rounded-full bg-muted" />
            <div className="h-6 w-16 rounded-full bg-muted" />
          </div>
          <div className="flex gap-2 pt-2">
            <div className="h-9 w-24 bg-muted rounded" />
            <div className="h-9 w-24 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  // Determine if it's the auto-generated live URL which we shouldn't show if missing
  const isAutoLiveUrl = liveUrl.includes(".github.io") && liveUrl.includes(title.toLowerCase().replace(/\s+/g, '-'));

  return (
    <div 
      className={`group relative flex flex-col h-full overflow-hidden glass glass-hover ${onClick ? 'cursor-pointer' : ''}`}
      onClick={(e) => {
        // Only trigger if not clicking on the action buttons directly
        if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) {
          return;
        }
        onClick?.();
      }}
    >
      <div className="relative h-[220px] w-full overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      
      <div className="flex flex-col flex-grow p-4 space-y-4">
        <div className="space-y-2">
          <h3 className="font-bold text-xl tracking-tight transition-colors duration-300 line-clamp-1 group-hover:text-primary">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{description}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors hover:bg-muted"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3 pt-4 border-t border-border mt-4">
          {liveUrl && !isAutoLiveUrl && (
            <Button asChild className="flex-1 rounded-full">
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <Icon icon="lucide:external-link" className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
          {githubUrl && (
            <Button asChild variant={liveUrl && !isAutoLiveUrl ? "outline" : "default"} className="flex-1 rounded-full">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Icon icon="mdi:github" className="mr-2 h-4 w-4" />
                Code
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}