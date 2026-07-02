import Image from "next/image";
import { FlaskConical, ShieldCheck, Sprout } from "lucide-react";
import { keyActives } from "@/lib/products";
import { Card } from "@/components/ui/card";
import { IconBadge } from "@/components/sections/IconBadge";
import { Reveal } from "@/components/sections/Reveal";
import { SectionHeader } from "@/components/sections/SectionHeader";

const icons = [Sprout, FlaskConical, ShieldCheck];

export function IngredientsGrid() {
  return (
    <section className="section-padding bg-pale-green/45">
      <div className="container-shell grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <Reveal className="space-y-6 sm:space-y-8">
          <SectionHeader
            align="left"
            eyebrow="Actifs"
            title="Trois actifs cles"
            description="Une association ciblee pour accompagner l'equilibre des peaux mixtes a grasses."
          />
          <div className="grid gap-4">
            {keyActives.map((active, index) => (
              <Card className="p-4 sm:p-5" key={active.name}>
                <IconBadge icon={icons[index]} label={active.name} />
                <p className="mt-3 text-[0.98rem] leading-6 text-text-dark/70 sm:mt-4 sm:leading-7">
                  {active.description}
                </p>
              </Card>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="image-soft-mask relative aspect-[4/5]">
            <Image
              src="/assets/spiralis/actifs/hero.webp"
              alt="Actifs botaniques SPIRALIS"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 48vw, 100vw"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
