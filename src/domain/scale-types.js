const ROOT_OPTIONS = [
  "C",
  "G",
  "D",
  "A",
  "E",
  "B",
  "F#",
  "F",
  "Bb",
  "Eb",
  "Ab",
  "Db",
  "Gb"
];

const TYPE_OPTIONS = [
  "Major (Ionian)",
  "Natural Minor (Aeolian)",
  "Harmonic Minor",
  "Melodic Minor",
  "Dorian",
  "Phrygian",
  "Lydian",
  "Mixolydian",
  "Locrian",
];

const MINOR_TYPES = new Set([
    "Natural Minor (Aeolian)",
    "Harmonic Minor",
    "Melodic Minor"
]);

const MODE_TYPES = new Set([
    "Dorian",
    "Phrygian",
    "Lydian",
    "Mixolydian",
    "Locrian"
]);

const MODE_TO_REL_MAJOR_SEMITONES = {
    "Dorian": -2,
    "Phrygian": -4,
    "Lydian": -5,
    "Mixolydian": -7,
    "Locrian": +1
};

const SCALE_PATTERNS = { 
    MAJOR_PATTERN: [2, 2, 1, 2, 2, 2, 1],
    NATURAL_MINOR_PATTERN: [2, 1, 2, 2, 1, 2, 2],
    HARMONIC_MINOR_PATTERN: [2, 1, 2, 2, 1, 3, 1],
    MELODIC_MINOR_PATTERN: [2, 1, 2, 2, 2, 2, 1],
    DORIAN_PATTERN: [2, 1, 2, 2, 2, 1, 2],
    PHRYGIAN_PATTERN: [1, 2, 2, 2, 1, 2, 2],
    LYDIAN_PATTERN: [2, 2, 2, 1, 2, 2, 1],
    MIXOLYDIAN_PATTERN: [2, 2, 1, 2, 2, 1, 2],
    LOCRIAN_PATTERN: [1, 2, 2, 1, 2, 2, 2],
};

module.exports = {
  ROOT_OPTIONS,
  TYPE_OPTIONS,
  MINOR_TYPES,
  MODE_TYPES,
  MODE_TO_REL_MAJOR_SEMITONES,
  ...SCALE_PATTERNS
};