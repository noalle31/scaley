const { buildScale } = require("../domain/build-scale");
const { createMenu } = require("../ui/menu");

const readline = require("readline");
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

function clearScreen() {
  if (process.stdout.isTTY) {
    process.stdout.write("\x1b[H\x1b[2J\x1b[3J")
  } else {
    console.clear();
  }
}

function renderOptions(menu) {
  const state = menu.getState();
  const rootOptions = menu.getRootOptions();
  const typeOptions = menu.getTypeOptions();

  clearScreen();

  console.log("Choose root and type");
  console.log("Use left/right to switch, up/down to move, enter to select.\n")

  const leftHeader = `Root${state.activeMenu === "root" ? " (active)" : ""}`;
  const rightHeader = `Type${state.activeMenu === "type" ? " (active)" : ""}`;

  const leftLines = [leftHeader, ...rootOptions.map((opt, idx) => {
    const pointer = idx === state.rootIndex ? "> " : "  ";
    return `${pointer} ${opt}`;
  })];

  const rightLines = [rightHeader, ...typeOptions.map((opt, idx) => {
    const pointer = idx === state.typeIndex ? "> " : "  ";
    return `${pointer} ${opt}`;
  })];

  const rows = Math.max(leftLines.length, rightLines.length);
  const leftWidth = 28;

  for (let i = 0; i < rows; i++) {
    const l = leftLines[i] ?? "";
    const r = rightLines[i] ?? "";
    console.log(l.padEnd(leftWidth) + "  " +r);
  }

  console.log("");
  console.log("Selected root: ", state.selectedRoot ?? "(none)");
  console.log("Selected type: ", state.selectedType ?? "(none)");
}

const menu = createMenu();
renderOptions(menu);

process.stdin.on("keypress", (_str, key) => {
  if (!key) return;

  if (key && key.ctrl && key.name === "c") {
    process.stdin.setRawMode(false)
    process.stdin.pause();
    process.exit();
  }

  const before = menu.getState();
  let handled = true;

  switch (key.name) {
    case "down":
      menu.moveDown();
      break;
    case "up":
      menu.moveUp();
      break;
    case "left":
    case "right":
      menu.toggleActiveMenu();
      break;
    case "return": {
      const picked = menu.enter();
      if (picked) {
        clearScreen();
        console.log("Picked:", picked.root, picked.type);
        console.log(buildScale(picked.root, picked.type));
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.exit();
      }
      break;
    }
    default:
      handled = false;
  }

  if (!handled) return;
  
  const after = menu.getState();
  const changed =
    before.activeMenu !== after.activeMenu ||
    before.rootIndex !== after.rootIndex ||
    before.typeIndex !== after.typeIndex ||
    before.selectedRoot !== after.selectedRoot ||
    before.selectedType !== after.selectedType;

  if (changed) renderOptions(menu);
});
