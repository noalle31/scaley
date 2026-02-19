const { ROOT_OPTIONS, TYPE_OPTIONS } = require("../domain/scale-types");

function createMenu() {
  const state = {
    menu: "root", // "root" || "type"
    selectedIndex: 0,
    selectedRoot: null,
    selectedType: null,
    done: false
  };

  function getState() {
    return {...state};
  }

  function getOptions() {
    return state.menu === "root" ? ROOT_OPTIONS : TYPE_OPTIONS;
  }

  function getTitle() {
    return state.menu === "root" ? "Choose a root" : "Choose a type"
  }

  function moveDown() {
    const options = getOptions();
    if (state.selectedIndex < options.length - 1) {
      state.selectedIndex += 1;
    }
  }

  function moveUp() {
    if (state.selectedIndex > 0) {
      state.selectedIndex -= 1;
    }
  }

  function enter() {
    if (state.menu === "root") {
      state.selectedRoot = ROOT_OPTIONS[state.selectedIndex];
      state.menu = "type";
      state.selectedIndex = 0;
      return null;
    }

    // menu === "type"
    state.selectedType = TYPE_OPTIONS[state.selectedIndex];
    state.done = true;

    return {
      root: state.selectedRoot,
      type: state.selectedType
    };
  }

  function reset() {
    state.menu = "root";
    state.selectedIndex = 0;
    state.selectedRoot = null;
    state.selectedType = null,
    state.done = false;
  }

  return {
    getState,
    getOptions,
    getTitle,
    moveDown,
    moveUp,
    enter,
    reset
  };
}

module.exports = { createMenu };
