import type { StackItem } from "../types/stack";

export interface PillarCardTransform {
    stickyTopOffsetPx: number;
    scale: number;
    dimOpacity: number;
    isStackedUnder: boolean;
}

/**
 * Computes deterministic overlap & stacking transforms for a card in the Three Pillars
 * scrollytelling sequence.
 */
export function computePillarCardTransform(
    cardIndex: number,
    totalCards: number,
    scrollProgress: number,
    reducedMotion = false
): PillarCardTransform {
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
    const stepSize = totalCards > 1 ? 1 / totalCards : 1;
    const stickyTopOffsetPx = cardIndex * 44;

    if (reducedMotion || cardIndex >= totalCards - 1) {
        return {
            stickyTopOffsetPx,
            scale: 1,
            dimOpacity: 0,
            isStackedUnder: false,
        };
    }

    // Card `cardIndex` begins being overlapped once scroll passes `(cardIndex + 1) * stepSize - stepSize * 0.5`
    const overlapStart = (cardIndex + 0.5) * stepSize;
    const overlapEnd = 1;
    const remainingDepth = totalCards - 1 - cardIndex;

    if (clampedProgress <= overlapStart) {
        return {
            stickyTopOffsetPx,
            scale: 1,
            dimOpacity: 0,
            isStackedUnder: false,
        };
    }

    const rawOverlap = (clampedProgress - overlapStart) / Math.max(0.0001, overlapEnd - overlapStart);
    const overlapFactor = Math.max(0, Math.min(1, rawOverlap));

    // Subtle scale reduction as subsequent cards slide over this card
    const maxScaleReduction = remainingDepth * 0.03;
    const scale = Number((1 - overlapFactor * maxScaleReduction).toFixed(4));
    const dimOpacity = Number((overlapFactor * 0.28).toFixed(4));

    return {
        stickyTopOffsetPx,
        scale,
        dimOpacity,
        isStackedUnder: overlapFactor > 0.05,
    };
}

/**
 * Determines which pillar index (0..totalCards-1) is currently active for the side indicator.
 */
export function getActivePillarIndex(scrollProgress: number, totalCards: number): number {
    if (totalCards <= 1) return 0;
    const clamped = Math.max(0, Math.min(0.9999, scrollProgress));
    return Math.min(totalCards - 1, Math.floor(clamped * totalCards));
}

/**
 * Maps horizontal section scroll progress (0..1) to the currently centered project index (0..totalProjects-1).
 */
export function getActiveProjectIndex(scrollProgress: number, totalProjects: number): number {
    if (totalProjects <= 1) return 0;
    // Account for the intro panel (~0.12) and end panel (~0.88) in the horizontal track
    const normalized = (scrollProgress - 0.1) / 0.78;
    const clamped = Math.max(0, Math.min(0.9999, normalized));
    return Math.min(totalProjects - 1, Math.floor(clamped * totalProjects));
}

/**
 * Returns the wrapped previous and next project indices for modal case-study navigation.
 */
export function getAdjacentProjectIndices(currentIndex: number, totalProjects: number): { prevIndex: number; nextIndex: number } {
    if (totalProjects <= 1) return { prevIndex: 0, nextIndex: 0 };
    const safeCurrent = ((currentIndex % totalProjects) + totalProjects) % totalProjects;
    return {
        prevIndex: (safeCurrent - 1 + totalProjects) % totalProjects,
        nextIndex: (safeCurrent + 1) % totalProjects,
    };
}

export interface StackTechMetadata {
    proficiency: string;
    usage: string;
}

const EN_STACK_DETAILS: Record<string, StackTechMetadata> = {
    "React": {
        proficiency: "Core Production",
        usage: "Component architecture and interactive state for BB84 Quantum simulator, RL Trading dashboard, and Nuvora."
    },
    "Next.js": {
        proficiency: "Primary Framework",
        usage: "App Router, localized server rendering, and zero-CLS page choreography across client and personal platforms."
    },
    "Tailwind CSS": {
        proficiency: "Core Production",
        usage: "Design token systems, fluid responsive grids, and monochrome dark/light editorial interfaces."
    },
    "Bootstrap": {
        proficiency: "Foundational",
        usage: "Rapid layout prototyping and maintaining legacy responsive client web properties."
    },
    "Framer Motion": {
        proficiency: "Advanced Choreography",
        usage: "Scroll-linked transforms, spring physics, shared layoutId transitions, and modal orchestration."
    },
    "TypeScript": {
        proficiency: "Core Production",
        usage: "Strict end-to-end type safety across React frontends, data loaders, and API contracts."
    },
    "JavaScript": {
        proficiency: "Core Production",
        usage: "Custom 2D canvas particle engines, pendulum physics loops, and DOM performance optimization."
    },
    "HTML5": {
        proficiency: "Core Production",
        usage: "Semantic document structure, accessible dialog trees, and interactive canvas surfaces."
    },
    "CSS3": {
        proficiency: "Core Production",
        usage: "Custom oklch color tokens, keyframe marquee tracks, and hardware-accelerated compositing."
    },
    "Node.js": {
        proficiency: "Active Workflow",
        usage: "Full-stack runtime, build automation scripts, and asynchronous API integrations."
    },
    "C": {
        proficiency: "Systems Foundation",
        usage: "Memory management, pointer arithmetic, and low-level computer engineering coursework at SLRTCE."
    },
    "Python": {
        proficiency: "Quantitative & Backend",
        usage: "FastAPI backends, BB84 QBER quantum simulation logic, and Gymnasium PPO reinforcement learning agents."
    },
    "MySQL": {
        proficiency: "Relational Data",
        usage: "Structured schema design, indexing, and transactional queries for web applications."
    },
    "Git": {
        proficiency: "Daily Workflow",
        usage: "Branching workflows, atomic commit history, and version control across all engineering repositories."
    },
    "Vercel": {
        proficiency: "Deployment & Edge",
        usage: "Automated CI/CD previews, edge caching, and production hosting for Next.js applications."
    },
    "Github": {
        proficiency: "Daily Workflow",
        usage: "Open-source repository hosting, code reviews, and project release management."
    },
    "Figma": {
        proficiency: "Interface Design",
        usage: "Wireframing editorial layouts, typographic hierarchies, and high-converting landing pages for Nuvora."
    }
};

