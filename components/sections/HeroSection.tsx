import { Droplets, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { IconBadge } from "@/components/sections/IconBadge";
import { PageHero } from "@/components/sections/PageHero";

export function HeroSection() {
  return (
    <PageHero
      eyebrow="Routine botanique anti-imperfections"
      title="La routine naturelle des peaux mixtes a grasses"
      subtitle="Une gamme anti-imperfections pensee pour purifier, equilibrer et hydrater la peau en douceur."
      image="/assets/spiralis/home/hero-desktop.webp"
      mobileImage="/assets/spiralis/home/hero-mobile.webp"
      primaryHref="/gamme"
      primaryLabel="Decouvrir la gamme"
      secondaryHref="/routine"
      secondaryLabel="Voir la routine"
      imagePosition="center right"
    >
      <div className="grid max-w-[22rem] grid-cols-2 gap-2.5 sm:flex sm:max-w-none sm:flex-wrap sm:gap-3">
        <IconBadge icon={Droplets} label="Purifier" />
        <IconBadge icon={Sparkles} label="Equilibrer" />
        <IconBadge icon={ShieldCheck} label="Hydrater" />
        <IconBadge icon={Leaf} label="Naturel" />
      </div>
    </PageHero>
  );
}
