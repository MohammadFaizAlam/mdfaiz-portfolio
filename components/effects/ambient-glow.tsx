"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface AmbientGlowProps {
    variant?: "hero" | "section-left" | "section-right" | "center" | "dual";
    className?: string;
}

/**
 * Animated motion-gradients using strictly the existing monochrome theme palette.
 * Pauses offscreen animations automatically via useInView and uses GPU-friendly blur radii.
 */
export function AmbientGlow({ variant = "dual", className }: AmbientGlowProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion() ?? false;
    const isInView = useInView(containerRef, { margin: "120px 0px" });
    const shouldAnimate = !prefersReducedMotion && isInView;

    return (
        <div
            ref={containerRef}
            aria-hidden="true"
            className={cn(
                "pointer-events-none select-none absolute inset-0 overflow-hidden z-0",
                className
            )}
        >
            {variant === "hero" && (
                <>
                    {/* Strictly positioned on the left side of the screen so it never collides with the right-side portrait slider */}
                    <motion.div
                        animate={
                            shouldAnimate
                                ? {
                                      x: [0, 50, -18, 0],
                                      y: [0, -40, 30, 0],
                                      scale: [1, 1.08, 0.95, 1],
                                  }
                                : undefined
                        }
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-[10%] -left-24 w-[340px] sm:w-[460px] max-w-[42vw] h-[340px] sm:h-[460px] rounded-full bg-radial from-primary/[0.08] via-primary/[0.025] to-transparent dark:from-primary/[0.11] dark:via-primary/[0.035] dark:to-transparent blur-3xl transform-gpu"
                    />
                    <motion.div
                        animate={
                            shouldAnimate
                                ? {
                                      x: [0, -30, 40, 0],
                                      y: [0, 40, -25, 0],
                                      scale: [1, 0.94, 1.08, 1],
                                  }
                                : undefined
                        }
                        transition={{
                            duration: 22,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute bottom-[8%] -left-16 w-[300px] sm:w-[420px] max-w-[38vw] h-[300px] sm:h-[420px] rounded-full bg-radial from-foreground/[0.06] via-foreground/[0.02] to-transparent dark:from-foreground/[0.085] dark:via-foreground/[0.025] dark:to-transparent blur-3xl transform-gpu"
                    />
                </>
            )}

            {variant === "section-left" && (
                <>
                    <motion.div
                        animate={
                            shouldAnimate
                                ? {
                                      x: [0, 75, -25, 0],
                                      y: [0, 50, -35, 0],
                                      scale: [1, 1.1, 0.95, 1],
                                  }
                                : undefined
                        }
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-[15%] -left-36 w-[520px] h-[520px] rounded-full bg-radial from-primary/[0.07] via-primary/[0.02] to-transparent dark:from-primary/[0.09] dark:via-primary/[0.025] dark:to-transparent blur-3xl transform-gpu"
                    />
                    <motion.div
                        animate={
                            shouldAnimate
                                ? {
                                      x: [0, -60, 35, 0],
                                      y: [0, -45, 25, 0],
                                      scale: [1, 1.06, 0.94, 1],
                                  }
                                : undefined
                        }
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute bottom-[10%] right-[12%] w-[440px] h-[440px] rounded-full bg-radial from-foreground/[0.05] via-transparent to-transparent dark:from-foreground/[0.065] blur-3xl transform-gpu"
                    />
                </>
            )}

            {variant === "section-right" && (
                <>
                    <motion.div
                        animate={
                            shouldAnimate
                                ? {
                                      x: [0, -75, 30, 0],
                                      y: [0, 55, -40, 0],
                                      scale: [1, 1.1, 0.94, 1],
                                  }
                                : undefined
                        }
                        transition={{
                            duration: 22,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-[10%] -right-32 w-[540px] h-[540px] rounded-full bg-radial from-primary/[0.07] via-primary/[0.02] to-transparent dark:from-primary/[0.09] dark:via-primary/[0.025] dark:to-transparent blur-3xl transform-gpu"
                    />
                    <motion.div
                        animate={
                            shouldAnimate
                                ? {
                                      x: [0, 55, -35, 0],
                                      y: [0, -45, 30, 0],
                                      scale: [1, 0.94, 1.08, 1],
                                  }
                                : undefined
                        }
                        transition={{
                            duration: 19,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute bottom-[12%] left-[6%] w-[450px] h-[450px] rounded-full bg-radial from-foreground/[0.05] via-transparent to-transparent dark:from-foreground/[0.065] blur-3xl transform-gpu"
                    />
                </>
            )}

            {variant === "center" && (
                <>
                    <motion.div
                        animate={
                            shouldAnimate
                                ? {
                                      x: ["-50%", "-44%", "-56%", "-50%"],
                                      y: ["-50%", "-45%", "-55%", "-50%"],
                                      scale: [1, 1.1, 0.94, 1],
                                  }
                                : undefined
                        }
                        transition={{
                            duration: 21,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-1/2 left-1/2 w-[640px] h-[460px] rounded-full bg-radial from-primary/[0.065] via-primary/[0.02] to-transparent dark:from-primary/[0.085] dark:via-primary/[0.025] dark:to-transparent blur-3xl transform-gpu"
                    />
                </>
            )}

            {variant === "dual" && (
                <>
                    <motion.div
                        animate={
                            shouldAnimate
                                ? {
                                      x: [0, 70, -30, 0],
                                      y: [0, -50, 40, 0],
                                      scale: [1, 1.08, 0.95, 1],
                                  }
                                : undefined
                        }
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-[14%] -left-28 w-[500px] h-[500px] rounded-full bg-radial from-primary/[0.07] via-primary/[0.02] to-transparent dark:from-primary/[0.09] dark:via-primary/[0.025] dark:to-transparent blur-3xl transform-gpu"
                    />
                    <motion.div
                        animate={
                            shouldAnimate
                                ? {
                                      x: [0, -65, 40, 0],
                                      y: [0, 45, -45, 0],
                                      scale: [1, 0.94, 1.1, 1],
                                  }
                                : undefined
                        }
                        transition={{
                            duration: 24,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute bottom-[14%] -right-28 w-[520px] h-[520px] rounded-full bg-radial from-foreground/[0.055] via-foreground/[0.018] to-transparent dark:from-foreground/[0.075] dark:via-foreground/[0.022] dark:to-transparent blur-3xl transform-gpu"
                    />
                </>
            )}
        </div>
    );
}
