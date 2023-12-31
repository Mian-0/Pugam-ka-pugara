const MOVES = {
  FRONT: "front",
  BACK: "back",
};

const MOVES_Sources = {
  FRONT: "./images/front.svg",
  BACK: "./images/back.svg",
};

const comp1 = {
  move: MOVES.FRONT,
};

const comp2 = {
  move: MOVES.BACK,
};
const player1 = {
  move: MOVES.FRONT,
};
/**
 * Page Load
 * Moves Calculate
 * Render UI
 * Who is the winner
 * Inform the winner
 */

const calculateMoves = () => {
  // Randomize Conputer Moves
  const moves = [MOVES.FRONT, MOVES.BACK];
  comp1.move = moves[getRandomIndex()];
  comp2.move = moves[getRandomIndex()];
  // Get user move
  const userMove = prompt("Enter Your Move. front/back");
  if (userMove == null) {
    alert("Invalid Move");
    throw new Error("Invalid Move");
  }
  if (
    userMove.toLowerCase() !== MOVES.FRONT &&
    userMove.toLowerCase() !== MOVES.BACK
  ) {
    alert("Invalid Move");
    throw new Error("Invalid Move");
  }
  player1.move = userMove.toLowerCase();
};

const getRandomIndex = () => {
  return Math.random() > 0.5 ? 1 : 0;
};

const render = () => {
  const comp1Img = document.getElementById("comp1");
  const comp2Img = document.getElementById("comp2");
  const player1Img = document.getElementById("player1");
  // For Computer 1
  if (comp1.move === MOVES.FRONT) {
    comp1Img.src = MOVES_Sources.FRONT;
  } else {
    comp1Img.src = MOVES_Sources.BACK;
  }

  // For Computer 2
  if (comp2.move === MOVES.FRONT) {
    comp2Img.src = MOVES_Sources.FRONT;
  } else {
    comp2Img.src = MOVES_Sources.BACK;
  }

  // For Player 1
  if (player1.move === MOVES.FRONT) {
    player1Img.src = MOVES_Sources.FRONT;
  } else {
    player1Img.src = MOVES_Sources.BACK;
  }
};

const calculateWinner = () => {
  const allMoves = [comp1.move, comp2.move, player1.move];
  const allMovesAreFront = allMoves.every((move) => {
    return move == MOVES.FRONT;
  });
  const allMovesAreBack = allMoves.every((move) => {
    return move == MOVES.BACK;
  });
  if (allMovesAreFront || allMovesAreBack) {
    alert("NoBody won");
    return;
  }
  const results = {
    FRONT: [],
    BACK: [],
  };

  allMoves.forEach((move, index) => {
    if (move == MOVES.FRONT) {
      results.FRONT.push(index);
    } else {
      results.BACK.push(index);
    }
  });
  if (results.BACK.length === 1) {
    // winner move is Back
    announceWinner(
      MOVES.BACK,
      ["Computer 1", "Computer 2", "Player 1"],
      results.BACK[0]
    );
  } else {
    // winner move is Front
    announceWinner(
      MOVES.FRONT,
      ["Computer 1", "Computer 2", "Player 1"],
      results.FRONT[0]
    );
  }
};

const announceWinner = (move, playres, index) => {
  const winner = playres[index];
  const message = `${playres[index]} is the winner. Beacase they chose the mighty move ${move}`;
  alert(message);
};

const main = () => {
  calculateMoves();
  render();
  setTimeout(() => {
    calculateWinner();
    setTimeout(() => {
      const again = confirm("Do You want to play again");
      if (again) {
        main();
      }
    }, 500);
  }, 2000);
};

main();
