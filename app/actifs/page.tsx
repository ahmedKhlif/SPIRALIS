import Image from "next/image";
import { FlaskConical, ShieldCheck, Sprout } from "lucide-react";
import { IconBadge } from "@/components/sections/IconBadge";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/sections/Reveal";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/components/ui/card";

const actives = [
  {
    name: "Spiruline",
    text: "Associée à une action purifiante et revitalisante.",
    icon: Sprout,
  },
  {
    name: "Niacinamide",
    text: "Aide à améliorer l’apparence des pores, du teint et des imperfections.",
    icon: FlaskConical,
  },
  {
    name: "Zinc PCA",
    text: "Aide à réguler l’excès de sébum.",
    icon: ShieldCheck,
  },
];

export default function ActifsPage() {
  return (
    <>
      <PageHero
        eyebrow="Actifs clés"
        title="Spiruline. Niacinamide. Zinc PCA."
        subtitle="Une association ciblée d’actifs pour accompagner l’équilibre des peaux mixtes à grasses."
        image="/assets/spiralis/actifs/hero.webp"
        primaryHref="/gamme"
        primaryLabel="Découvrir la gamme"
        secondaryHref="/routine"
        secondaryLabel="Voir la routine"
        badges={["Purifier", "Équilibrer", "Affiner le grain de peau"]}
        imagePosition="center right"
      />
      <section className="section-padding bg-pale-green/35">
        <div className="container-shell space-y-10">
          <Reveal>
            <SectionHeader title="Une association ciblée" />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {actives.map((active, index) => (
              <Reveal delay={index * 0.06} key={active.name}>
                <Card className="h-full p-6">
                  <IconBadge icon={active.icon} label={active.name} />
                  <p className="mt-5 leading-8 text-text-dark/70">{active.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="image-soft-mask relative aspect-[5/4]">
                <Image src="/assets/spiralis/actifs/textures.webp" alt="Textures actives SPIRALIS" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="image-soft-mask relative aspect-[5/4]">
                <Image src="/assets/spiralis/actifs/serum-ingredients.webp" alt="Ingrédients du sérum SPIRALIS" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
