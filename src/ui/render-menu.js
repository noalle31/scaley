function renderMenuSection(label, menuName, options, selectedIndex, onOptionsTap) {
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

module.exports = { renderMenuSection };