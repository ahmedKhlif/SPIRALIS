import Image from "next/image";
import { Rotate3D, ScanSearch } from "lucide-react";

export function ModelFallback({
  fallbackImage,
  productName,
}: {
  fallbackImage: string;
  productName: string;
}) {
  return (
    <div className="relative flex h-full min-h-[360px] items-center justify-center overflow-hidden rounded-[22px] border border-border-soft bg-[radial-gradient(circle_at_50%_18%,#FFF8EC_0%,#EADCC6_54%,#DDE8C8_100%)] p-4 sm:min-h-[520px] sm:rounded-[28px] sm:p-8">
      <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-border-soft bg-cream/80 px-3 py-2 text-xs font-semibold text-deep-olive sm:left-6 sm:top-6">
        <Rotate3D className="h-4 w-4" strokeWidth={1.5} />
        Modèle 3D à venir
      </div>
      <div className="absolute right-6 top-6 hidden items-center gap-2 rounded-full border border-border-soft bg-cream/80 px-3 py-2 text-xs font-semibold text-deep-olive md:inline-flex">
        <ScanSearch className="h-4 w-4" strokeWidth={1.5} />
        Fallback premium
      </div>
      <div className="absolute bottom-16 h-24 w-2/3 rounded-full bg-deep-olive/12 blur-2xl" />
      <Image
        src={fallbackImage}
        alt={productName}
        width={420}
        height={560}
        className="relative max-h-[270px] w-auto object-contain drop-shadow-2xl sm:max-h-[400px]"
      />
      <div className="absolute bottom-6 left-6 right-6 hidden rounded-2xl border border-white/50 bg-cream/74 px-4 py-3 text-center text-sm font-semibold text-deep-olive backdrop-blur sm:block">
        {productName}
      </div>
    </div>
  );
}
