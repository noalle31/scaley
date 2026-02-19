const { buildScale } = require("../domain/build-scale");
const { createMenu } = require("../ui/menu");

const readline = require("readline");
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

function renderOptions(title, options, selectedIndex) {
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);

  console.log(title);

  options.forEach((option, idx) => {
    let prefix;

    if (idx === selectedIndex) {
      prefix = "> ";
    } else {
      prefix = "  ";
    }

    console.log(prefix + option);
  });
}

const menu = createMenu();
renderOptions(menu.getTitle(), menu.getOptions(), menu.getState().selectedIndex);

process.stdin.on("keypress", (str, key) => {
  if (!key) return;

  if (key && key.ctrl && key.name === "c") {
    process.exit();
  }

  if (key.name === "down") {
    menu.moveDown();
  } else if (key.name === "up") {
    menu.moveUp();
  }

  if (key.name === "return") {
    const picked = menu.enter();

    if (picked) {
      console.log("Picked:", picked.root, picked.type);
      console.log(buildScale(picked.root, picked.type));
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.exit();
    } 
  }

  renderOptions(menu.getTitle(), menu.getOptions(), menu.getState().selectedIndex);
});
