import Image from "next/image";
import { Droplets, Leaf, Sparkles } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/sections/Reveal";
import { RoutinePlanner } from "@/components/sections/RoutinePlanner";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/components/ui/card";

const steps = [
  ["Etape 1 - Nettoyer", "Gel Nettoyant Anti-Imperfections", Droplets],
  ["Etape 2 - Traiter", "Serum Anti-Imperfections", Sparkles],
  ["Etape 3 - Hydrater", "Creme Hydratante Anti-Imperfections", Leaf],
] as const;

const results = ["Peau plus nette", "Grain de peau affine", "Sensation de fraicheur", "Confort cutane"];

export default function RoutinePage() {
  return (
    <>
      <PageHero
        eyebrow="Routine anti-imperfections"
        title="Trois gestes pour une peau equilibree"
        subtitle="Une routine simple en trois gestes pour purifier, traiter et hydrater."
        image="/assets/spiralis/routine/hero.webp"
        primaryHref="/gamme"
        primaryLabel="Decouvrir la gamme"
        secondaryHref="/actifs"
        secondaryLabel="Voir les actifs"
        badges={["Nettoyer", "Traiter", "Hydrater"]}
        imagePosition="center right"
      />
      <section className="section-padding bg-pale-green/35">
        <div className="container-shell space-y-10">
          <Reveal>
            <SectionHeader title="Les trois etapes" />
          </Reveal>
          <Reveal>
            <div className="image-soft-mask relative aspect-[16/7] min-h-[280px]">
              <Image
                src="/assets/spiralis/routine/range-with-text-space.webp"
                alt="Gamme SPIRALIS avec espace de routine"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map(([label, product, Icon], index) => (
              <Reveal delay={index * 0.06} key={label}>
                <Card className="h-full p-6">
                  <Icon className="mb-6 h-7 w-7 text-deep-olive" strokeWidth={1.5} />
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-bamboo">{label}</p>
                  <h2 className="mt-3 font-heading text-3xl font-semibold text-deep-olive">
                    {product}
                  </h2>
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <RoutinePlanner />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((result, index) => (
              <Reveal delay={index * 0.06} key={result}>
                <Card className="p-5 text-center font-semibold text-deep-olive">{result}</Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
