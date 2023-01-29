console.log("Start");

const maze = document.querySelector(".maze");
const scoreEl = document.querySelector("#score");
let score = 0;
let palletsLeft = 144;
const MAX_SCORE = 144;
let width = 21;

const layout = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 1,
  0, 1, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1,
  0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
  1, 0, 0, 0, 0, 9, 0, 9, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 9, 9, 9,
  7, 9, 9, 9, 9, 9, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 9, 0, 0, 3, 3, 3, 0, 0,
  9, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 9, 0, 3, 3, 3, 3, 3, 0, 9, 0, 1, 0, 0,
  0, 0, 9, 9, 9, 9, 1, 9, 9, 0, 3, 3, 3, 3, 3, 0, 9, 9, 1, 9, 9, 9, 9, 0, 0, 0,
  0, 1, 0, 9, 0, 3, 3, 3, 3, 3, 0, 9, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 9, 0,
  0, 0, 0, 0, 0, 0, 9, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 9, 9, 9, 9, 5, 9, 9,
  9, 9, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 9, 0, 9, 0, 0, 0, 0, 1, 0,
  0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1,
  0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1,
  0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

// 0 = wall
// 1 = point
// 2 = cherry
// 3 = lair

let squares = [];

function creatMaze() {
  for (let i = 0; i < layout.length; i++) {
    const square = document.createElement("div");
    maze.appendChild(square);
    squares.push(square);

    switch (layout[i]) {
      case 0:
        squares[i].classList.add("wall");
        break;
      case 1:
        squares[i].classList.add("point");
        break;
      case 2:
        squares[i].classList.add("cherry");
        break;
      case 3:
        squares[i].classList.add("lair");
        break;
    }
  }
}

creatMaze(layout);

let pacmanIndex = 283;
squares[pacmanIndex].classList.add("pacman");

function movePaman(e) {
  squares[pacmanIndex].classList.remove("pacman");

  switch (e.key) {
    case "ArrowLeft":
      if (!squares[pacmanIndex - 1].classList.contains("wall")) {
        pacmanIndex -= 1;
      }
      break;

    case "ArrowRight":
      if (!squares[pacmanIndex + 1].classList.contains("wall")) {
        pacmanIndex += 1;
      }
      break;

    case "ArrowUp":
      if (!squares[pacmanIndex - width].classList.contains("wall")) {
        pacmanIndex -= width;
      }
      break;

    case "ArrowDown":
      if (
        !squares[pacmanIndex + width].classList.contains("wall") &&
        !squares[pacmanIndex + width].classList.contains("lair")
      ) {
        pacmanIndex += width;
      }
      break;
  }

  squares[pacmanIndex].classList.add("pacman");

  checkForPoint();
  checkForCherry();
  checkForGamneOver();
  checkForWin();
}

document.addEventListener("keydown", movePaman);

function checkForPoint() {
  if (squares[pacmanIndex].classList.contains("point")) {
    score++;
    palletsLeft --;
    scoreEl.textContent = score;
    squares[pacmanIndex].classList.remove("point");
    squares[pacmanIndex].classList.add("pacman");
  }
}

function checkForCherry() {
  if (squares[pacmanIndex].classList.contains("cherry")) {
    score += 10;
    scoreEl.textContent = score;
    squares[pacmanIndex].classList.remove("cherry");
    squares[pacmanIndex].classList.add("pacman");
    ghosts.forEach((ghost) => (ghost.isScared = true));
    setTimeout(unScareGhosts, 10000);
  }
}

function unScareGhosts() {
  ghosts.forEach((ghost) => (ghost.isScared = false));
}

class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
    this.isScared = false;
    this.timerId = NaN;
  }
}

let ghosts = [
  new Ghost("blinky", 239, 250),
  new Ghost("pinky", 197, 400),
  new Ghost("inky", 201, 300),
  new Ghost("clyde", 243, 500),
];

// draw ghosts to grid
ghosts.forEach((ghost) => {
  squares[ghost.currentIndex].classList.add(ghost.className);
  squares[ghost.currentIndex].classList.add("ghost");
});

//move each ghost randomly
ghosts.forEach((ghost) => moveGhost(ghost));

//move ghost function
function moveGhost(ghost) {
  const directions = [-1, +1, -width, width];
  let direction = directions[Math.floor(Math.random() * directions.length)];

  ghost.timerId = setInterval(function () {
    // if the square in the direction the ghost is going not containing another ghost or a wall => then he can move here
    if (
      !squares[ghost.currentIndex + direction].classList.contains("wall") &&
      !squares[ghost.currentIndex + direction].classList.contains("ghost")
    ) {
      squares[ghost.currentIndex].classList.remove(
        ghost.className,
        "ghost",
        "scaredGhost"
      );
      ghost.currentIndex += direction;
      squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
    }
    //else => find another direction
    else {
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    //Chack ghost color if scared
    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add("scaredGhost");
    }

    // if pacman gets to ghost when it is scared he can eat it
    if (
      ghost.isScared &&
      squares[ghost.currentIndex].classList.contains("pacman")
    ) {
      squares[ghost.currentIndex].classList.remove(
        "ghost",
        ghost.className,
        "scaredGhost"
      );
      score += 100;
      ghost.currentIndex = ghost.startIndex;
      squares[ghost.currentIndex].classList.add("ghost", ghost.className);
    }
    checkForGamneOver();
  }, ghost.speed);
}

function checkForGamneOver() {
  if (
    squares[pacmanIndex].classList.contains("ghost") &&
    !squares[pacmanIndex].classList.contains("scaredGhost")
  ) {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    document.removeEventListener("keydown", movePaman);
    alert("Game Over");
  }
}

function checkForWin() {
  if (palletsLeft == 0) {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    document.removeEventListener("keydown", movePaman);
    setTimeout(() => {alert("You Win!")}, 500)
  }
}
