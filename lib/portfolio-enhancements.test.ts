import test from "node:test";
import assert from "node:assert/strict";
import {
    computePillarCardTransform,
    getActivePillarIndex,
    getActiveProjectIndex,
    getAdjacentProjectIndices,
    getStackItemDetails,
} from "./portfolio-enhancements";

test("computePillarCardTransform keeps first card at scale 1 at scroll start", () => {
    const transform = computePillarCardTransform(0, 3, 0, false);
    assert.equal(transform.stickyTopOffsetPx, 0);
    assert.equal(transform.scale, 1);
    assert.equal(transform.dimOpacity, 0);
    assert.equal(transform.isStackedUnder, false);
});

test("computePillarCardTransform progressively scales down and dims earlier cards as later cards overlap", () => {
    const midTransform = computePillarCardTransform(0, 3, 0.6, false);
    const endTransform = computePillarCardTransform(0, 3, 1, false);

    assert.ok(midTransform.scale < 1, "First card should scale down when overlapped");
    assert.ok(endTransform.scale < midTransform.scale, "First card should scale down further as third card stacks");
    assert.ok(endTransform.dimOpacity > 0, "Underlying card should receive subtle dim opacity");
    assert.equal(endTransform.isStackedUnder, true);
});

test("computePillarCardTransform respects reducedMotion and top-most card", () => {
    const reduced = computePillarCardTransform(0, 3, 0.9, true);
    assert.equal(reduced.scale, 1);
    assert.equal(reduced.dimOpacity, 0);

    const lastCard = computePillarCardTransform(2, 3, 1, false);
    assert.equal(lastCard.stickyTopOffsetPx, 88);
    assert.equal(lastCard.scale, 1);
    assert.equal(lastCard.dimOpacity, 0);
});

test("getActivePillarIndex maps scroll progress across the 3 pillars accurately", () => {
    assert.equal(getActivePillarIndex(0, 3), 0);
    assert.equal(getActivePillarIndex(0.2, 3), 0);
    assert.equal(getActivePillarIndex(0.45, 3), 1);
    assert.equal(getActivePillarIndex(0.85, 3), 2);
    assert.equal(getActivePillarIndex(1, 3), 2);
});

test("getActiveProjectIndex and getAdjacentProjectIndices resolve project navigation accurately", () => {
    assert.equal(getActiveProjectIndex(0, 6), 0);
    assert.equal(getActiveProjectIndex(0.5, 6), 3);
    assert.equal(getActiveProjectIndex(0.95, 6), 5);

    const adjFirst = getAdjacentProjectIndices(0, 6);
    assert.equal(adjFirst.prevIndex, 5);
    assert.equal(adjFirst.nextIndex, 1);

    const adjLast = getAdjacentProjectIndices(5, 6);
    assert.equal(adjLast.prevIndex, 4);
    assert.equal(adjLast.nextIndex, 0);
});

test("getStackItemDetails returns realistic proficiency and practical usage in English and Turkish", () => {
    const reactEn = getStackItemDetails({ name: "React", icon: "/stack/react.svg" }, "en");
    assert.equal(reactEn.proficiency, "Core Production");
    assert.ok(reactEn.usage.includes("BB84 Quantum"));

    const pythonTr = getStackItemDetails({ name: "Python", icon: "/stack/python.svg" }, "tr");
    assert.equal(pythonTr.proficiency, "Kantitatif & Arka Uç");
    assert.ok(pythonTr.usage.includes("FastAPI"));
});
