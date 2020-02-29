const lettersOfBoard = ["A", "B", "C", "D", "E", "F", "G", "H"];
const lettersToNumbers = lettersOfBoard.map(letter => letter.charCodeAt(0));
const numbersOfBoard = [1, 2, 3, 4, 5, 6, 7, 8];
const container = document.querySelector(".container");
const boardDiv = document.querySelector(".board");
let board = [];

//CREATING LETTER LEGEND FOR THE BOARD
const lettersLegend = classname => {
  const letters = document.createElement("div");
  letters.className = `${classname} letters legend`;

  lettersOfBoard.map(letter => {
    const div = document.createElement("div");
    div.className = `letter ${letter}`;
    div.innerHTML = `${letter}`;
    letters.appendChild(div);
  });
  container.appendChild(letters);
};
lettersLegend("upper");
lettersLegend("bottom");

//CREATING NUMBER LEGEND FOR THE BOARD
const numbersLegend = classname => {
  const numbers = document.createElement("div");
  numbers.className = `${classname} numbers legend`;

  numbersOfBoard.map(number => {
    const div = document.createElement("div");
    div.className = `number ${number}`;
    div.innerHTML = `${number}`;
    numbers.appendChild(div);
  });
  container.appendChild(numbers);
};
numbersLegend("left");
numbersLegend("right");

const numberLoop = i => {
  for (let j = 0; j < numbersOfBoard.length; j++) {
    board[i][j] = [lettersOfBoard[j]];
    board[i][j][1] = numbersOfBoard[i];
  }
};

const nameFields = (letters, numbers) => {
  for (let i = 0; i < letters.length; i++) {
    board[i] = [];
    for (let j = 0; j < numbers.length; j++) {
      board[i][j] = [letters[j]];
      board[i][j][1] = numbers[i];
    }
  }
  return board.flat();
};

const fields = nameFields(lettersOfBoard, numbersOfBoard);
const numFields = nameFields(lettersToNumbers, numbersOfBoard);

const blackOrWhite = (number, element) => {
  number % 2 === 0
    ? element.classList.add("black")
    : element.classList.add("white");
};

const addFields = () => {
  for (let i = 0; i < fields.length; i++) {
    const div = document.createElement("div");
    const fieldName = fields[i][0] + fields[i][1];
    const fieldNumber = numFields[i][0] + numFields[i][1];
    div.className = `field ${fieldName} ${fieldNumber}`;
    // div.innerHTML = `${fieldName} ${fieldNumber} ${i + 1}`;
    div.id = fieldName;
    blackOrWhite(fieldNumber, div);
    boardDiv.appendChild(div);
  }
};
addFields();

// ACTUAL CHESS BOARD SQUARES
const squares = document.querySelectorAll(".field");
const squareEvent = squares.forEach(square => {
  square.addEventListener("click", event => {
    if (moveCounter === 0) {
      placeFigure(event);
      showCurrentId(event);
      moveTo();
      numberOfMoves();
    } else if (event.target.className.includes("highlight")) {
      placeFigure(event);
      showCurrentId(event);
      moveTo();
      numberOfMoves();
    }
  });
});

let moveCounter = 0;
console.log(moveCounter);

const placeFigure = event => {
  const figure = document.querySelector(".horsie");
  const parent = event.target;
  parent.appendChild(figure);
  moveCounter++;
  console.log(moveCounter);
  clearHighlights();
};

let currentId;
let idLetter;
let idNumber;
let targetId;

const showCurrentId = event => {
  currentId = [event.target.id[0], parseInt(event.target.id[1])];
  idLetter = lettersOfBoard.indexOf(currentId[0]);
  idNumber = numbersOfBoard.indexOf(currentId[1]);
  return currentId, idLetter, idNumber;
};

const showTargetId = (num1, num2) => {
  targetId = [
    lettersOfBoard[idLetter + num1],
    parseInt(numbersOfBoard[idNumber + num2])
  ];

  targetId[0] === undefined || numbersOfBoard.includes(targetId[1]) === false
    ? {} //if true, do nothing
    : highlightTarget(targetId[0] + targetId[1]); // if false, do this
  return targetId;
};

const moveTo = () => {
  const oneOclock = showTargetId(1, -2);
  const twoOclock = showTargetId(2, -1);
  const fourOclock = showTargetId(2, 1);
  const fiveOclock = showTargetId(1, 2);
  const sevenOclock = showTargetId(-1, 2);
  const eightOclock = showTargetId(-2, 1);
  const tenOclock = showTargetId(-2, -1);
  const elevenOclock = showTargetId(-1, -2);
};

const highlightTarget = target => {
  const targetDiv = document.getElementById(target);
  targetDiv.classList.add("highlight");
};

const clearHighlights = () => {
  const targetDivs = document.querySelectorAll(".field");
  targetDivs.forEach(div => div.classList.remove("highlight"));
};

const numberOfMoves = () => {
  const instructions = document.querySelector(".instructions");
  const highlighted = document.querySelectorAll(".highlight");
  instructions.innerHTML = `You have ${highlighted.length} valid moves`;
};
