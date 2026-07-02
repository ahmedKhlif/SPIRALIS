import Image from "next/image";
import { ProductBenefits } from "@/components/product/ProductBenefits";
import { ProductHero } from "@/components/product/ProductHero";
import { ProductTexture } from "@/components/product/ProductTexture";
import { Reveal } from "@/components/sections/Reveal";
import { Card } from "@/components/ui/card";
import { products } from "@/lib/products";

const product = products[1];

export default function SerumPage() {
  return (
    <>
      <ProductHero
        title={product.name}
        subtitle="Un soin leger pour cibler les imperfections, les pores visibles et le grain de peau."
        heroImage="/assets/spiralis/serum/hero.webp"
        volume={product.volume}
        step={product.step}
      />
      <ProductBenefits
        benefits={[
          "Aide a affiner le grain de peau",
          "Cible les imperfections",
          "Aide a equilibrer les peaux mixtes a grasses",
          "Texture legere et non collante",
        ]}
      />
      <ProductTexture
        image="/assets/spiralis/serum/texture.webp"
        title="Texture legere"
        text="Apres le gel nettoyant, avant la creme hydratante."
      />
      <section className="section-padding">
        <div className="container-shell grid items-center gap-10 lg:grid-cols-2">
          <Reveal delay={0.1}>
            <Card className="p-5 sm:p-10">
              <h2 className="text-balance font-heading text-[clamp(2.1rem,9vw,2.5rem)] font-semibold text-deep-olive">
                Conseils d&apos;utilisation
              </h2>
              <ol className="mt-6 grid gap-3 text-text-dark/72">
                {[
                  "Appliquer apres le gel nettoyant.",
                  "Deposer quelques gouttes sur peau propre.",
                  "Cibler les zones visibles.",
                  "Utiliser avant la creme hydratante.",
                ].map((item) => (
                  <li key={item} className="rounded-2xl border border-border-soft bg-cream px-4 py-3">
                    {item}
                  </li>
                ))}
              </ol>
            </Card>
          </Reveal>
          <Reveal>
            <div className="image-soft-mask relative aspect-[5/4]">
              <Image
                src="/assets/spiralis/serum/application.webp"
                alt="Application du serum SPIRALIS"
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
