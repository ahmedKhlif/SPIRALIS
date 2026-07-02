import Link from "next/link";
import { ArrowRight, Droplets, Leaf, Sparkles } from "lucide-react";

const steps = [
  {
    label: "Nettoyer",
    detail: "Gel nettoyant",
    icon: Droplets,
    href: "/produits/gel-nettoyant",
  },
  {
    label: "Traiter",
    detail: "Serum",
    icon: Sparkles,
    href: "/produits/serum",
  },
  {
    label: "Hydrater",
    detail: "Creme",
    icon: Leaf,
    href: "/produits/creme-hydratante",
  },
];

export function RoutineRibbon() {
  return (
    <section className="border-b border-border-soft bg-cream/70">
      <div className="container-shell grid gap-0 py-5 md:grid-cols-[1fr_auto] md:items-center">
        <div className="grid gap-3 md:grid-cols-3">
          {steps.map((step, index) => (
            <Link
              href={step.href}
              className="group flex items-center gap-4 rounded-[20px] border border-transparent px-0 py-3 transition hover:border-border-soft hover:bg-background/75 md:rounded-none md:border-0 md:border-r md:border-border-soft md:px-5 md:first:pl-0 md:last:border-r-0 md:hover:bg-transparent"
              key={step.label}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border-soft bg-background text-deep-olive transition group-hover:border-deep-olive/20 group-hover:bg-pale-green/50">
                <step.icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-bamboo">
                  Etape {index + 1}
                </p>
                <p className="font-semibold text-deep-olive">{step.label}</p>
                <p className="text-sm text-text-dark/62">{step.detail}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link
          href="/routine"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-deep-olive px-5 py-3 text-sm font-semibold text-deep-olive transition hover:bg-deep-olive hover:text-white md:mt-0"
        >
          Voir la routine
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </Link>
      </div>
    </section>
  );
}
