const { noteToLetter } = require("../domain/note-letters");

function toVexKey(noteName, octave) {
    const letter = noteToLetter(noteName);
    return `${letter}/${octave}`;
}

module.exports = { toVexKey};