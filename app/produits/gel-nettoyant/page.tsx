import Image from "next/image";
import { ProductBenefits } from "@/components/product/ProductBenefits";
import { ProductHero } from "@/components/product/ProductHero";
import { ProductTexture } from "@/components/product/ProductTexture";
import { Reveal } from "@/components/sections/Reveal";
import { Card } from "@/components/ui/card";
import { products } from "@/lib/products";

const product = products[0];

export default function GelNettoyantPage() {
  return (
    <>
      <ProductHero
        title={product.name}
        subtitle="Purifie, nettoie et aide a reduire l'apparence des imperfections sans dessecher."
        heroImage="/assets/spiralis/gel/hero.webp"
        volume={product.volume}
        step={product.step}
      />
      <ProductBenefits
        benefits={[
          "Nettoie en douceur",
          "Aide a desincruster les pores",
          "Aide a reduire l'exces de sebum",
          "Sensation fraiche et propre",
        ]}
      />
      <ProductTexture
        image="/assets/spiralis/gel/texture.webp"
        title="Texture gel fraiche"
        text="Une texture gel fraiche, legere et facile a rincer."
      />
      <section className="section-padding">
        <div className="container-shell grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <Card className="p-5 sm:p-10">
              <h2 className="text-balance font-heading text-[clamp(2.1rem,9vw,2.5rem)] font-semibold text-deep-olive">
                Conseils d&apos;utilisation
              </h2>
              <ol className="mt-6 grid gap-3 text-text-dark/72">
                {[
                  "Appliquer sur peau humide.",
                  "Masser delicatement le visage.",
                  "Rincer a l'eau claire.",
                  "Utiliser matin et soir.",
                ].map((item) => (
                  <li key={item} className="rounded-2xl border border-border-soft bg-cream px-4 py-3">
                    {item}
                  </li>
                ))}
              </ol>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="image-soft-mask relative aspect-[5/4]">
              <Image
                src="/assets/spiralis/gel/foam-application.webp"
                alt="Mousse du gel nettoyant SPIRALIS"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
