import Image from "next/image";
import Link from "next/link";
import { CircleCheck, Droplets, Leaf, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/sections/Reveal";
import { SectionHeader } from "@/components/sections/SectionHeader";

const steps = [
  {
    icon: Droplets,
    title: "Nettoyer",
    text: "Gel Nettoyant Anti-Imperfections",
  },
  {
    icon: Sparkles,
    title: "Traiter",
    text: "Sérum Anti-Imperfections",
  },
  {
    icon: Leaf,
    title: "Hydrater",
    text: "Crème Hydratante Anti-Imperfections",
  },
];

export function RoutineSteps() {
  return (
    <section className="section-padding">
      <div className="container-shell grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
        <Reveal className="space-y-8">
          <SectionHeader
            align="left"
            eyebrow="Routine"
            title="Une routine simple en 3 étapes"
            description="Un rituel lisible, ciblé et doux pour purifier sans surcharger."
          />
          <div className="grid gap-4">
            {steps.map((step, index) => (
              <Card className="flex items-center gap-5 p-5" key={step.title}>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pale-green text-deep-olive">
                  <step.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-bamboo">
                    Étape {index + 1}
                  </p>
                  <h3 className="font-heading text-2xl font-semibold text-deep-olive">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-dark/70">{step.text}</p>
                </div>
                <CircleCheck className="ml-auto hidden h-5 w-5 text-sage sm:block" strokeWidth={1.5} />
              </Card>
            ))}
          </div>
          <Button asChild variant="secondary">
            <Link href="/routine">Voir la routine</Link>
          </Button>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="image-soft-mask relative aspect-[4/5]">
            <Image
              src="/assets/spiralis/routine/hero.webp"
              alt="Routine SPIRALIS en trois soins"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
