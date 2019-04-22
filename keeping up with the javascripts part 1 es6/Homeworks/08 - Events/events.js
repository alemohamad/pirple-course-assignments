let canAddCross = true;

const topLeft = document.getElementById("top-left").querySelector("span");
const topMiddle = document.getElementById("top-middle").querySelector("span");
const topRight = document.getElementById("top-right").querySelector("span");
const centerLeft = document.getElementById("center-left").querySelector("span");
const centerMiddle = document.getElementById("center-middle").querySelector("span");
const centerRight = document.getElementById("center-right").querySelector("span");
const bottomLeft = document.getElementById("bottom-left").querySelector("span");
const bottomMiddle = document.getElementById("bottom-middle").querySelector("span");
const bottomRight = document.getElementById("bottom-right").querySelector("span");

const announceWinner = (player) => {
  alert(player + " has won!");
  resetGame();
}

const announceNoWinners = () => {
  alert("Cats game!");
  resetGame();
}

const board = document.getElementById("game-board");
const allSpans = board.querySelectorAll("span");
for (const item of allSpans) {
  item.addEventListener("click", addPlayerMark);
}

function addPlayerMark(e) {
  const boxTarget = e.target;

  if (boxTarget.innerText !== ".") {
    return;
  }

  boxTarget.classList.remove("cross");
  boxTarget.classList.remove("circle");

  if (canAddCross) {
    boxTarget.innerText = "X";
    boxTarget.classList.add("cross");
    canAddCross = false;
  } else {
    boxTarget.innerText = "O";
    boxTarget.classList.add("circle");
    canAddCross = true;
  }

  setTimeout(checkWinner, 100);
}

function checkWinner() {
  const topLeftText = topLeft.innerText;
  const topMiddleText = topMiddle.innerText;
  const topRightText = topRight.innerText;
  const centerLeftText = centerLeft.innerText;
  const centerMiddleText = centerMiddle.innerText;
  const centerRightText = centerRight.innerText;
  const bottomLeftText = bottomLeft.innerText;
  const bottomMiddleText = bottomMiddle.innerText;
  const bottomRightText = bottomRight.innerText;

  // check horiztonal top
  if (topLeftText === topMiddleText && topMiddleText === topRightText && topLeftText === topRightText && topLeftText !== ".") {
    announceWinner(topLeftText);
    return;
  }

  // check horiztonal middle
  if (centerLeftText === centerMiddleText && centerMiddleText === centerRightText && centerLeftText === centerRightText && centerLeftText !== ".") {
    announceWinner(centerLeftText);
    return;
  }

  // check horiztonal bottom
  if (bottomLeftText === bottomMiddleText && bottomMiddleText === bottomRightText && bottomLeftText === bottomRightText && bottomLeftText !== ".") {
    announceWinner(bottomLeftText);
    return;
  }

  // check vertical left
  if (topLeftText === centerLeftText && centerLeftText === bottomLeftText && topLeftText === bottomLeftText && topLeftText !== ".") {
    announceWinner(topLeftText);
    return;
  }

  // check vertical center
  if (topMiddleText === centerMiddleText && centerMiddleText === bottomMiddleText && topMiddleText === bottomMiddleText && topMiddleText !== ".") {
    announceWinner(topMiddleText);
    return;
  }

  // check vertical right
  if (topRightText === centerRightText && centerRightText === bottomRightText && topRightText === bottomRightText && topRightText !== ".") {
    announceWinner(topRightText);
    return;
  }

  // check diagonal left
  if (topLeftText === centerMiddleText && centerMiddleText === bottomRightText && topLeftText === bottomRightText && topLeftText !== ".") {
    announceWinner(topLeftText);
    return;
  }

  // check diagonal right
  if (topRightText === centerMiddleText && centerMiddleText === bottomLeftText && topRightText === bottomLeftText && topRightText !== ".") {
    announceWinner(topRightText);
    return;
  }

  checkAllCompleted();
}

function checkAllCompleted() {
  const topLeftText = topLeft.innerText;
  const topMiddleText = topMiddle.innerText;
  const topRightText = topRight.innerText;
  const centerLeftText = centerLeft.innerText;
  const centerMiddleText = centerMiddle.innerText;
  const centerRightText = centerRight.innerText;
  const bottomLeftText = bottomLeft.innerText;
  const bottomMiddleText = bottomMiddle.innerText;
  const bottomRightText = bottomRight.innerText;

  if (topLeftText !== "." &&
      topMiddleText !== "." &&
      topRightText !== "." &&
      centerLeftText !== "." &&
      centerMiddleText !== "." &&
      centerRightText !== "." &&
      bottomLeftText !== "." &&
      bottomMiddleText !== "." &&
      bottomRightText !== ".") {
    announceNoWinners();
  }
}

function resetGame() {
  topLeft.innerText = ".";
  topMiddle.innerText = ".";
  topRight.innerText = ".";
  centerLeft.innerText = ".";
  centerMiddle.innerText = ".";
  centerRight.innerText = ".";
  bottomLeft.innerText = ".";
  bottomMiddle.innerText = ".";
  bottomRight.innerText = ".";

  topLeft.classList.remove("cross");
  topMiddle.classList.remove("cross");
  topRight.classList.remove("cross");
  centerLeft.classList.remove("cross");
  centerMiddle.classList.remove("cross");
  centerRight.classList.remove("cross");
  bottomLeft.classList.remove("cross");
  bottomMiddle.classList.remove("cross");
  bottomRight.classList.remove("cross");

  topLeft.classList.remove("circle");
  topMiddle.classList.remove("circle");
  topRight.classList.remove("circle");
  centerLeft.classList.remove("circle");
  centerMiddle.classList.remove("circle");
  centerRight.classList.remove("circle");
  bottomLeft.classList.remove("circle");
  bottomMiddle.classList.remove("circle");
  bottomRight.classList.remove("circle");

  canAddCross = true;
}
