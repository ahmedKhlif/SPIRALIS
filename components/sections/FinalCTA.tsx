import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/sections/Reveal";

export function FinalCTA() {
  return (
    <section className="section-padding">
      <div className="container-shell">
        <Reveal>
          <div className="relative min-h-[320px] overflow-hidden rounded-[22px] border border-border-soft bg-deep-olive text-white shadow-soft sm:min-h-[420px] sm:rounded-[32px]">
            <Image
              src="/assets/spiralis/home/cta-clean-space.webp"
              alt="Espace clean skincare SPIRALIS"
              fill
              className="object-cover opacity-72"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-olive/92 via-deep-olive/70 to-deep-olive/16 sm:bg-gradient-to-r sm:from-deep-olive/84 sm:via-deep-olive/36 sm:to-transparent" />
            <div className="relative flex min-h-[320px] max-w-2xl flex-col justify-end p-5 sm:min-h-[420px] sm:p-12">
              <h2 className="text-balance font-heading text-[clamp(1.9rem,8vw,3.75rem)] font-semibold leading-[1.02] sm:leading-tight">
                Une routine naturelle, minimaliste et ciblee pour accompagner l&apos;equilibre de votre peau.
              </h2>
              <p className="mt-3 max-w-xl text-[0.98rem] leading-6 text-white/78 sm:mt-5 sm:text-lg sm:leading-8">
                Passez de la decouverte des produits a une routine plus claire, plus douce et plus facile a suivre.
              </p>
              <Button asChild className="mt-6 w-full sm:mt-8 sm:w-fit" variant="cream">
                <Link href="/contact">
                  Nous contacter
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
