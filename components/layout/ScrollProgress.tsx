"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useState } from "react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.25,
  });
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setIsVisible(value > 0.015 && value < 0.985);
  });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-bamboo"
      style={{ scaleX, opacity: isVisible ? 1 : 0 }}
    />
  );
}
