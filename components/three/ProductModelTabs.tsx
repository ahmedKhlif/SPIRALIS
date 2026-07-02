"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Clock3,
  Hand,
  Layers3,
  MousePointer2,
  Rotate3D,
  ScanSearch,
  Sparkles,
  ZoomIn,
} from "lucide-react";
import { fallbackImages, modelPaths } from "@/lib/assets";
import { IconBadge } from "@/components/sections/IconBadge";
import { ModelFallback } from "@/components/three/ModelFallback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductModelViewer = dynamic(
  () => import("@/components/three/ProductModelViewer").then((mod) => mod.ProductModelViewer),
  {
    ssr: false,
    loading: () => (
      <ModelFallback
        fallbackImage={fallbackImages.gel}
        productName="Produit SPIRALIS"
      />
    ),
  },
);

const viewers = [
  {
    value: "gel",
    label: "Gel",
    step: "Etape 1",
    name: "Gel Nettoyant Anti-Imperfections",
    modelPath: modelPaths.gel,
    fallbackImage: fallbackImages.gel,
    file: "gel.glb",
    size: "4.7 Mo",
    finish: "Flacon vert transparent",
    focus: "Nettoyage et fraicheur",
    detail: "Tournez le flacon pour inspecter le volume, la pompe et la silhouette du nettoyant.",
  },
  {
    value: "serum",
    label: "Serum",
    step: "Etape 2",
    name: "Serum Anti-Imperfections",
    modelPath: modelPaths.serum,
    fallbackImage: fallbackImages.serum,
    file: "serum.glb",
    size: "980 Ko",
    finish: "Flacon soin fin",
    focus: "Traitement cible",
    detail: "Un modele plus fin pour lire la posture du serum dans la routine.",
  },
  {
    value: "cream",
    label: "Creme",
    step: "Etape 3",
    name: "Creme Hydratante Anti-Imperfections",
    modelPath: modelPaths.cream,
    fallbackImage: fallbackImages.cream,
    file: "cream.glb",
    size: "2.0 Mo",
    finish: "Pot avec finition bambou",
    focus: "Hydratation legere",
    detail: "Inspectez le pot et son couvercle pour voir la logique premium rechargeable.",
  },
  {
    value: "recharge",
    label: "Recharge",
    step: "Refill",
    name: "Recharge Creme Hydratante",
    modelPath: modelPaths.recharge,
    fallbackImage: fallbackImages.recharge,
    file: "recharge.glb",
    size: "5.0 Mo",
    finish: "Capsule de recharge",
    focus: "Systeme reutilisable",
    detail: "La recharge complete l'experience en montrant le geste responsable de la gamme.",
  },
];

export function ProductModelTabs() {
  const [activeValue, setActiveValue] = useState(viewers[0].value);
  const activeViewer = useMemo(
    () => viewers.find((viewer) => viewer.value === activeValue) ?? viewers[0],
    [activeValue],
  );

  return (
    <Tabs
      value={activeValue}
      onValueChange={setActiveValue}
      className="w-full rounded-[22px] border border-border-soft bg-cream/70 p-3 shadow-card backdrop-blur sm:rounded-[32px] sm:p-7"
    >
      <div className="grid gap-5 xl:grid-cols-[1fr_auto] xl:items-start">
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-bamboo">
            Studio 3D interactif
          </p>
          <h2 className="font-heading text-[clamp(2rem,8vw,3rem)] font-semibold leading-tight text-deep-olive">
            {activeViewer.name}
          </h2>
        </div>
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 xl:w-auto">
          {viewers.map((viewer) => (
            <TabsTrigger key={viewer.value} value={viewer.value}>
              {viewer.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
        <IconBadge icon={Rotate3D} label="Rotation auto" />
        <IconBadge icon={ZoomIn} label="Zoom libre" />
        <IconBadge icon={MousePointer2} label="Drag interactif" />
        <IconBadge icon={ScanSearch} label="Details GLB" />
      </div>

      {viewers.map((viewer) => (
        <TabsContent key={viewer.value} value={viewer.value} className="mt-6">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_21rem]">
            <ProductModelViewer
              modelPath={viewer.modelPath}
              fallbackImage={viewer.fallbackImage}
              productName={viewer.name}
            />
            <aside className="grid content-start gap-4 rounded-[22px] border border-border-soft bg-background/78 p-4 shadow-sm backdrop-blur sm:p-5">
              <div className="rounded-[18px] border border-border-soft bg-cream/70 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-pale-green/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-deep-olive">
                    <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                    {viewer.step}
                  </span>
                  <span className="text-xs font-semibold text-text-dark/58">{viewer.size}</span>
                </div>
                <h3 className="font-heading text-2xl font-semibold leading-tight text-deep-olive">
                  {viewer.focus}
                </h3>
                <p className="mt-3 text-sm leading-6 text-text-dark/70">{viewer.detail}</p>
              </div>

              <div className="grid gap-3">
                <div className="flex items-center gap-3 rounded-2xl border border-border-soft bg-cream/60 px-4 py-3">
                  <Box className="h-5 w-5 text-deep-olive" strokeWidth={1.5} />
                  <span className="text-sm font-semibold text-deep-olive">{viewer.file}</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-border-soft bg-cream/60 px-4 py-3">
                  <Layers3 className="h-5 w-5 text-deep-olive" strokeWidth={1.5} />
                  <span className="text-sm font-semibold text-deep-olive">{viewer.finish}</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-border-soft bg-cream/60 px-4 py-3">
                  <Hand className="h-5 w-5 text-deep-olive" strokeWidth={1.5} />
                  <span className="text-sm font-semibold text-deep-olive">Glisser pour orienter</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-border-soft bg-cream/60 px-4 py-3">
                  <Clock3 className="h-5 w-5 text-deep-olive" strokeWidth={1.5} />
                  <span className="text-sm font-semibold text-deep-olive">Rotation douce en idle</span>
                </div>
              </div>
            </aside>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
