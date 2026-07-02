import Image from "next/image";
import { Leaf, Package, Recycle, RefreshCcw } from "lucide-react";
import { IconBadge } from "@/components/sections/IconBadge";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/sections/Reveal";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/components/ui/card";

const benefits = [
  { label: "Moins de déchets", icon: Recycle },
  { label: "Pot réutilisable", icon: RefreshCcw },
  { label: "Geste simple", icon: Leaf },
  { label: "Packaging plus responsable", icon: Package },
];

const steps = [
  "Ouvrir le pot",
  "Retirer la recharge vide",
  "Insérer la nouvelle recharge",
  "Refermer et utiliser",
];

const impact = [
  {
    value: "Réutiliser",
    title: "Un pot qui dure",
    text: "Le contenant principal reste dans la routine et accueille une nouvelle recharge.",
  },
  {
    value: "Réduire",
    title: "Moins d'emballage",
    text: "La recharge limite les éléments superflus tout en gardant le geste simple.",
  },
  {
    value: "Rituel",
    title: "Un geste plus calme",
    text: "La routine reste propre, lisible et facile à répéter au quotidien.",
  },
];

export default function RechargePage() {
  return (
    <>
      <PageHero
        eyebrow="Recharge"
        title="Système rechargeable"
        subtitle="Réutilisez votre pot de crème hydratante grâce à une recharge pratique et responsable."
        image="/assets/spiralis/recharge/hero.webp"
        primaryHref="/produits/creme-hydratante"
        primaryLabel="Voir la crème"
        secondaryHref="/routine"
        secondaryLabel="Voir la routine"
        imagePosition="center right"
      >
        <div className="flex flex-wrap gap-3">
          {benefits.map((benefit) => (
            <IconBadge key={benefit.label} icon={benefit.icon} label={benefit.label} />
          ))}
        </div>
      </PageHero>
      <section className="section-padding bg-pale-green/35">
        <div className="container-shell space-y-10">
          <Reveal>
            <SectionHeader
              title="Quatre gestes simples"
              description="Un système pensé pour prolonger la durée de vie du pot."
            />
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <div className="image-soft-mask relative aspect-[4/5] min-h-[520px] lg:aspect-[5/4]">
                <Image
                  src="/assets/spiralis/recharge/refill-steps-tutorial.webp"
                  alt="Tutoriel de recharge SPIRALIS"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Card className="h-full p-4 sm:p-8">
                <div className="grid gap-4">
                  {steps.map((step, index) => (
                    <div
                      className="flex items-center gap-4 rounded-2xl border border-border-soft bg-cream px-4 py-4"
                      key={step}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-deep-olive text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                      <p className="font-semibold text-deep-olive">{step}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-shell space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Impact"
              title="Recharger, réutiliser, réduire"
              description="Une logique simple pour garder le plaisir du soin tout en limitant le gaspillage."
            />
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {impact.map((item, index) => (
              <Reveal delay={index * 0.06} key={item.title}>
                <Card className="premium-surface h-full p-5 sm:p-7">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-bamboo">
                    {item.value}
                  </p>
                  <h2 className="mt-4 font-heading text-3xl font-semibold text-deep-olive">
                    {item.title}
                  </h2>
                  <p className="mt-3 leading-7 text-text-dark/70">{item.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