const TR_STACK_DETAILS: Record<string, StackTechMetadata> = {
    "React": {
        proficiency: "Ana Üretim",
        usage: "BB84 Kuantum simülatörü, RL Trading paneli ve Nuvora için bileşen mimarisi ve etkileşimli durum yönetimi."
    },
    "Next.js": {
        proficiency: "Birincil Çatı",
        usage: "App Router, çok dilli sunucu taraflı oluşturma ve yüksek dönüşümlü web platformları."
    },
    "Tailwind CSS": {
        proficiency: "Ana Üretim",
        usage: "Tasarım belirteçleri, duyarlı ızgara sistemleri ve monokrom editoryal arayüzler."
    },
    "Bootstrap": {
        proficiency: "Temel Yetkinlik",
        usage: "Hızlı prototipleme ve mevcut müşteri web arayüzlerinin bakımı."
    },
    "Framer Motion": {
        proficiency: "İleri Koreografi",
        usage: "Kaydırma tabanlı dönüşümler, yay fiziği ve paylaşılan layoutId geçişleri."
    },
    "TypeScript": {
        proficiency: "Ana Üretim",
        usage: "React arayüzleri, veri yükleyiciler ve API şemalarında uçtan uca tip güvenliği."
    },
    "JavaScript": {
        proficiency: "Ana Üretim",
        usage: "Özel 2B kanvas parçacık motorları, sarkaç fiziği döngüleri ve DOM optimizasyonu."
    },
    "HTML5": {
        proficiency: "Ana Üretim",
        usage: "Semantik belge yapısı, erişilebilir iletişim kutuları ve etkileşimli kanvas yüzeyleri."
    },
    "CSS3": {
        proficiency: "Ana Üretim",
        usage: "Özel oklch renk değişkenleri, kayan yazı animasyonları ve donanım hızlandırmalı katmanlar."
    },
    "Node.js": {
        proficiency: "Aktif İş Akışı",
        usage: "Sunucu çalışma zamanı, otomasyon betikleri ve asenkron API entegrasyonları."
    },
    "C": {
        proficiency: "Sistem Temeli",
        usage: "Bellek yönetimi, алгоритmik veri yapıları ve bilgisayar mühendisliği sistem çalışmaları."
    },
    "Python": {
        proficiency: "Kantitatif & Arka Uç",
        usage: "FastAPI servisleri, BB84 QBER kuantum hesaplama motoru ve Gymnasium PPO işlem ajanları."
    },
    "MySQL": {
        proficiency: "İlişkisel Veri",
        usage: "Yapılandırılmış veritabanı şeması tasarımı ve web uygulamaları için sorgu optimizasyonu."
    },
    "Git": {
        proficiency: "Günlük İş Akışı",
        usage: "Dallanma stratejileri, temiz sürüm geçmişi ve kaynak kod yönetimi."
    },
    "Vercel": {
        proficiency: "Dağıtım & Bulut",
        usage: "Next.js uygulamaları için otomatik CI/CD önizlemeleri ve yüksek hızlı barındırma."
    },
    "Github": {
        proficiency: "Günlük İş Akışı",
        usage: "Açık kaynak proje barındırma, sürüm takibi ve işbirliği."
    },
    "Figma": {
        proficiency: "Arayüz Tasarımı",
        usage: "Editoryal düzenler, tipografik hiyerarşi ve Nuvora için yüksek dönüşümlü sayfa tasarımları."
    }
};

export function getStackItemDetails(item: StackItem, locale: string = "en"): StackTechMetadata {
    if (item.proficiency && item.usage) {
        return {
            proficiency: item.proficiency,
            usage: item.usage,
        };
    }

    const catalog = locale === "tr" ? TR_STACK_DETAILS : EN_STACK_DETAILS;
    const match = catalog[item.name];
    if (match) {
        return {
            proficiency: item.proficiency || match.proficiency,
            usage: item.usage || match.usage,
        };
    }

    return {
        proficiency: item.proficiency || (locale === "tr" ? "Aktif Kullanım" : "Active Workflow"),
        usage: item.usage || (locale === "tr"
            ? `${item.name} ile modern web ve yazılım sistemleri geliştirme.`
            : `Production implementation and architecture with ${item.name}.`),
    };
}
