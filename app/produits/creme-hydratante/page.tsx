import Image from "next/image";
import { ProductBenefits } from "@/components/product/ProductBenefits";
import { ProductHero } from "@/components/product/ProductHero";
import { ProductTexture } from "@/components/product/ProductTexture";
import { Reveal } from "@/components/sections/Reveal";
import { Card } from "@/components/ui/card";
import { products } from "@/lib/products";

const product = products[2];

export default function CremeHydratantePage() {
  return (
    <>
      <ProductHero
        title={product.name}
        subtitle="Hydrate, apaise et aide a maintenir l'equilibre cutane sans fini gras."
        heroImage="/assets/spiralis/cream/hero.webp"
        volume={product.volume}
        step={product.step}
      />
      <ProductBenefits
        benefits={[
          "Hydrate sans alourdir",
          "Aide a renforcer le confort cutane",
          "Fini doux et equilibre",
          "Compatible avec la recharge",
        ]}
      />
      <ProductTexture
        image="/assets/spiralis/cream/texture.webp"
        title="Confort leger"
        text="Une creme hydratante legere qui apporte confort et douceur sans fini gras."
      />
      <section className="section-padding">
        <div className="container-shell grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <Card className="p-5 sm:p-10">
              <h2 className="text-balance font-heading text-[clamp(2.1rem,9vw,2.5rem)] font-semibold text-deep-olive">
                Utilisation
              </h2>
              <ol className="mt-6 grid gap-3 text-text-dark/72">
                {[
                  "Appliquer une petite quantite sur peau propre.",
                  "Utiliser apres le serum.",
                  "Masser jusqu'a absorption.",
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
                src="/assets/spiralis/cream/texture-application.webp"
                alt="Application de la creme hydratante SPIRALIS"
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
