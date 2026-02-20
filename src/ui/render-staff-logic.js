const { renderStaff } = require("./render-staff");
const { buildScale } = require("../domain/build-scale");
const { getEnharmonicSuggestion } = require("../domain/theoretical-keys");

function setStaffMode(staffEl, mode) {
    staffEl.dataset.mode = mode;
}

function renderStaffOrMessage(menu, staffEl, clef) {
    const state = menu.getState()

    if (state.selectedRoot && state.selectedType) {
        const suggestion = getEnharmonicSuggestion(state.selectedRoot, state.selectedType);
        if (suggestion) {
            setStaffMode(staffEl, "message");
            staffEl.innerHTML =
            `<p id="staff-message">${suggestion.original} is unavailable. Try ${suggestion.suggested} instead.</p>`;
            return;
        }

        setStaffMode(staffEl, "staff");
        const notes = buildScale(state.selectedRoot, state.selectedType);
        renderStaff({
            root: state.selectedRoot,
            type: state.selectedType,
            notes,
            clef
        });
        return;
    }

    setStaffMode(staffEl, "empty");
    staffEl.innerHTML = "";
}

module.exports = { setStaffMode, renderStaffOrMessage };