"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Droplets,
  Leaf,
  Moon,
  Sparkles,
  SunMedium,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";

type RoutineMoment = "matin" | "soir";

const productBySlug = Object.fromEntries(products.map((product) => [product.slug, product])) as Record<
  string,
  (typeof products)[number]
>;

const routineMoments = {
  matin: {
    label: "Routine matin",
    icon: SunMedium,
    eyebrow: "Reveil frais",
    title: "Preparer la peau sans l'alourdir",
    summary:
      "Une sequence courte pour nettoyer, equilibrer et garder une sensation de confort avant la journee.",
    time: "3 min",
    rhythm: "Texture legere",
    finish: "Fini frais",
    steps: [
      {
        slug: "gel-nettoyant",
        icon: Droplets,
        productLabel: "Gel Nettoyant",
        action: "Nettoyer doucement",
        detail: "Masser sur peau humide pour retirer l'exces de sebum et les impuretes de la nuit.",
      },
      {
        slug: "serum",
        icon: Sparkles,
        productLabel: "Serum",
        action: "Cibler les imperfections",
        detail: "Appliquer quelques gouttes sur les zones concernees, puis laisser absorber.",
      },
      {
        slug: "creme-hydratante",
        icon: Leaf,
        productLabel: "Creme Hydratante",
        action: "Hydrater legerement",
        detail: "Sceller la routine avec une fine couche, sans effet gras.",
      },
    ],
  },
  soir: {
    label: "Routine soir",
    icon: Moon,
    eyebrow: "Reset du soir",
    title: "Purifier puis reparer le confort cutane",
    summary:
      "Le soir, on prend un peu plus de temps pour decongestionner la peau et renforcer l'hydratation.",
    time: "5 min",
    rhythm: "Massage lent",
    finish: "Peau souple",
    steps: [
      {
        slug: "gel-nettoyant",
        icon: Droplets,
        productLabel: "Gel Nettoyant",
        action: "Nettoyer en profondeur",
        detail: "Faire mousser plus longtemps pour liberer la peau des residus de la journee.",
      },
      {
        slug: "serum",
        icon: Sparkles,
        productLabel: "Serum",
        action: "Traiter avec precision",
        detail: "Tapoter sur les imperfections visibles et les zones a pores dilates.",
      },
      {
        slug: "creme-hydratante",
        icon: Leaf,
        productLabel: "Creme Hydratante",
        action: "Apaiser et hydrater",
        detail: "Appliquer une couche confortable pour aider la peau a retrouver son equilibre.",
      },
    ],
  },
} satisfies Record<RoutineMoment, {
  label: string;
  icon: typeof SunMedium;
  eyebrow: string;
  title: string;
  summary: string;
  time: string;
  rhythm: string;
  finish: string;
  steps: {
    slug: string;
    icon: typeof Droplets;
    productLabel: string;
    action: string;
    detail: string;
  }[];
}>;

