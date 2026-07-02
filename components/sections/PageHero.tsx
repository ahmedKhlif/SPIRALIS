"use client";

import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/components/layout/I18nProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  image: string;
  mobileImage?: string;
  imageBackgroundClassName?: string;
  imageClassName?: string;
  mobileImageClassName?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  badges?: string[];
  imagePosition?: string;
  children?: React.ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  mobileImage,
  imageBackgroundClassName,
  imageClassName,
  mobileImageClassName,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  badges = [],
  imagePosition = "center",
  children,
}: PageHeroProps) {
  const { language } = useI18n();
  const isRtl = language === "ar";
  const mirroredImagePosition = isRtl
    ? imagePosition.replaceAll("right", "__right__").replaceAll("left", "right").replaceAll("__right__", "left")
    : imagePosition;
  const heroGradient = `linear-gradient(${isRtl ? "270deg" : "90deg"}, var(--background) 0%, var(--background) 48%, color-mix(in srgb, var(--background) 68%, transparent) 68%, color-mix(in srgb, var(--background) 16%, transparent) 86%, transparent 100%)`;
  const mobileGradient =
    "linear-gradient(180deg, color-mix(in srgb, var(--background) 98%, transparent) 0%, color-mix(in srgb, var(--background) 94%, transparent) 32%, color-mix(in srgb, var(--background) 84%, transparent) 58%, color-mix(in srgb, var(--background) 64%, transparent) 76%, transparent 100%)";

  return (
    <section
      className="relative isolate flex min-h-[34rem] overflow-hidden border-b border-border-soft sm:min-h-[560px] lg:min-h-[610px]"
      dir="ltr"
    >
      {imageBackgroundClassName ? <div className={cn("absolute inset-0", imageBackgroundClassName)} /> : null}
      {mobileImage ? (
        <Image
          src={mobileImage}
          alt=""
          fill
          priority
          className={cn("object-cover md:hidden", mobileImageClassName)}
          sizes="100vw"
          style={{ objectPosition: mirroredImagePosition }}
        />
      ) : null}
      <Image
        src={image}
        alt=""
        fill
        priority
        className={cn("object-cover", mobileImage && "hidden md:block", imageClassName)}
        sizes="100vw"
        style={{ objectPosition: mirroredImagePosition }}
      />
      <div className="absolute inset-0 hidden md:block" style={{ background: heroGradient }} />
      <div className="absolute inset-0 md:hidden" style={{ background: mobileGradient }} />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
      <div
        className={cn(
          "container-shell relative z-10 flex items-end py-7 sm:items-center sm:py-14",
          isRtl && "justify-end",
        )}
      >
        <div
          className={cn("w-full max-w-[560px] space-y-3.5 sm:space-y-6", isRtl && "text-right")}
          dir={isRtl ? "rtl" : "ltr"}
        >
          {eyebrow ? (
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-deep-olive/78 sm:text-sm sm:tracking-[0.18em]">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="max-w-full text-balance font-heading text-[clamp(2.15rem,10.8vw,3.3rem)] font-semibold leading-[0.96] text-deep-olive sm:text-[clamp(2.8rem,9vw,4.2rem)] lg:text-7xl">
            {title}
          </h1>
          <p className="max-w-xl text-[0.98rem] leading-6 text-text-dark/80 sm:text-lg sm:leading-8">{subtitle}</p>
          {badges.length ? (
            <div className={cn("grid max-w-[22rem] grid-cols-2 gap-2 sm:flex sm:max-w-none sm:flex-wrap sm:gap-3", isRtl && "sm:justify-end")}>
              {badges.map((badge) => (
                <Badge className="bg-cream/72 backdrop-blur" key={badge}>
                  {badge}
                </Badge>
              ))}
            </div>
          ) : null}
          {children ? (
            <div className={cn("space-y-3.5 sm:space-y-6", isRtl && "[&>div]:justify-end")}>{children}</div>
          ) : null}
          {(primaryHref && primaryLabel) || (secondaryHref && secondaryLabel) ? (
            <div className={cn("flex flex-col gap-2.5 min-[420px]:flex-row min-[420px]:flex-wrap sm:gap-3", isRtl && "min-[420px]:flex-row-reverse")}>
              {primaryHref && primaryLabel ? (
                <Button asChild>
                  <Link href={primaryHref}>
                    {primaryLabel}
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </Link>
                </Button>
              ) : null}
              {secondaryHref && secondaryLabel ? (
                <Button asChild variant="secondary">
                  <Link href={secondaryHref}>{secondaryLabel}</Link>
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
