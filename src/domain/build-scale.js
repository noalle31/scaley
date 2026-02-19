const { getLetterSequence } = require("./note-letters")
const { NATURAL_PITCH_CLASSES, rootToPc, buildTargetPcs } = require("./pitch-classes");
const SCALE_PATTERNS = require("./scale-types");

function buildScale(root, type) {
  const rootPc = rootToPc(root);

  let pattern;
  if (type === "Major (Ionian)") {
    pattern = SCALE_PATTERNS.MAJOR_PATTERN;
  } else if (type === "Natural Minor (Aeolian)") {
    pattern = SCALE_PATTERNS.NATURAL_MINOR_PATTERN;
  } else if (type === "Harmonic Minor") {
    pattern = SCALE_PATTERNS.HARMONIC_MINOR_PATTERN;
  } else if (type === "Melodic Minor") {
    pattern = SCALE_PATTERNS.MELODIC_MINOR_PATTERN;
  } else if (type === "Dorian") {
    pattern = SCALE_PATTERNS.DORIAN_PATTERN;
  } else if (type === "Phrygian") {
    pattern = SCALE_PATTERNS.PHRYGIAN_PATTERN;
  } else if (type === "Lydian") {
    pattern = SCALE_PATTERNS.LYDIAN_PATTERN;
  } else if (type === "Mixolydian") {
    pattern = SCALE_PATTERNS.MIXOLYDIAN_PATTERN;
  } else if (type === "Locrian") {
    pattern = SCALE_PATTERNS.LOCRIAN_PATTERN;
  }

  if (!pattern) return null;

  const targetPcs = buildTargetPcs(rootPc, pattern);
  const letters = getLetterSequence(root);

  const scaleNotes = [];

  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    const targetPc = targetPcs[i];

    const naturalPc = NATURAL_PITCH_CLASSES[letter];

    const diff = (targetPc - naturalPc + 12) % 12;

    let note = letter;

    if (diff === 0) {
      note = letter;
    } else if (diff === 1) {
      note = `${letter}#`;
    } else if (diff === 2) {
      note = `${letter}##`;
    } else if (diff === 10) {
      note = `${letter}bb`;
    } else if (diff === 11) {
      note = `${letter}b`;
    } else {
      return null;
    }

    scaleNotes.push(note);
  }

  return scaleNotes;
}

module.exports = { 
  buildScale
};
