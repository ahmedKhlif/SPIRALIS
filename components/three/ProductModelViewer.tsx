"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Bounds,
  Center,
  Clone,
  ContactShadows,
  Environment,
  Float,
  Html,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { ModelFallback } from "@/components/three/ModelFallback";

type ProductModelViewerProps = {
  modelPath: string;
  fallbackImage: string;
  productName: string;
};

function ProductModel({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);

  return (
    <Bounds fit clip observe margin={1.18}>
      <Center>
        <Float speed={1.15} rotationIntensity={0.12} floatIntensity={0.18}>
          <Clone object={scene} />
        </Float>
      </Center>
    </Bounds>
  );
}

function CanvasLoader() {
  return (
    <Html center>
      <div className="rounded-full border border-border-soft bg-cream/90 px-4 py-2 text-xs font-semibold text-deep-olive shadow-card backdrop-blur">
        Chargement du modele
      </div>
    </Html>
  );
}

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
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

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

  if (isAvailable !== true) {
    return <ModelFallback fallbackImage={fallbackImage} productName={productName} />;
  }

  return (
    <ViewerErrorBoundary
      fallback={<ModelFallback fallbackImage={fallbackImage} productName={productName} />}
    >
      <div className="relative h-full min-h-[380px] overflow-hidden rounded-[22px] border border-border-soft bg-[radial-gradient(circle_at_50%_18%,var(--cream)_0%,var(--soft-beige)_52%,var(--pale-green)_100%)] shadow-soft sm:min-h-[520px] sm:rounded-[28px]">
        <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-full border border-border-soft bg-background/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-deep-olive shadow-sm backdrop-blur sm:left-5 sm:top-5">
          GLB live
        </div>
        <div className="pointer-events-none absolute bottom-5 left-5 z-10 hidden rounded-2xl border border-white/50 bg-background/72 px-4 py-2 text-center text-sm font-semibold text-deep-olive backdrop-blur sm:block">
          {productName}
        </div>
        <Canvas
          camera={{ position: [0, 0.35, 5], fov: 32 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          shadows
        >
          <ambientLight intensity={0.85} />
          <directionalLight castShadow position={[4, 6, 4]} intensity={1.7} />
          <directionalLight position={[-3, 2, -4]} intensity={0.55} />
          <Suspense fallback={<CanvasLoader />}>
            <ProductModel modelPath={modelPath} />
            <Environment preset="studio" />
            <ContactShadows position={[0, -1.35, 0]} opacity={0.28} scale={8} blur={2.6} />
          </Suspense>
          <OrbitControls
            makeDefault
            autoRotate
            autoRotateSpeed={0.55}
            enableDamping
            dampingFactor={0.08}
            enablePan={false}
            minDistance={2.2}
            maxDistance={7}
            minPolarAngle={Math.PI / 4.2}
            maxPolarAngle={Math.PI / 1.65}
          />
        </Canvas>
      </div>
    </ViewerErrorBoundary>
  );
}
