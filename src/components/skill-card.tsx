import { Icon } from "@iconify/react";

type SkillCardProps = {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  icon?: string;
};

export function SkillCard({ name, level, description, icon }: SkillCardProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-blue-900/5 backdrop-blur-[2px] p-4 transition-all hover:backdrop-blur-[4px] hover:bg-blue-900/20 shadow-sm shadow-blue-900/50">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon && <Icon icon={icon} className="w-5 h-5" />}
            <h3 className="font-semibold">{name}</h3>
          </div>
          <span className="text-sm text-muted-foreground">{level}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}