const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental, Barline, Annotation } = require("vexflow");
const { LETTERS, noteToLetter } = require("../domain/note-letters");
const { getKeySignature, getKeySigCount, getKeySigAccidentals } = require("../domain/key-signature");
const { getStaffLayout } = require("./staff-layout");

function renderStaff(payload) {
    const staffEl = document.getElementById("staff");
    staffEl.innerHTML = ""; // clear previous render
    if (!payload) return;

    const { root, type, notes: scaleNotes } = payload;
    if (!Array.isArray(scaleNotes) || scaleNotes.length === 0) return;

    const { context, stave, staveWidth } = buildStaff(staffEl, root, type);

    const notesToRender = [...scaleNotes, scaleNotes[0]];
    const keyAccidentals = buildKeyAccidentals(root, type);

    const vexNotes = buildScaleStaveNotes(notesToRender, keyAccidentals);

    drawNotes(context, stave, vexNotes, staveWidth);
}

function buildStaff(staffEl, root, type) {
    const { width, height, x, y, staveWidth } = getStaffLayout(staffEl);

    // Create a drawing surface inside staffEl using SVG.
    const renderer = new Renderer(staffEl, Renderer.Backends.SVG);
    renderer.resize(width, height);

    // Get the drawing API for that surface
    const context = renderer.getContext();

    // Use the API to render graphics
    const stave = new Stave(x, y, staveWidth);
    stave.addClef("treble");
    
    const keySig = getKeySignature(root, type);
    if (keySig) stave.addKeySignature(keySig);

    stave.setEndBarType(Barline.type.END);
    stave.setContext(context).draw();

    return { context, stave, staveWidth };
}

function buildKeyAccidentals(root, type) {
    const keySig = getKeySignature(root, type);
    if(!keySig) return {};

    const count = getKeySigCount(keySig);
    if (count == null) return {};

    return getKeySigAccidentals(count);
}

function toVexKey(noteName, octave) {
    const letter = noteToLetter(noteName);
    return `${letter}/${octave}`;
}

function buildScaleStaveNotes(notes, keyAccidentals) {
    const rootLetter = noteToLetter(notes[0]); // "a" or "b" etc.
    let octave = (rootLetter === "a" || rootLetter === "b" ? 3 : 4);

    let prevLetterIndex = null;

    return notes.map((n) => {
        const letter = noteToLetter(n);
        const letterIndex = LETTERS.indexOf(letter.toUpperCase());
        if (prevLetterIndex !== null && letterIndex <= prevLetterIndex) {
            octave += 1;
        }
        prevLetterIndex = letterIndex;

        const key = toVexKey(n, octave);

        const staveNote = new StaveNote({
            clef: "treble",
            keys: [key],
            duration: "q"
        });

        addAccidentals(staveNote, n, keyAccidentals);

        // Add the note letter under staff notes ("G", "Ab", etc.)
        const annotation = new Annotation(n);
        annotation.setFontSize(16);
        annotation.setVerticalJustification(Annotation.VerticalJustify.BOTTOM);
        staveNote.addModifier(annotation, 0);

        return staveNote;
    });
}

function addAccidentals(staveNote, n, keyAccidentals) {
    const displayLetter = n[0].toUpperCase(); // "B" from "Bbb"
    const accidental = n.slice(1); // "" | "#" | "##" | "b" | "bb"

    const implied = keyAccidentals[displayLetter] || ""; // "" | "#" | "b"

    // show nothing if it matches the key signature
    if (accidental === implied) return;

    // if key sig implies sharp/flat but note is natural, show natural
    if (accidental === "" && implied !== "") {
        staveNote.addModifier(new Accidental("n"), 0);
        return;
    }

    // otherwise show the written accidental
    if (accidental !== "") {
        staveNote.addModifier(new Accidental(accidental), 0);
    }
}

function drawNotes(context, stave, vexNotes, staveWidth) {
    const voice = new Voice({ numBeats: vexNotes.length, beatValue: 4 });
    voice.addTickables(vexNotes);

    new Formatter().joinVoices([voice]).format([voice], Math.max(420, staveWidth - 110));
    voice.draw(context, stave);
}

module.exports = { renderStaff };
