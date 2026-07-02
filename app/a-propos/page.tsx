import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/sections/Reveal";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/components/ui/card";

const sections = [
  {
    title: "Mission",
    text: "Proposer une routine simple, douce et efficace pour les peaux mixtes à grasses.",
  },
  {
    title: "Inspiration naturelle",
    text: "Une identité visuelle inspirée des textures végétales, du bambou et de la fraîcheur botanique.",
  },
  {
    title: "Philosophie packaging",
    text: "Flacons verts transparents, finitions bambou et étiquettes crème pour une identité naturelle et premium.",
  },
  {
    title: "Vision responsable",
    text: "Un système rechargeable pensé pour prolonger la durée de vie du pot et réduire les déchets.",
  },
];

export default function AProposPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="Une routine inspirée de la nature"
        subtitle="SPIRALIS associe inspiration botanique, actifs ciblés et design responsable."
        image="/assets/spiralis/about/hero.webp"
        primaryHref="/gamme"
        primaryLabel="Découvrir la gamme"
        secondaryHref="/contact"
        secondaryLabel="Nous contacter"
        badges={["Botanique", "Minimaliste", "Responsable"]}
        imagePosition="center right"
      />
      <section className="section-padding bg-pale-green/35">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="image-soft-mask relative aspect-[4/5]">
              <Image
                src="/assets/spiralis/home/full-range-lifestyle.webp"
                alt="Gamme lifestyle SPIRALIS"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6">
            <SectionHeader align="left" title="Notre approche" />
            <div className="grid gap-4">
              {sections.map((section) => (
                <Card className="p-6" key={section.title}>
                  <h2 className="font-heading text-3xl font-semibold text-deep-olive">
                    {section.title}
                  </h2>
                  <p className="mt-2 leading-7 text-text-dark/70">{section.text}</p>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
