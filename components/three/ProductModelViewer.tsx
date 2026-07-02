"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";
import { MousePointer2, Pause, Play, RotateCcw, Rotate3D, ScanSearch, ZoomIn } from "lucide-react";
import { ModelFallback } from "@/components/three/ModelFallback";
import { cn } from "@/lib/utils";

type ProductModelViewerProps = {
  modelPath: string;
  fallbackImage: string;
  productName: string;
};

type CameraPreset = "front" | "side" | "top";

type ModelViewerElement = HTMLElement & {
  cameraOrbit?: string;
  fieldOfView?: string;
  loaded?: boolean;
  jumpCameraToGoal?: () => void;
  resetTurntableRotation?: () => void;
  updateFraming?: () => void;
};

type ModelProgressEvent = Event & {
  detail?: {
    totalProgress?: number;
  };
};

const cameraPresets: Record<CameraPreset, { label: string; orbit: string }> = {
  front: { label: "Vue face", orbit: "0deg 75deg 105%" },
  side: { label: "Vue profil", orbit: "75deg 78deg 115%" },
  top: { label: "Vue volume", orbit: "0deg 42deg 122%" },
};

class ViewerErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export function ProductModelViewer({
  modelPath,
  fallbackImage,
  productName,
}: ProductModelViewerProps) {
  const viewerRef = useRef<ModelViewerElement | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [activePreset, setActivePreset] = useState<CameraPreset>("front");
  const [autoRotate, setAutoRotate] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [hasError, setHasError] = useState(false);

  const fallback = useMemo(
    () => <ModelFallback fallbackImage={fallbackImage} productName={productName} />,
    [fallbackImage, productName],
  );

  const applyCameraPreset = useCallback((presetKey: CameraPreset) => {
    const viewer = viewerRef.current;
    const preset = cameraPresets[presetKey];

    setActivePreset(presetKey);

    if (!viewer) {
      return;
    }

    viewer.cameraOrbit = preset.orbit;
    viewer.fieldOfView = "45deg";
    viewer.jumpCameraToGoal?.();
  }, []);

  const resetViewer = useCallback(() => {
    const viewer = viewerRef.current;

    setAutoRotate(true);
    applyCameraPreset("front");
    viewer?.resetTurntableRotation?.();
    viewer?.updateFraming?.();
  }, [applyCameraPreset]);

  useEffect(() => {
    let active = true;

    fetch(modelPath, { method: "HEAD" })
      .then((response) => {
        if (active) setIsAvailable(response.ok);
      })
      .catch(() => {
        if (active) setIsAvailable(false);
      });

    return () => {
      active = false;
    };
  }, [modelPath]);

  useEffect(() => {
    const viewer = viewerRef.current;

    if (!viewer) {
      return;
    }

    if (autoRotate) {
      viewer.setAttribute("auto-rotate", "");
    } else {
      viewer.removeAttribute("auto-rotate");
    }
  }, [autoRotate, isAvailable]);

  useEffect(() => {
    const viewer = viewerRef.current;

    if (!viewer || isAvailable !== true) {
      return;
    }

    const onLoad = () => {
      setIsLoaded(true);
      setLoadProgress(100);
      setHasError(false);

      viewer.cameraOrbit = cameraPresets[activePreset].orbit;
      viewer.fieldOfView = "45deg";
      viewer.setAttribute("render-scale", "0.82");
      viewer.setAttribute("tone-mapping", "neutral");
      viewer.setAttribute("shadow-intensity", "0.7");
      viewer.setAttribute("shadow-softness", "0.4");
      viewer.setAttribute("exposure", "1");
      viewer.jumpCameraToGoal?.();
      viewer.updateFraming?.();
    };

    const onProgress = (event: Event) => {
      const progressEvent = event as ModelProgressEvent;
      const progress = Math.round((progressEvent.detail?.totalProgress ?? 0) * 100);
      setLoadProgress(progress);
    };

    const onError = () => {
      setHasError(true);
      setIsLoaded(false);
    };

    viewer.addEventListener("load", onLoad);
    viewer.addEventListener("progress", onProgress);
    viewer.addEventListener("error", onError);

    if (viewer.loaded) {
      onLoad();
    }

    return () => {
      viewer.removeEventListener("load", onLoad);
      viewer.removeEventListener("progress", onProgress);
      viewer.removeEventListener("error", onError);
    };
  }, [activePreset, isAvailable]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      if (target?.closest("input, textarea, select, button, a")) {
        return;
      }

      if (event.key.toLowerCase() === "r") {
        resetViewer();
      }

      if (event.code === "Space") {
        event.preventDefault();
        setAutoRotate((current) => !current);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [resetViewer]);

  const modelViewer = React.createElement("model-viewer", {
    ref: viewerRef,
    src: modelPath,
    poster: fallbackImage,
    alt: productName,
    className: "h-full min-h-[430px] w-full sm:min-h-[560px]",
    "auto-rotate-delay": "0",
    "camera-controls": "",
    "touch-action": "none",
    "shadow-intensity": "0.7",
    "shadow-softness": "0.4",
    exposure: "1",
    "interaction-policy": "allow-when-focused",
    "camera-orbit": cameraPresets[activePreset].orbit,
    "min-camera-orbit": "auto 0deg auto",
    "max-camera-orbit": "auto 180deg auto",
    "min-field-of-view": "25deg",
    "max-field-of-view": "65deg",
    "field-of-view": "45deg",
    "camera-target": "0m 0m 0m",
    "interpolation-decay": "100",
    loading: "lazy",
    reveal: "auto",
    "tone-mapping": "neutral",
    "render-scale": "0.82",
    "disable-tap": "",
  });

  if (isAvailable === false || hasError) {
    return fallback;
  }

  return (
    <ViewerErrorBoundary fallback={fallback}>
      <Script
        id="google-model-viewer"
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        strategy="afterInteractive"
        type="module"
      />

      <div
        data-no-translate="true"
        translate="no"
        className="relative h-full min-h-[430px] overflow-hidden rounded-[22px] border border-border-soft bg-[radial-gradient(circle_at_50%_18%,var(--cream)_0%,var(--soft-beige)_52%,var(--pale-green)_100%)] shadow-soft sm:min-h-[560px] sm:rounded-[28px]"
      >
        <div className="pointer-events-none absolute inset-x-3 top-3 z-10 flex flex-wrap items-center justify-between gap-2 sm:inset-x-5 sm:top-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-background/82 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-deep-olive shadow-sm backdrop-blur">
            <ScanSearch className="h-4 w-4" strokeWidth={1.5} />
            GLB live
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-background/82 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-deep-olive shadow-sm backdrop-blur">
            <Rotate3D className="h-4 w-4" strokeWidth={1.5} />
            Google model-viewer
          </span>
        </div>

        {!isLoaded ? (
          <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center bg-background/34 backdrop-blur-[2px]">
            <div className="min-w-44 rounded-2xl border border-border-soft bg-cream/92 px-4 py-3 text-center text-xs font-semibold text-deep-olive shadow-card backdrop-blur">
              <div className="mx-auto mb-2 h-9 w-9 animate-spin rounded-full border-2 border-bamboo/20 border-t-bamboo" />
              <p>Chargement du modele</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-pale-green/70">
                <div
                  className="h-full rounded-full bg-bamboo transition-all duration-300"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <p className="mt-2 text-[0.68rem] text-text-dark/58">{loadProgress}%</p>
            </div>
          </div>
        ) : null}

        <div className="absolute bottom-3 left-3 right-3 z-10 grid gap-3 sm:bottom-5 sm:left-5 sm:right-5">
          <div className="hidden rounded-2xl border border-white/50 bg-background/74 px-4 py-2 text-center text-sm font-semibold text-deep-olive backdrop-blur sm:block">
            {productName}
          </div>
          <div className="grid gap-2 rounded-[20px] border border-border-soft bg-background/82 p-2 shadow-sm backdrop-blur sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="grid grid-cols-3 gap-1.5">
              {(Object.keys(cameraPresets) as CameraPreset[]).map((presetKey) => (
                <button
                  key={presetKey}
                  type="button"
                  onClick={() => applyCameraPreset(presetKey)}
                  className={cn(
                    "min-h-10 rounded-2xl px-2 text-xs font-semibold text-deep-olive transition hover:bg-pale-green/60",
                    activePreset === presetKey && "bg-deep-olive text-white hover:bg-deep-olive",
                  )}
                >
                  {cameraPresets[presetKey].label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-1.5 sm:w-64">
              <button
                type="button"
                onClick={() => setAutoRotate((current) => !current)}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-2xl border border-border-soft bg-cream/80 px-3 text-xs font-semibold text-deep-olive transition hover:bg-pale-green/60"
              >
                {autoRotate ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {autoRotate ? "Pause rotation" : "Auto rotation"}
              </button>
              <button
                type="button"
                onClick={resetViewer}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-2xl border border-border-soft bg-cream/80 px-3 text-xs font-semibold text-deep-olive transition hover:bg-pale-green/60"
              >
                <RotateCcw className="h-4 w-4" />
                Reinitialiser
              </button>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute left-4 top-[4.5rem] z-10 hidden max-w-[15rem] rounded-2xl border border-border-soft bg-background/76 px-4 py-3 text-xs font-semibold text-deep-olive shadow-sm backdrop-blur lg:block">
          {productName}
        </div>

        <div className="pointer-events-none absolute right-4 top-[4.5rem] z-10 hidden max-w-[17rem] grid-cols-1 gap-2 text-xs font-semibold text-deep-olive lg:grid">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-background/76 px-3 py-2 backdrop-blur">
            <MousePointer2 className="h-4 w-4 text-sage" strokeWidth={1.5} />
            Glisser pour orienter
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-background/76 px-3 py-2 backdrop-blur">
            <ZoomIn className="h-4 w-4 text-sage" strokeWidth={1.5} />
            Molette pour zoomer
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-background/76 px-3 py-2 backdrop-blur">
            <RotateCcw className="h-4 w-4 text-sage" strokeWidth={1.5} />
            R pour reinitialiser
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-background/76 px-3 py-2 backdrop-blur">
            <Play className="h-4 w-4 text-sage" strokeWidth={1.5} />
            Espace pour auto-rotation
          </span>
        </div>

        {modelViewer}
      </div>
    </ViewerErrorBoundary>
  );
}
