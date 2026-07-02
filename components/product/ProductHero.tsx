import Link from "next/link";
import { Leaf, Moon, Rotate3D, SunMedium } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ProductHero({
  title,
  subtitle,
  heroImage,
  volume,
  step,
  actives = ["Spiruline", "Niacinamide", "Zinc PCA"],
}: {
  title: string;
  subtitle: string;
  heroImage: string;
  volume: string;
  step: string;
  actives?: string[];
}) {
  return (
    <PageHero
      eyebrow="Gamme SPIRALIS"
      title={title}
      subtitle={subtitle}
      image={heroImage}
      badges={[step, volume, "Peaux mixtes a grasses"]}
      imagePosition="center right"
    >
      <div className="grid max-w-[24rem] grid-cols-2 gap-2.5 sm:flex sm:max-w-none sm:flex-wrap sm:gap-3">
        {actives.map((active) => (
          <Badge className="gap-1.5 bg-cream/72 backdrop-blur sm:gap-2" key={active}>
            <Leaf className="h-3.5 w-3.5 text-sage" strokeWidth={1.5} />
            {active}
          </Badge>
        ))}
      </div>
      <div className="grid gap-2.5 min-[430px]:grid-cols-2 sm:flex sm:flex-row sm:gap-3">
        <Button asChild>
          <Link href="/experience-3d">
            <Rotate3D className="h-4 w-4" strokeWidth={1.5} />
            Explorer en 3D
          </Link>
        </Button>
        <Button asChild variant="secondary" className="min-[430px]:col-span-1">
          <Link href="/routine?moment=matin#routine-planner">
            <SunMedium className="h-4 w-4" strokeWidth={1.5} />
            Routine matin
          </Link>
        </Button>
        <Button asChild variant="secondary" className="min-[430px]:col-span-2 sm:col-auto">
          <Link href="/routine?moment=soir#routine-planner">
            <Moon className="h-4 w-4" strokeWidth={1.5} />
            Routine soir
          </Link>
        </Button>
      </div>
    </PageHero>
  );
}