function readMomentFromLocation(): RoutineMoment | null {
  if (typeof window === "undefined") {
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  const moment = params.get("moment");

  if (moment === "matin" || moment === "soir") {
    return moment;
  }

  if (window.location.hash.includes("soir")) {
    return "soir";
  }

  if (window.location.hash.includes("matin")) {
    return "matin";
  }

  return null;
}

export function RoutinePlanner() {
  const [activeMoment, setActiveMoment] = useState<RoutineMoment>("matin");
  const activeRoutine = routineMoments[activeMoment];

  const featuredImages = useMemo(
    () => activeRoutine.steps.map((step) => productBySlug[step.slug]).filter(Boolean),
    [activeRoutine.steps],
  );

  useEffect(() => {
    const syncMoment = () => {
      const nextMoment = readMomentFromLocation();
      if (nextMoment) {
        setActiveMoment(nextMoment);
      }
    };

    syncMoment();
    window.addEventListener("hashchange", syncMoment);
    window.addEventListener("popstate", syncMoment);

    return () => {
      window.removeEventListener("hashchange", syncMoment);
      window.removeEventListener("popstate", syncMoment);
    };
  }, []);

  const handleMomentChange = (value: string) => {
    if (value !== "matin" && value !== "soir") {
      return;
    }

    setActiveMoment(value);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("moment", value);
      url.hash = "routine-planner";
      window.history.replaceState(null, "", url);
    }
  };

  return (
    <Tabs
      id="routine-planner"
      value={activeMoment}
      onValueChange={handleMomentChange}
      className="rounded-[22px] border border-border-soft bg-cream p-3 shadow-card sm:rounded-[28px] sm:p-6"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-bamboo">
            Choisir le moment
          </p>
          <h2 className="text-balance font-heading text-[clamp(1.8rem,8vw,2.5rem)] font-semibold text-deep-olive">
            Routine matin ou soir
          </h2>
        </div>
        <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-background p-1.5 sm:w-auto sm:min-w-[360px]">
          {(["matin", "soir"] as const).map((moment) => {
            const momentConfig = routineMoments[moment];
            const MomentIcon = momentConfig.icon;

            return (
              <TabsTrigger
                key={moment}
                value={moment}
                className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-2 text-center text-sm sm:min-h-12 sm:gap-2 sm:px-3"
              >
                <MomentIcon className="h-4 w-4" strokeWidth={1.5} />
                {momentConfig.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>

      {(["matin", "soir"] as const).map((moment) => {
        const routine = routineMoments[moment];
        const RoutineIcon = routine.icon;

        return (
          <TabsContent key={moment} value={moment} id={`routine-${moment}`}>
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="premium-surface rounded-[20px] border border-border-soft bg-background p-4 sm:rounded-[24px] sm:p-6">
                <div className="relative z-10 space-y-5 sm:space-y-6">
                  <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-pale-green/60 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-deep-olive">
                      <RoutineIcon className="h-4 w-4" strokeWidth={1.5} />
                      {routine.eyebrow}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-cream px-3 py-1.5 text-sm font-semibold text-deep-olive">
                      <Clock3 className="h-4 w-4" strokeWidth={1.5} />
                      {routine.time}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-balance font-heading text-[clamp(1.8rem,8vw,2.5rem)] font-semibold leading-tight text-deep-olive">
                      {routine.title}
                    </h3>
                    <p className="mt-3 text-[0.98rem] leading-6 text-text-dark/72 sm:mt-4 sm:text-base sm:leading-7">{routine.summary}</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[routine.rhythm, routine.finish].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-2xl border border-border-soft bg-cream/70 px-4 py-3"
                      >
                        <CheckCircle2 className="h-5 w-5 text-sage" strokeWidth={1.5} />
                        <span className="text-sm font-semibold text-deep-olive">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="relative h-32 overflow-hidden rounded-[18px] border border-border-soft bg-pale-green/25 sm:h-48 sm:rounded-[22px]">
                    {featuredImages.map((product, index) => (
                      <Image
                        key={`${moment}-${product.slug}`}
                        src={product.image}
                        alt={routine.steps[index]?.productLabel ?? "Produit SPIRALIS"}
                        width={170}
                        height={210}
                        className={cn(
                          "absolute bottom-[-24px] object-contain drop-shadow-[0_18px_24px_rgba(23,58,42,0.16)]",
                          index === 0 && "left-[1%] h-28 w-20 rotate-[-8deg] sm:left-[4%] sm:h-44 sm:w-32",
                          index === 1 && "left-1/2 h-32 w-24 -translate-x-1/2 sm:h-52 sm:w-36",
                          index === 2 && "right-[1%] h-28 w-20 rotate-[8deg] sm:right-[4%] sm:h-44 sm:w-32",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {routine.steps.map((step, index) => {
                  const product = productBySlug[step.slug];
                  const StepIcon = step.icon;

                  return (
                    <div
                      key={`${moment}-${step.slug}`}
                      className="group grid gap-4 rounded-[18px] border border-border-soft bg-background p-4 transition hover:-translate-y-0.5 hover:shadow-card sm:grid-cols-[auto_1fr_auto] sm:items-center sm:rounded-[22px]"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pale-green/55 text-deep-olive sm:h-14 sm:w-14">
                        <StepIcon className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-bamboo">
                          Etape {index + 1}
                        </p>
                        <h4 className="mt-1 font-heading text-[clamp(1.35rem,6vw,1.75rem)] font-semibold text-deep-olive">
                          {step.action}
                        </h4>
                        <p className="mt-2 text-[0.95rem] leading-6 text-text-dark/72 sm:text-sm">{step.detail}</p>
                        {product ? (
                          <p className="mt-3 text-sm font-semibold text-deep-olive">
                            {step.productLabel}
                          </p>
                        ) : null}
                      </div>
                      {product ? (
                        <Button asChild variant="ghost" size="sm" className="w-full justify-center sm:w-auto sm:justify-self-end">
                          <Link href={product.href}>
                            Voir
                            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                          </Link>
                        </Button>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
