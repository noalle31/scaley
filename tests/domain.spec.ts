import { test, expect } from "@playwright/test";

test("Db Harmonic Minor builds (includes Bbb", () => {
    const { buildScale } = require("../src/domain/build-scale.js");

    const scale = buildScale("Db", "Harmonic Minor");
    expect(scale).toBeTruthy();
    expect(scale).toEqual(["Db", "Eb", "Fb", "Gb", "Ab", "Bbb", "C"]);
});

test("Key signature count works", () => {
    const { getKeySigCount } = require("../src/domain/key-signature.js");

    expect(getKeySigCount("C")).toBe(0);
    expect(getKeySigCount("G")).toBe(1);
    expect(getKeySigCount("F")).toBe(-1);
});