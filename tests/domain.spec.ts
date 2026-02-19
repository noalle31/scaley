import { test, expect } from "@playwright/test";

test("Db Harmonic Minor builds correctly", () => {
    const { buildScale } = require("../src/domain/build-scale.js");

    const scale = buildScale("Db", "Harmonic Minor");
    expect(scale).toBeTruthy();
    expect(scale).toEqual(["Db", "Eb", "Fb", "Gb", "Ab", "Bbb", "C"]);
});

test("key signature count works", () => {
    const { getKeySigCount } = require("../src/domain/key-signature.js");

    expect(getKeySigCount("C")).toBe(0);
    expect(getKeySigCount("G")).toBe(1);
    expect(getKeySigCount("F")).toBe(-1);
});

test("all scales build without error", () => {
    const { buildScale } = require("../src/domain/build-scale.js");
    const { ROOT_OPTIONS, TYPE_OPTIONS } = require("../src/domain/scale-types.js");

    const rootNotes = ROOT_OPTIONS;
    const scaleTypes = TYPE_OPTIONS;
   
    for (const root of rootNotes) {
        for (const scaleType of scaleTypes) {
            const scale = buildScale(root, scaleType);
            expect(scale).toBeTruthy();
            expect(scale.length).toBe(7);
        };
    };
});

test("enharmonic suggestions are returned", () => {
    const { getEnharmonicSuggestion } = require("../src/domain/theoretical-keys.js");

    expect(getEnharmonicSuggestion("Db", "Natural Minor (Aeolian)")).toEqual({
        original: "Db minor",
        suggested: "C# minor"
    });
    expect(getEnharmonicSuggestion("Gb", "Harmonic Minor")).toEqual({
        original: "Gb minor",
        suggested: "F# minor"
    });
    expect(getEnharmonicSuggestion("Gb", "Major (Ionian)")).toBeNull();
});
