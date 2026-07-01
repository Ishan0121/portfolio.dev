import { Icon } from "@iconify/react";
import Image from "next/image";

type SkillCardProps = {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  icon?: string;
};

export function SkillCard({ name, level, description, icon }: SkillCardProps) {
  return (
    <div className="rounded-lg border border-primary/30 bg-primary/5 backdrop-blur-[2px] p-4 transition-all hover:backdrop-blur-[4px] hover:bg-primary/20 shadow-sm shadow-primary/50">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon && (
              icon.startsWith('/') 
                ? <Image src={icon} alt={name} width={20} height={20} className="w-5 h-5 object-contain" />
                : <Icon icon={icon} className="w-5 h-5" />
            )}
            <h3 className="font-semibold">{name}</h3>
          </div>
          <span className="text-sm text-muted-foreground">{level}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}