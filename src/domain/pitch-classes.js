const { ROOT_OPTIONS } = require("./scale-types");

const NATURAL_PITCH_CLASSES = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11
};

function parseRoot(root) {
  const letter = root[0].toUpperCase();

  let accidental = "";
  if (root[1] === "#" || root[1] === "b") {
    accidental = root[1];
  }

  return { letter, accidental };
}

function rootToPc(root) {
  const { letter, accidental } = parseRoot(root);
  
  let pc = NATURAL_PITCH_CLASSES[letter];

  if (accidental === "#") pc += 1;
  if (accidental === "b") pc -= 1;

  return (pc + 12) % 12;
}

function buildTargetPcs(rootPc, pattern) {
  const pcs = [rootPc];

  for (let i = 0; i < pattern.length - 1; i++) {
    const lastPc = pcs[pcs.length - 1];
    const pc = (lastPc + pattern[i]) % 12;
    pcs.push(pc);
  }

  return pcs;
}

function transposeRoot(root, semitones) {
  const targetPc = (rootToPc(root) + semitones + 120 ) % 12;
  return ROOT_OPTIONS.find((r) => rootToPc(r) === targetPc) || root;
}

module.exports = {
  NATURAL_PITCH_CLASSES,
  parseRoot,
  rootToPc,
  buildTargetPcs,
  transposeRoot
};
