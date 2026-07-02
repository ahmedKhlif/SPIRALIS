"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article whileHover={{ y: -8 }} transition={{ duration: 0.3, ease: "easeOut" }} className="h-full">
      <Card className="premium-surface group flex h-full flex-col overflow-hidden p-4 sm:p-6">
        <Link
          href={product.href}
          aria-label={`Voir le detail de ${product.name}`}
          className="shine-hover group/image relative mb-4 flex aspect-[5/4] items-center justify-center overflow-hidden rounded-[18px] border border-border-soft/70 bg-[radial-gradient(circle_at_50%_24%,rgba(255,248,236,0.98)_0%,rgba(234,220,198,0.82)_60%,rgba(221,232,200,0.86)_100%)] p-4 transition duration-300 hover:shadow-card sm:mb-6 sm:aspect-[4/5] sm:rounded-[20px] sm:p-6"
        >
          <div className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-background/86 backdrop-blur">{product.step}</Badge>
              <Badge className="bg-background/72 backdrop-blur">{product.volume}</Badge>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-background/84 text-deep-olive shadow-sm backdrop-blur transition group-hover/image:scale-105 group-hover/image:bg-cream">
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} />
            </span>
          </div>
          <div className="absolute bottom-6 h-12 w-3/4 rounded-full bg-deep-olive/10 blur-2xl sm:bottom-8 sm:h-16" />
          <Image
            src={product.image}
            alt={product.name}
            width={420}
            height={520}
            className="relative h-[76%] w-auto object-contain drop-shadow-[0_22px_30px_rgba(23,58,42,0.18)] transition duration-500 group-hover/image:scale-[1.04] sm:h-[80%]"
          />
        </Link>
        <div className="flex flex-1 flex-col gap-3.5 sm:gap-4">
          <div className="space-y-1.5 sm:space-y-2">
            <h3 className="text-balance font-heading text-[clamp(1.6rem,7.2vw,2.25rem)] font-semibold leading-tight text-deep-olive">
              {product.name}
            </h3>
            <p className="text-[0.96rem] leading-6 text-text-dark/70 sm:text-sm sm:leading-7">
              {product.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {product.actives.map((active) => (
              <span
                key={active}
                className="rounded-full border border-border-soft bg-background/60 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.04em] text-deep-olive/72 sm:px-3 sm:text-xs sm:tracking-normal"
              >
                {active}
              </span>
            ))}
          </div>
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-1">
            <Button asChild variant="secondary" className="w-full sm:w-auto">
              <Link href={product.href}>Voir le detail</Link>
            </Button>
            <Link
              href={product.href}
              className="inline-flex min-w-0 items-center gap-2 text-sm font-semibold text-deep-olive transition hover:text-bamboo"
            >
              Decouvrir le soin
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.7} />
            </Link>
          </div>
        </div>
      </Card>
    </motion.article>
  );
}
