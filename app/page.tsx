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
  { label: "Excès de sébum", icon: Droplets },
  { label: "Pores visibles", icon: ScanSearch },
  { label: "Imperfections", icon: Sparkles },
  { label: "Teint irrégulier", icon: ShieldCheck },
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
              title="Pensée pour les peaux mixtes à grasses"
              description="Une approche douce, ciblée et minimaliste des préoccupations visibles."
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
            <div className="image-soft-mask relative aspect-[5/4]">
              <Image
                src="/assets/spiralis/experience-3d/multiview-reference.webp"
                alt="Référence multivue pour l'expérience 3D SPIRALIS"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 52vw, 100vw"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6">
            <SectionHeader
              align="left"
              eyebrow="3D"
              title="Découvrez la gamme en 3D"
              description="Explorez le packaging, les textures et les détails de chaque produit grâce à une expérience 3D interactive."
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
