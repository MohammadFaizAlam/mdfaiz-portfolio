"use client";

import React, { useRef, useState, useCallback } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useMotionValueEvent,
    useReducedMotion,
    AnimatePresence,
} from "framer-motion";
import { useLanguage } from "@/providers/language-provider";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { AmbientGlow } from "@/components/effects/ambient-glow";
import { RichText } from "@/lib/markdown";
import { cn } from "@/lib/utils";
import type { PillarItem } from "@/types/pillars";
import {
    computePillarCardTransform,
    getActivePillarIndex,
} from "@/lib/portfolio-enhancements";

export default function Pillars() {
    const { content, dict } = useLanguage();
    const pillars: PillarItem[] = content.pillars || [];
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const prefersReducedMotion = useReducedMotion() ?? false;

    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const idx = getActivePillarIndex(latest, pillars.length);
        setActiveIndex((prev) => (prev === idx ? prev : idx));
    });

    const scrollToPillar = useCallback(
        (index: number) => {
            const targetEl = cardRefs.current[index];
            if (!targetEl) return;
            targetEl.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start",
            });
        },
        [prefersReducedMotion]
    );

    if (!pillars.length) return null;

    return (
        <section
            ref={sectionRef}
            data-slot="pillars"
            className="w-full container-void bg-background text-foreground relative border-t border-border/50"
        >
            <AmbientGlow variant="dual" />

            <div className="container mx-auto px-container relative z-10">
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-14 lg:mb-20">
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <BlurReveal>
                            <span className="title-counter">[002]</span>
                        </BlurReveal>
                        <BlurReveal>
                            <h2 className="title">{dict.title.pillars}</h2>
                        </BlurReveal>
                    </div>

                    <div className="lg:max-w-lg flex flex-col gap-2">
                        <BlurReveal>
                            <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-light leading-relaxed">
                                <RichText>{dict.pillarsIntro}</RichText>
                            </p>
                        </BlurReveal>
                    </div>
                </div>

                {/* Scrollytelling Matrix Shell */}
                <div className="grid grid-cols-1 xl:grid-cols-[72px_1fr] gap-6 xl:gap-10 items-start">
                    {/* Left Sticky Index Rail (Desktop xl+) */}
                    <aside
                        aria-label={dict.title.pillars}
                        className="hidden xl:flex flex-col items-center justify-between sticky top-24 h-[410px] py-6 px-2 border border-border/50 bg-background/90 backdrop-blur-md rounded-2xl"
                    >
                        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-muted-foreground/50 [writing-mode:vertical-lr] rotate-180 select-none">
                            INDEX
                        </span>

                        <div
                            className="flex flex-col items-center gap-3"
                            role="tablist"
                            aria-label="Pillar navigation"
                        >
                            {pillars.map((pillar, idx) => {
                                const isActive = activeIndex === idx;
                                return (
                                    <button
                                        key={pillar.id}
                                        type="button"
                                        role="tab"
                                        aria-selected={isActive}
                                        aria-label={`${pillar.index} ${pillar.title}`}
                                        onClick={() => scrollToPillar(idx)}
                                        className="group relative flex flex-col items-center gap-1.5 py-1.5 px-2.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-ring rounded-lg"
                                    >
                                        <span
                                            className={cn(
                                                "text-[10px] font-mono tracking-widest transition-colors duration-300",
                                                isActive
                                                    ? "text-foreground font-bold"
                                                    : "text-muted-foreground/40 group-hover:text-muted-foreground"
                                            )}
                                        >
                                            {pillar.index}
                                        </span>
                                        <span
                                            className={cn(
                                                "w-1.5 rounded-full transition-all duration-500 ease-out",
                                                isActive
                                                    ? "h-7 bg-foreground"
                                                    : "h-1.5 bg-border group-hover:bg-foreground/40"
                                            )}
                                        />
                                    </button>
                                );
                            })}
                        </div>

                        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-muted-foreground/50 [writing-mode:vertical-lr] rotate-180 select-none">
                            0{activeIndex + 1}/0{pillars.length}
                        </span>
                    </aside>

                    {/* Progressive Overlapping Sticky Stack */}
                    <div className="relative flex flex-col">
                        {pillars.map((pillar, index) => {
                            const isLast = index === pillars.length - 1;
                            return (
                                <React.Fragment key={pillar.id}>
                                    <div
                                        ref={(el) => {
                                            cardRefs.current[index] = el;
                                        }}
                                        style={{
                                            top: `calc(4.75rem + ${index * 44}px)`,
                                            zIndex: (index + 1) * 10,
                                        }}
                                        className="sticky mb-0"
                                    >
                                        <PillarStackCard
                                            pillar={pillar}
                                            index={index}
                                            total={pillars.length}
                                            scrollYProgress={scrollYProgress}
                                            reducedMotion={prefersReducedMotion}
                                            onHeaderClick={() => scrollToPillar(index)}
                                        />
                                    </div>
                                    <div
                                        aria-hidden="true"
                                        className={
                                            isLast
                                                ? "h-[28vh] sm:h-[32vh] pointer-events-none shrink-0"
                                                : "h-[40vh] sm:h-[45vh] md:h-[50vh] pointer-events-none shrink-0"
                                        }
                                    />
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

interface PillarStackCardProps {
    pillar: PillarItem;
    index: number;
    total: number;
    scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
    reducedMotion: boolean;
    onHeaderClick: () => void;
}

function PillarStackCard({
    pillar,
    index,
    total,
    scrollYProgress,
    reducedMotion,
    onHeaderClick,
}: PillarStackCardProps) {
    const [selectedFacetId, setSelectedFacetId] = useState<string>(
        pillar.facets[0]?.id ?? ""
    );

    const scale = useTransform(scrollYProgress, (p) => {
        return computePillarCardTransform(index, total, p, reducedMotion).scale;
    });

    const rawDimOpacity = useTransform(scrollYProgress, (p) => {
        return computePillarCardTransform(index, total, p, reducedMotion)
            .dimOpacity;
    });

    const activeFacet =
        pillar.facets.find((f) => f.id === selectedFacetId) || pillar.facets[0];

    return (
        <motion.article
            style={{
                scale: reducedMotion ? 1 : scale,
                transformOrigin: "top center",
            }}
            className="group relative w-full rounded-2xl sm:rounded-3xl border border-border/60 bg-background shadow-[0_-16px_48px_-12px_rgba(0,0,0,0.28)] dark:shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.65)] overflow-hidden transition-colors duration-500 hover:border-foreground/25 transform-gpu"
        >
            {/* Top Specular Hairline */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-foreground/25 to-transparent pointer-events-none" />

            {/* Subtle Stack Depth Dimming Overlay when subsequent cards overlap */}
            <motion.div
                aria-hidden="true"
                style={{ opacity: reducedMotion ? 0 : rawDimOpacity }}
                className="absolute inset-0 bg-background pointer-events-none z-20"
            />

            {/* Top Header Strip (44px / h-11 — matches the 44px sticky step so each overlapped card leaves its header neatly exposed) */}
            <button
                type="button"
                onClick={onHeaderClick}
                className="w-full h-11 flex items-center justify-between px-4 sm:px-8 lg:px-10 border-b border-border/40 bg-secondary/10 hover:bg-secondary/20 transition-colors cursor-pointer text-left relative z-30"
            >
                <span className="text-[10px] sm:text-xs font-mono tracking-[0.22em] uppercase text-foreground/90 font-medium">
                    {pillar.subsystem}
                </span>
                <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-widest text-muted-foreground/70 uppercase">
                    <span className="max-sm:hidden">{pillar.subtitle}</span>
                    <span aria-hidden="true" className="max-sm:hidden">
                        ·
                    </span>
                    <span>[{pillar.index}]</span>
                </div>
            </button>

            {/* Compact, Equal-Height 2-Column Body on Tablet & Desktop (md:grid-cols-12) and Compact Fit on Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 lg:gap-10 p-4 sm:p-7 lg:p-10 items-center md:min-h-[310px] lg:min-h-[330px]">
                {/* Left Column: Title + Concise Lead Copy + Interactive Focus Pills */}
                <div className="md:col-span-5 flex flex-col justify-between gap-3.5 sm:gap-5">
                    <div className="space-y-2 sm:space-y-3">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tighter uppercase leading-[0.94] text-foreground text-balance">
                            {pillar.title}
                        </h3>
                        <p className="text-xs sm:text-sm lg:text-base text-muted-foreground font-light leading-relaxed">
                            <RichText>{pillar.description}</RichText>
                        </p>
                    </div>

                    {/* Interactive Focus Tabs */}
                    <div
                        className="flex flex-wrap gap-1.5 sm:gap-2 pt-0.5"
                        role="tablist"
                        aria-label={`${pillar.title} focus areas`}
                    >
                        {pillar.facets.map((facet) => {
                            const isSelected = facet.id === activeFacet?.id;
                            return (
                                <button
                                    key={facet.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={isSelected}
                                    onClick={() => setSelectedFacetId(facet.id)}
                                    className={cn(
                                        "relative px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-mono tracking-wider uppercase rounded-lg border transition-colors duration-300 cursor-pointer whitespace-nowrap shrink-0",
                                        isSelected
                                            ? "text-background border-foreground"
                                            : "text-muted-foreground border-border/50 hover:text-foreground hover:border-border"
                                    )}
                                >
                                    {isSelected && (
                                        <motion.span
                                            layoutId={`pillar-facet-pill-${pillar.id}`}
                                            transition={{
                                                type: "spring",
                                                stiffness: 380,
                                                damping: 30,
                                            }}
                                            className="absolute inset-0 rounded-lg bg-foreground -z-0"
                                        />
                                    )}
                                    <span className="relative z-10">{facet.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Right Column: Crisp 2x2 Data Grid + Single Concise Active Insight Bar */}
                <div className="md:col-span-7 flex flex-col gap-3 sm:gap-4 md:pl-6 lg:pl-10 md:border-l md:border-border/40">
                    {/* 2x2 Data Grid */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-3.5">
                        {pillar.metrics.map((metric) => (
                            <div
                                key={metric.label}
                                className="p-2.5 sm:p-3.5 rounded-xl border border-border/50 bg-secondary/5 hover:bg-secondary/15 transition-colors duration-300"
                            >
                                <span className="block text-[9px] sm:text-[10px] font-mono tracking-[0.18em] uppercase text-muted-foreground/60 mb-0.5 sm:mb-1">
                                    {metric.label}
                                </span>
                                <span className="text-xs sm:text-sm lg:text-base font-semibold tracking-tight text-foreground tabular-nums leading-snug block">
                                    {metric.value}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Concise Active Focus Line */}
                    {activeFacet && (
                        <div className="px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-border/40 bg-secondary/10">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeFacet.id}
                                    initial={
                                        reducedMotion
                                            ? { opacity: 1 }
                                            : { opacity: 0, y: 4 }
                                    }
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={
                                        reducedMotion
                                            ? { opacity: 0 }
                                            : { opacity: 0, y: -4 }
                                    }
                                    transition={{ duration: 0.16, ease: "easeOut" }}
                                    className="flex flex-col gap-0.5"
                                >
                                    <p className="text-xs sm:text-sm text-foreground/90 font-light leading-relaxed">
                                        {activeFacet.summary}
                                    </p>
                                    <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground/70">
                                        {activeFacet.proof}
                                    </span>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </motion.article>
    );
}
