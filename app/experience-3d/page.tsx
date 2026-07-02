import Script from "next/script";
import { CheckCircle2 } from "lucide-react";
import { ProductModelTabs } from "@/components/three/ProductModelTabs";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/sections/Reveal";
import { Card } from "@/components/ui/card";

const studioHighlights = [
  "Quatre soins a explorer en 3D",
  "Rotation douce, zoom libre et cadrage automatique",
  "Une lecture claire des volumes et des details",
];

export default function Experience3DPage() {
  return (
    <>
      <Script
        id="google-model-viewer"
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        strategy="afterInteractive"
        type="module"
      />

      <PageHero
        eyebrow="Experience 3D"
        title="Explorez les produits sous tous les angles"
        subtitle="Un studio interactif pour manipuler les vrais modeles GLB SPIRALIS, comparer les volumes et inspecter les details de chaque soin."
        image="/assets/spiralis/experience-3d/spiralis_3d_illustration_transparent.webp"
        mobileImage="/assets/spiralis/experience-3d/spiralis_3d_illustration_transparent.webp"
        imageBackgroundClassName="bg-[radial-gradient(circle_at_78%_24%,rgba(255,248,236,0.98)_0%,rgba(234,220,198,0.84)_52%,rgba(221,232,200,0.88)_100%)]"
        imageClassName="object-contain px-6 pb-8 pt-20 md:px-12 md:pb-10 md:pt-24"
        mobileImageClassName="object-contain px-4 pb-8 pt-16"
        primaryHref="#viewer"
        primaryLabel="Ouvrir le viewer"
        secondaryHref="/gamme"
        secondaryLabel="Voir la gamme"
        badges={["GLB live", "Rotation auto", "Zoom libre"]}
        imagePosition="center right"
      />
      <section className="section-padding bg-pale-green/35">
        <div className="container-shell space-y-10">
          <Reveal>
            <div className="grid gap-5 md:grid-cols-3">
              {studioHighlights.map((item, index) => (
                <Card className="premium-surface p-5" key={item}>
                  <CheckCircle2 className="mb-4 h-5 w-5 text-sage" strokeWidth={1.5} />
                  <p className="text-sm font-semibold leading-7 text-deep-olive">{item}</p>
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-bamboo">
                    0{index + 1}
                  </p>
                </Card>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div id="viewer" className="scroll-mt-28 sm:scroll-mt-36">
              <ProductModelTabs />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
