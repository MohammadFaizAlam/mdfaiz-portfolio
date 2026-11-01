"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function BlurReveal({
    children,
    className,
    delay = 0,
}: BlurRevealProps) {
    const prefersReducedMotion = useReducedMotion() ?? false;

    return (
        <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            className={cn("transform-gpu", className)}
        >
            {children}
        </motion.div>
    );
}
