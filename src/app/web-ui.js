const { createMenu } = require("../ui/menu");
const { buildScale } = require("../domain/build-scale");
const { getEnharmonicSuggestion } = require("../domain/theoretical-keys");
const { renderStaff } = require("../ui/render-staff");

console.log("web-ui loader");

const menu = createMenu();

const titleEl = document.getElementById("title");
const optionsEl = document.getElementById("options");
const headerEl = document.getElementById("header");
const staffEl = document.getElementById("staff");

function setStaffMode(mode) {
    staffEl.dataset.mode = mode;
}

function renderMenuSection(label, menuName, options, selectedIndex, activeMenu) {
    const section = document.createElement("div");
    section.className = "menu-section";
    section.dataset.menuSection = menuName;

    const heading = document.createElement("div");
    heading.className = "menu-heading";
    heading.textContent = label;
    section.appendChild(heading);

    options.forEach((opt, idx) => {
        const div = document.createElement("div");
        div.textContent = opt;
        div.dataset.menu = menuName;
        div.dataset.index = String(idx);

        const isSelected = idx === selectedIndex;
        div.classList.toggle("is-selected", isSelected);

        div.style.cursor = "pointer";
        div.addEventListener("click", () => onOptionsTap(menuName, idx));
        section.appendChild(div);
    });

    return section;
}

function renderScaleIfReady() {
    const state = menu.getState()

    if (state.selectedRoot && state.selectedType) {
        const suggestion = getEnharmonicSuggestion(state.selectedRoot, state.selectedType);
        if (suggestion) {
            setStaffMode("message");
            staffEl.innerHTML = `<p id="staff-message">${suggestion.original} is unavailable. Try ${suggestion.suggested} instead.</p>`;
            return;
        }

        setStaffMode("staff");
        const notes = buildScale(state.selectedRoot, state.selectedType);
        renderStaff({
            root: state.selectedRoot,
            type: state.selectedType,
            notes
        });
        return;
    }

    setStaffMode("empty");
    staffEl.innerHTML = "";
}

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
        state.activeMenu
    );

    const typeSection = renderMenuSection(
        "Type",
        "type",
        menu.getTypeOptions(),
        state.typeIndex,
        state.activeMenu
    );

    optionsEl.appendChild(rootSection);
    optionsEl.appendChild(typeSection);

    renderScaleIfReady();
}

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
    setStaffMode("empty");
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
