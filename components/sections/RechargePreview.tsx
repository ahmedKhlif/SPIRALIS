import Image from "next/image";
import Link from "next/link";
import { RefreshCcw, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/sections/Reveal";

export function RechargePreview() {
  return (
    <section className="section-padding bg-pale-green/40">
      <div className="container-shell grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        <Reveal>
          <div className="image-soft-mask relative aspect-[5/4]">
            <Image
              src="/assets/spiralis/recharge/hero.webp"
              alt="Recharge creme hydratante SPIRALIS"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 48vw, 100vw"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Card className="p-5 sm:p-10">
            <div className="mb-5 flex gap-3 sm:mb-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pale-green text-deep-olive sm:h-12 sm:w-12">
                <Recycle className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-soft-beige text-deep-olive sm:h-12 sm:w-12">
                <RefreshCcw className="h-5 w-5" strokeWidth={1.5} />
              </span>
            </div>
            <h2 className="text-balance font-heading text-[clamp(1.9rem,8vw,3rem)] font-semibold leading-tight text-deep-olive">
              Un geste plus responsable
            </h2>
            <p className="mt-4 text-[0.98rem] leading-6 text-text-dark/70 sm:mt-5 sm:leading-8">
              Le pot de creme hydratante est pense pour etre reutilise grace a une recharge pratique.
            </p>
            <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-border-soft bg-cream px-4 py-3 text-sm font-semibold text-deep-olive">
                Pot reutilisable
              </div>
              <div className="rounded-2xl border border-border-soft bg-cream px-4 py-3 text-sm font-semibold text-deep-olive">
                Moins de dechets
              </div>
            </div>
            <Button asChild className="mt-6 w-full sm:mt-8 sm:w-fit">
              <Link href="/recharge">Decouvrir la recharge</Link>
            </Button>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
