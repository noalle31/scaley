const { createMenu } = require("../ui/menu");
const { buildScale } = require("../domain/build-scale");
const { renderStaff } = require("../ui/render-staff");

console.log("web-ui loader");

const menu = createMenu();

const titleEl = document.getElementById("title");
const optionsEl = document.getElementById("options");
const headerEl = document.getElementById("header");
const staffEl = document.getElementById("staff");

function render() {
    const state = menu.getState();
    const options = menu.getOptions();

    titleEl.textContent = menu.getTitle();
    headerEl.textContent = "Scaley - The Magical Scale Builder"

    optionsEl.innerHTML = "";

    options.forEach((opt, idx) => {
        const div = document.createElement("div");
        div.textContent = (idx === state.selectedIndex ? "> " : "  ") + opt;
        optionsEl.appendChild(div);
    });

    const stateNow = menu.getState();

    if (stateNow.done && stateNow.selectedRoot && stateNow.selectedType) {
        const notes = buildScale(stateNow.selectedRoot, stateNow.selectedType);
        renderStaff({ 
            root: stateNow.selectedRoot, 
            type: stateNow.selectedType, 
            notes 
        });
    }
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
        e.preventDefault();
        menu.moveDown();
        render();
    }

    if (e.key === "ArrowUp") {
       e.preventDefault();
       menu.moveUp();
       render(); 
    }

    if (e.key === "Enter") {
        e.preventDefault();
        menu.enter();
        render();
    }

    if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        menu.reset();
        render();
        staffEl.innerHTML = "";
    }
});
    
render();
