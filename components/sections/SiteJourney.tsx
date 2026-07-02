"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  FlaskConical,
  Leaf,
  Recycle,
  Sparkles,
  Stars,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getPageContext } from "@/lib/navigation";

const journey = [
  {
    title: "Comprendre la gamme",
    text: "Voir les trois soins et leur role dans la routine.",
    href: "/gamme",
    icon: Sparkles,
  },
  {
    title: "Construire la routine",
    text: "Nettoyer, traiter, hydrater dans le bon ordre.",
    href: "/routine",
    icon: Leaf,
  },
  {
    title: "Explorer les actifs",
    text: "Spiruline, niacinamide et Zinc PCA en detail.",
    href: "/actifs",
    icon: FlaskConical,
  },
  {
    title: "Decouvrir la recharge",
    text: "Reutiliser le pot et reduire les dechets.",
    href: "/recharge",
    icon: Recycle,
  },
];

export function SiteJourney() {
  const pathname = usePathname();
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
  const pageContext = getPageContext(pathname, searchParams);

  useEffect(() => {
    const syncSearch = () => setSearchParams(new URLSearchParams(window.location.search));
    syncSearch();
    window.addEventListener("popstate", syncSearch);
    window.addEventListener("locationchange", syncSearch);
    return () => {
      window.removeEventListener("popstate", syncSearch);
      window.removeEventListener("locationchange", syncSearch);
    };
  }, []);

  const journeyCards = journey
    .filter((item) => item.href !== pathname)
    .sort((left, right) => {
      if (left.href === pageContext.nextHref) {
        return -1;
      }
      if (right.href === pageContext.nextHref) {
        return 1;
      }
      return 0;
    });

  return (
    <section className="border-t border-border-soft bg-cream/55 py-10">
      <div className="container-shell">
        <div className="mb-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-bamboo">
              Parcours SPIRALIS
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold text-deep-olive">
              Continuez depuis {pageContext.label}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-text-dark/65">
              {pageContext.summary}
            </p>
          </div>
          <Link
            href={pageContext.nextHref}
            className="group rounded-[22px] border border-border-soft bg-background px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-card"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pale-green text-deep-olive">
                <Stars className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-bamboo">
                  Prochaine etape
                </p>
                <p className="mt-1 font-semibold text-deep-olive">{pageContext.nextLabel}</p>
                <p className="mt-1 text-sm leading-6 text-text-dark/65">{pageContext.nextPrompt}</p>
              </div>
              <ArrowRight
                className="ml-auto mt-1 h-4 w-4 shrink-0 text-deep-olive transition group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </div>
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {journeyCards.map((item) => {
            const featured = item.href === pageContext.nextHref;

            return (
              <Link href={item.href} key={item.href} className="group block">
                <Card
                  className={cn(
                    "h-full p-5 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-soft",
                    featured && "border-deep-olive/18 bg-pale-green/40",
                  )}
                >
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-full bg-pale-green text-deep-olive",
                        featured && "bg-deep-olive text-white",
                      )}
                    >
                      <item.icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    {featured ? (
                      <span className="rounded-full border border-deep-olive/12 bg-background px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-deep-olive/72">
                        Recommande
                      </span>
                    ) : null}
                  </div>
                  <h3 className="font-heading text-2xl font-semibold text-deep-olive">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-text-dark/68">{item.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-deep-olive">
                    Aller a la page
                    <ArrowRight
                      className="h-4 w-4 transition group-hover:translate-x-1"
                      strokeWidth={1.5}
                    />
                  </span>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
