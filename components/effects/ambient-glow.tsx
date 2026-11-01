"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AmbientGlowProps {
    variant?: "hero" | "section-left" | "section-right" | "center" | "dual";
    className?: string;
}

/**
 * Animated motion-gradients using strictly the existing monochrome theme palette.
 * Orbs drift slowly along organic trajectories to create living atmospheric depth.
 */
export function AmbientGlow({ variant = "dual", className }: AmbientGlowProps) {
    const prefersReducedMotion = useReducedMotion() ?? false;

    return (
        <div
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
                            prefersReducedMotion
                                ? undefined
                                : {
                                      x: [0, 55, -20, 0],
                                      y: [0, -45, 35, 0],
                                      scale: [1, 1.12, 0.94, 1],
                                  }
                        }
                        transition={{
                            duration: 16,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-[10%] -left-24 w-[340px] sm:w-[460px] max-w-[42vw] h-[340px] sm:h-[460px] rounded-full bg-radial from-primary/[0.08] via-primary/[0.03] to-transparent dark:from-primary/[0.11] dark:via-primary/[0.04] dark:to-transparent blur-[90px] will-change-transform"
                    />
                    <motion.div
                        animate={
                            prefersReducedMotion
                                ? undefined
                                : {
                                      x: [0, -35, 45, 0],
                                      y: [0, 45, -30, 0],
                                      scale: [1, 0.92, 1.1, 1],
                                  }
                        }
                        transition={{
                            duration: 21,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute bottom-[8%] -left-16 w-[300px] sm:w-[420px] max-w-[38vw] h-[300px] sm:h-[420px] rounded-full bg-radial from-foreground/[0.06] via-foreground/[0.02] to-transparent dark:from-foreground/[0.085] dark:via-foreground/[0.025] dark:to-transparent blur-[95px] will-change-transform"
                    />
                </>
            )}

            {variant === "section-left" && (
                <>
                    <motion.div
                        animate={
                            prefersReducedMotion
                                ? undefined
                                : {
                                      x: [0, 90, -30, 0],
                                      y: [0, 60, -40, 0],
                                      scale: [1, 1.14, 0.94, 1],
                                  }
                        }
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-[15%] -left-36 w-[520px] h-[520px] rounded-full bg-radial from-primary/[0.07] via-primary/[0.025] to-transparent dark:from-primary/[0.09] dark:via-primary/[0.03] dark:to-transparent blur-[110px] will-change-transform"
                    />
                    <motion.div
                        animate={
                            prefersReducedMotion
                                ? undefined
                                : {
                                      x: [0, -70, 40, 0],
                                      y: [0, -50, 30, 0],
                                      scale: [1, 1.08, 0.92, 1],
                                  }
                        }
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute bottom-[10%] right-[12%] w-[440px] h-[440px] rounded-full bg-radial from-foreground/[0.05] via-transparent to-transparent dark:from-foreground/[0.065] blur-[120px] will-change-transform"
                    />
                </>
            )}

            {variant === "section-right" && (
                <>
                    <motion.div
                        animate={
                            prefersReducedMotion
                                ? undefined
                                : {
                                      x: [0, -85, 35, 0],
                                      y: [0, 65, -45, 0],
                                      scale: [1, 1.15, 0.93, 1],
                                  }
                        }
                        transition={{
                            duration: 22,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-[10%] -right-32 w-[560px] h-[560px] rounded-full bg-radial from-primary/[0.07] via-primary/[0.025] to-transparent dark:from-primary/[0.09] dark:via-primary/[0.03] dark:to-transparent blur-[115px] will-change-transform"
                    />
                    <motion.div
                        animate={
                            prefersReducedMotion
                                ? undefined
                                : {
                                      x: [0, 65, -40, 0],
                                      y: [0, -55, 35, 0],
                                      scale: [1, 0.92, 1.1, 1],
                                  }
                        }
                        transition={{
                            duration: 19,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute bottom-[12%] left-[6%] w-[460px] h-[460px] rounded-full bg-radial from-foreground/[0.05] via-transparent to-transparent dark:from-foreground/[0.065] blur-[115px] will-change-transform"
                    />
                </>
            )}

            {variant === "center" && (
                <>
                    <motion.div
                        animate={
                            prefersReducedMotion
                                ? undefined
                                : {
                                      x: ["-50%", "-42%", "-58%", "-50%"],
                                      y: ["-50%", "-44%", "-56%", "-50%"],
                                      scale: [1, 1.14, 0.92, 1],
                                  }
                        }
                        transition={{
                            duration: 21,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-1/2 left-1/2 w-[680px] h-[480px] rounded-full bg-radial from-primary/[0.065] via-primary/[0.02] to-transparent dark:from-primary/[0.085] dark:via-primary/[0.025] dark:to-transparent blur-[120px] will-change-transform"
                    />
                </>
            )}

            {variant === "dual" && (
                <>
                    <motion.div
                        animate={
                            prefersReducedMotion
                                ? undefined
                                : {
                                      x: [0, 80, -35, 0],
                                      y: [0, -60, 45, 0],
                                      scale: [1, 1.12, 0.94, 1],
                                  }
                        }
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-[14%] -left-28 w-[520px] h-[520px] rounded-full bg-radial from-primary/[0.07] via-primary/[0.025] to-transparent dark:from-primary/[0.09] dark:via-primary/[0.03] dark:to-transparent blur-[115px] will-change-transform"
                    />
                    <motion.div
                        animate={
                            prefersReducedMotion
                                ? undefined
                                : {
                                      x: [0, -75, 45, 0],
                                      y: [0, 50, -55, 0],
                                      scale: [1, 0.92, 1.14, 1],
                                  }
                        }
                        transition={{
                            duration: 24,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute bottom-[14%] -right-28 w-[540px] h-[540px] rounded-full bg-radial from-foreground/[0.055] via-foreground/[0.02] to-transparent dark:from-foreground/[0.075] dark:via-foreground/[0.025] dark:to-transparent blur-[120px] will-change-transform"
                    />
                </>
            )}
        </div>
    );
}
