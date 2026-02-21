const { LETTERS, noteToLetter } = require("./note-letters");

const LETTER_SEMITONES = {
    C: 0,
    D: 2,
    E: 4,
    F: 5,
    G: 7,
    A: 9,
    B: 11
};

const ACCIDENTAL_OFFSET = {
    "": 0,
    "#": 1,
    "##": 2,
    "b":  -1,
    "bb": -2
};

function getNoteScore(noteName, octave) {
    const letter = noteName[0];
    const accidental = noteName.slice(1);
    return octave * 12 + LETTER_SEMITONES[letter] + ACCIDENTAL_OFFSET[accidental];
}

const RANGES = {
    treble: { 
        low: getNoteScore("C", 4),
        high: getNoteScore("A", 5)
    },
    bass: { 
        low: getNoteScore("E", 2),
        high: getNoteScore("C", 4)
    }
};

function checkInRange(noteName, octave, clef) {
    const score = getNoteScore(noteName, octave);
    const range = RANGES[clef];
    return score >= range.low && score <=range.high;
}

function getClefOctave(clef) {
    if (clef === "treble") return 4;
    if (clef === "bass") return 3;
    return null;
}

function getStartingOctave(notes, clef) {
    const baseOctave = getClefOctave(clef);
    const candidates = clef === "treble"
        ? [baseOctave - 1, baseOctave, baseOctave + 1]
        : [baseOctave + 1, baseOctave, baseOctave - 1];

    for (const startOctave of candidates) {
        let octave = startOctave;
        let prevLetterIndex = null;
        let valid = true;

        for (const n of notes) {
            const letter = noteToLetter(n);
            const letterIndex = LETTERS.indexOf(letter.toUpperCase());

            if (prevLetterIndex !== null && letterIndex <= prevLetterIndex) {
                octave += 1;
            }
            prevLetterIndex = letterIndex;

            if (!checkInRange(n, octave, clef)) {
                valid = false;
                break;
            }
        }
        
        if (valid) return startOctave;
    }
    
    return baseOctave;
}

module.exports = { getStartingOctave };

