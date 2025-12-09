import { skills, type SkillCategory } from "@/lib/data/skills";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

type SkillCardProps = {
  category: SkillCategory;
};

export function SkillCard({ category }: SkillCardProps) {
  return (
    <Card className="h-full space-y-3">
      <h3 className="text-lg font-semibold text-white">{category.title}</h3>
      <div className="flex flex-wrap gap-2">
        {category.items.map((item) => (
          <Badge key={item} variant="secondary">
            {item}
          </Badge>
        ))}
      </div>
    </Card>
  );
}

export function SkillGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {skills.map((category) => (
        <SkillCard key={category.title} category={category} />
      ))}
    </div>
  );
}
