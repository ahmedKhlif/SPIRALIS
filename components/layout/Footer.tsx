import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, MapPin } from "lucide-react";
import { brandAssets } from "@/lib/assets";
import { navigationLinks } from "@/lib/navigation";

export function Footer() {
  const brandSummary =
    "SPIRALIS - Une routine naturelle anti-imperfections pensée pour purifier, équilibrer et hydrater les peaux mixtes à grasses.";
  const copyrightLine = "© 2026 SPIRALIS. Site vitrine, sans vente en ligne.";

  return (
    <footer className="relative overflow-hidden bg-deep-olive text-white">
      <Image
        src={brandAssets.markLight}
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute -right-24 -top-24 w-72 opacity-10 md:w-96"
      />
      <div className="container-shell relative grid gap-12 py-16 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="max-w-md space-y-6">
          <Image
            src={brandAssets.logoLight}
            alt="Logo SPIRALIS"
            width={210}
            height={90}
            className="h-auto w-44"
          />
          <p className="leading-7 text-white/76">{brandSummary}</p>
        </div>
        <nav className="space-y-4" aria-label="Navigation du pied de page">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/56">
            Navigation
          </h2>
          <div className="grid gap-3">
            {navigationLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-white/76 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/56">
            Contact
          </h2>
          <div className="space-y-3 text-sm text-white/76">
            <p className="flex items-center gap-3">
              <Mail className="h-4 w-4" strokeWidth={1.5} />
              contact@spiralis.fr
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="h-4 w-4" strokeWidth={1.5} />
              Studio botanique
            </p>
            <p className="flex items-center gap-3">
              <Instagram className="h-4 w-4" strokeWidth={1.5} />
              @spiralis.skincare
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="container-shell text-xs text-white/54">{copyrightLine}</div>
      </div>
    </footer>
  );
}
