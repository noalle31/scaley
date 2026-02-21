const { createMenu } = require("../ui/menu");
const { renderStaffOrMessage, setStaffMode } = require("../domain/render-staff-logic");
const { renderMenuSection } = require("../ui/render-menu");

const titleEl = document.getElementById("title");
const optionsEl = document.getElementById("options");
const headerEl = document.getElementById("header");
const staffEl = document.getElementById("staff");
const clefToggleEl = document.getElementById("clef-toggle");

const menu = createMenu();
let clef = "treble";

function render() {
    const state = menu.getState();

    titleEl.textContent = menu.getTitle();
    headerEl.textContent = "Scaley - The Magical Scale Builder"

    optionsEl.innerHTML = "";

    const rootSection = renderMenuSection(
        "Root",
        "root",
        menu.getRootOptions(),
        state.rootIndex,
        onOptionsTap
    );

    const typeSection = renderMenuSection(
        "Type",
        "type",
        menu.getTypeOptions(),
        state.typeIndex,
        onOptionsTap
    );

    optionsEl.appendChild(rootSection);
    optionsEl.appendChild(typeSection);

    renderStaffOrMessage(menu, staffEl, clef);
}

function onClefToggleTap() {
    if (clef === "treble") {
        clef = "bass";
        clefToggleEl.textContent = "Bass"
    } else {
        clef = "treble";
        clefToggleEl.textContent = "Treble"
    }

    render();
}

clefToggleEl.addEventListener("click", () => {
    onClefToggleTap();
});

function onOptionsTap(menuName, idx) {
    menu.setActiveMenu(menuName);
    menu.pick(menuName, idx);
    render();
}

function onMoveDown() {
    menu.moveDown();
    render();
}

function onMoveUp() {
    menu.moveUp();
    render();
}

function onMoveLeftOrRight() {
    menu.toggleActiveMenu();
    render();
}

function onEnter() {
    menu.enter();
    render();
}

function onReset() {
    menu.reset();
    render();
    setStaffMode(staffEl, "empty");
    staffEl.innerHTML = "";
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
        e.preventDefault();
        onMoveDown();
    }

    if (e.key === "ArrowUp") {
       e.preventDefault();
       onMoveUp();
    }

    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        onMoveLeftOrRight();
    }

    if (e.key === "Enter") {
        e.preventDefault();
        onEnter();
    }

    if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        onReset();
    }
});

render();
