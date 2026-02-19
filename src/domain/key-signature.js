const { MINOR_TYPES, MODE_TYPES, MODE_TO_REL_MAJOR_SEMITONES } = require("./scale-types");
const { transposeRoot } = require("./pitch-classes");

const SHARP_ORDER = ["F", "C", "G", "D", "A", "E", "B"];
const FLAT_ORDER  = ["B", "E", "A", "D", "G", "C", "F"];

const MAJOR_KEY_SIG_COUNT = {
  C: 0,
  G: 1,
  D: 2,
  A: 3,
  E: 4,
  B: 5,
  "F#": 6,
  F: -1,
  Bb: -2,
  Eb: -3,
  Ab: -4,
  Db: -5,
  Gb: -6
};

const MINOR_KEY_SIG_COUNT = {
  A: 0,
  E: 1,
  B: 2,
  "F#": 3,
  D: -1,
  G: -2,
  C: -3,
  F: -4,
  Bb: -5,
  Eb: -6,
  Ab: -7
};

function getKeySignature(root, type) {
    if (!root || !type) return null;

    // Major
    if (type === "Major (Ionian)") return root;

    // Minor
    if (MINOR_TYPES.has(type)) return `${root}m`;

    // Modes
    if (MODE_TYPES.has(type)) {
        const semitones = MODE_TO_REL_MAJOR_SEMITONES[type];
        const relativeMajor = transposeRoot(root, semitones);
        return relativeMajor;
    }

    return null;
}

function getKeySigCount(keySig) {
    if (!keySig) return null;

    const isMinor = keySig.endsWith("m");
    const tonic = isMinor ? keySig.slice(0, -1) : keySig;

    if (isMinor) {
        return MINOR_KEY_SIG_COUNT[tonic] ?? null;
    }
    return MAJOR_KEY_SIG_COUNT[tonic] ?? null;
}

function getKeySigAccidentals(count) {
    const map = {}; // letter -> "#" | "b"

    if (count > 0) {
        for (let i = 0; i < count; i++) {
            map[SHARP_ORDER[i]] = "#";
        }
    } else if (count < 0) {
        for (let i = 0; i < Math.abs(count); i++) {
            map[FLAT_ORDER[i]] = "b";
        }
    }

    return map;
}

module.exports = {
    getKeySignature,
    getKeySigCount,
    getKeySigAccidentals
};
