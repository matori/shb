import deepFreeze from "deep-freeze"

const keyNames = {
  enter: "Enter",
  tab: "Tab",
  space: " ",
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
  home: "Home",
  end: "End",
  pageUp: "PageUp",
  pageDown: "PageDown",
  escape: "Escape"
}

const KEY_NAMES = deepFreeze(keyNames)

export default KEY_NAMES
