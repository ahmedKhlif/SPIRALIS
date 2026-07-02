import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Recycle } from "lucide-react";
import { products, refill } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/sections/Reveal";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ProductRange() {
  return (
    <section className="section-padding">
      <div className="container-shell space-y-12">
        <Reveal>
          <SectionHeader
            eyebrow="Gamme"
            title="Notre gamme anti-imperfections"
            description="Trois soins complémentaires pour nettoyer, traiter et hydrater les peaux mixtes à grasses."
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product, index) => (
            <Reveal delay={index * 0.08} key={product.slug}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="image-soft-mask relative mb-10 aspect-[16/7] min-h-[280px]">
            <Image
              src="/assets/spiralis/home/full-range-lifestyle.webp"
              alt="Gamme lifestyle SPIRALIS"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </Reveal>
        <Reveal>
          <Card className="grid items-center gap-5 overflow-hidden p-4 sm:p-6 md:grid-cols-[0.84fr_1.16fr_auto] md:gap-8">
            <Link
              href={refill.href}
              aria-label={`Voir le detail de ${refill.name}`}
              className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-[20px] border border-border-soft bg-[radial-gradient(circle_at_50%_24%,rgba(255,248,236,0.98)_0%,rgba(234,220,198,0.82)_60%,rgba(221,232,200,0.86)_100%)] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-card sm:p-7 md:aspect-[4/3]"
            >
              <div className="pointer-events-none absolute inset-x-5 top-5 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-background/84 px-3 py-1 text-xs font-semibold text-deep-olive backdrop-blur">
                  <Recycle className="h-4 w-4" strokeWidth={1.5} />
                  Recharge
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-background/84 text-deep-olive shadow-sm backdrop-blur transition group-hover:scale-105 group-hover:bg-cream">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} />
                </span>
              </div>
              <Image
                src={refill.image}
                alt={refill.name}
                width={360}
                height={420}
                className="h-[78%] w-auto object-contain drop-shadow-[0_22px_30px_rgba(23,58,42,0.18)] transition duration-300 group-hover:scale-[1.03]"
              />
            </Link>
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-cream px-3 py-1 text-sm font-semibold text-deep-olive">
                <Recycle className="h-4 w-4" strokeWidth={1.5} />
                Système rechargeable
              </div>
              <h3 className="text-balance font-heading text-[clamp(1.85rem,8vw,2.25rem)] font-semibold text-deep-olive">
                Recharge crème hydratante
              </h3>
              <p className="leading-7 text-text-dark/70">
                Un système pensé pour réutiliser le pot et rendre la routine plus responsable.
              </p>
            </div>
            <Button asChild variant="secondary">
              <Link href="/recharge">Découvrir</Link>
            </Button>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
