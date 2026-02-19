const { ROOT_OPTIONS, TYPE_OPTIONS } = require("../domain/scale-types");

function createMenu() {
  const state = {
    rootIndex: 0,
    typeIndex: 0,
    activeMenu: "root", // "root" || "type"
    selectedIndex: 0,
    selectedRoot: null,
    selectedType: null,
  };

  function getState() {
    return {...state};
  }

  function getRootOptions() {
    return ROOT_OPTIONS;
  }

  function getTypeOptions() {
    return TYPE_OPTIONS;
  }

  function getTitle() {
    return "Choose a root note and a scale type";
  }

  function setActiveMenu(menuName) {
    if (menuName === "root" || menuName === "type") {
      state.activeMenu = menuName;
    }
  }

  function toggleActiveMenu() {
    state.activeMenu = state.activeMenu === "root" ? "type" : "root";
  }

  function moveDown(menuName = state.activeMenu) {
    if (menuName === "root") {
      if (state.rootIndex < ROOT_OPTIONS.length - 1) {
        state.rootIndex += 1;
      }
      return;
    }

    if (state.typeIndex < TYPE_OPTIONS.length - 1) {
      state.typeIndex += 1;
    }
  }

  function moveUp(menuName = state.activeMenu) {
    if (menuName === "root") {
      if (state.rootIndex > 0) {
        state.rootIndex -= 1;
      }
      return;
    }

    if (state.typeIndex > 0) {
      state.typeIndex -= 1;
    }
  } 

  function enter(menuName = state.activeMenu) {
    if (menuName === "root") {
      state.selectedRoot = ROOT_OPTIONS[state.rootIndex];
    } else {
      state.selectedType = TYPE_OPTIONS[state.typeIndex];
    }

    if (state.selectedRoot && state.selectedType) {
      return {
        root: state.selectedRoot,
        type: state.selectedType
      };
    }

    return null;
  }

  function pick(menuName, idx) {
    if (menuName === "root") {
      if (idx >= 0 && idx < ROOT_OPTIONS.length) {
        state.rootIndex = idx;
        state.selectedRoot = ROOT_OPTIONS[idx];
      }
    } else if (menuName === "type") {
      if (idx >= 0 && idx < TYPE_OPTIONS.length) {
        state.typeIndex = idx;
        state.selectedType = TYPE_OPTIONS[idx];
      }
    }

    return state.selectedRoot && state.selectedType
    ? { root: state.selectedRoot, type: state.selectedType }
    : null
  }

  function reset() {
    state.activeMenu = "root";
    state.rootIndex = 0;
    state.typeIndex = 0;
    state.selectedRoot = null;
    state.selectedType = null;
  }

  return {
    getState,
    getRootOptions,
    getTypeOptions,
    getTitle,
    setActiveMenu,
    toggleActiveMenu,
    moveDown,
    moveUp,
    enter,
    pick,
    reset
  };
}

module.exports = { createMenu };
