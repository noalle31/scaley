const { MINOR_TYPES } = require("./scale-types");

const THEORETICAL_MINOR_SUGGESTIONS = {
    Db: "C# minor",
    Gb: "F# minor"
};

function getEnharmonicSuggestion(root, type) {
    if (!MINOR_TYPES.has(type)) return null;
    const enharmonic = THEORETICAL_MINOR_SUGGESTIONS[root];
    if (!enharmonic) return null;

    return {
        original: `${root} minor`,
        suggested: enharmonic
    };
}

module.exports = {
    getEnharmonicSuggestion
};
