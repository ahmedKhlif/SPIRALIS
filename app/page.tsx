import Image from "next/image";
import Link from "next/link";
import {
  Droplets,
  MousePointer2,
  Rotate3D,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { HeroSection } from "@/components/sections/HeroSection";
import { IconBadge } from "@/components/sections/IconBadge";
import { IngredientsGrid } from "@/components/sections/IngredientsGrid";
import { ProductRange } from "@/components/sections/ProductRange";
import { RechargePreview } from "@/components/sections/RechargePreview";
import { Reveal } from "@/components/sections/Reveal";
import { RoutineSteps } from "@/components/sections/RoutineSteps";
import { SectionHeader } from "@/components/sections/SectionHeader";

const concerns = [
  { label: "ExcÃ¨s de sÃ©bum", icon: Droplets },
  { label: "Pores visibles", icon: ScanSearch },
  { label: "Imperfections", icon: Sparkles },
  { label: "Teint irrÃ©gulier", icon: ShieldCheck },
];

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductRange />
      <section className="section-padding bg-cream">
        <div className="container-shell space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Peau"
              title="PensÃ©e pour les peaux mixtes Ã  grasses"
              description="Une approche douce, ciblÃ©e et minimaliste des prÃ©occupations visibles."
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {concerns.map((concern, index) => (
              <Reveal delay={index * 0.06} key={concern.label}>
                <Card className="h-full p-6">
                  <IconBadge icon={concern.icon} label={concern.label} />
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <IngredientsGrid />
      <RoutineSteps />
      <section className="section-padding bg-cream">
        <div className="container-shell grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="image-soft-mask relative aspect-[5/4] overflow-hidden border border-border-soft bg-[radial-gradient(circle_at_50%_20%,rgba(255,248,236,0.98)_0%,rgba(234,220,198,0.84)_58%,rgba(221,232,200,0.82)_100%)]">
              <Image
                src="/assets/spiralis/experience-3d/spiralis_3d_illustration_transparent.webp"
                alt="RÃ©fÃ©rence multivue pour l'expÃ©rience 3D SPIRALIS"
                fill
                className="object-contain p-6 sm:p-8"
                sizes="(min-width: 1024px) 52vw, 100vw"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6">
            <SectionHeader
              align="left"
              eyebrow="3D"
              title="DÃ©couvrez la gamme en 3D"
              description="Explorez le packaging, les textures et les dÃ©tails de chaque produit grÃ¢ce Ã  une expÃ©rience 3D interactive."
            />
            <div className="flex flex-wrap gap-3">
              <IconBadge icon={Rotate3D} label="Tourner" />
              <IconBadge icon={ZoomIn} label="Zoomer" />
              <IconBadge icon={MousePointer2} label="Explorer" />
            </div>
            <Button asChild>
              <Link href="/experience-3d">Explorer en 3D</Link>
            </Button>
          </Reveal>
        </div>
      </section>
      <RechargePreview />
      <FinalCTA />
    </>
  );
}

