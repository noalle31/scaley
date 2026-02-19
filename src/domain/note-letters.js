const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];

function noteToLetter(noteName) {
    return noteName[0].toLowerCase(); // Bb -> b
}

function getLetterSequence(root) {
  const rootLetter = root[0].toUpperCase();
  const startIndex = LETTERS.indexOf(rootLetter);

  const sequence = [];

  for (let i = 0; i < LETTERS.length; i++) {
    const letterIndex = (startIndex + i) % LETTERS.length;
    const letter = LETTERS[letterIndex];
    sequence.push(letter);
  }

  return sequence;
}

module.exports = { 
    LETTERS,
    noteToLetter,
    getLetterSequence
};
