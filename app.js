const lettersOfBoard = ["A", "B", "C", "D", "E", "F", "G", "H"];
const lettersToNumbers = lettersOfBoard.map(letter => letter.charCodeAt(0));
const numbersOfBoard = [1, 2, 3, 4, 5, 6, 7, 8];
const boardDiv = document.querySelector(".board");

let board = [];

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
    div.className = `field ${fieldName} ${fieldNumber} ${i + 1}`;
    div.innerHTML = `${fieldName} ${fieldNumber} ${i + 1}`;
    // div.id = i + 1;
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
    horsie.placeFigure(event);
    clearHighlights();
    showCurrentId(event);
    moveTo();
  });
});

//CHESS KNIGHT OBJECT W/ FUNCTIONS
const horsie = {
  name: "chess knight",
  class: "horsie",

  // numberOfMoves: {
  //   eight: [
  //     ["C3", "C4", "C5", "C6"],
  //     ["D3", "D4", "D5", "D6"],
  //     ["E3", "E4", "E5", "E6"],
  //     ["F3", "F4", "F5", "F6"]
  //   ],
  //   six: [
  //     ["B3", "B4", "B5", "B6"],
  //     ["G3", "G4", "G5", "G6"],
  //     ["C2", "D2", "E2", "F2"],
  //     ["C7", "D7", "E7", "F7"]
  //   ],
  //   four: [
  //     ["A3", "A4", "A5", "A6"],
  //     ["H3", "H4", "H5", "H6"],
  //     ["C1", "D1", "E1", "F1"],
  //     ["C8", "D8", "E8", "F8"],
  //     ["B2"],
  //     ["B7"],
  //     ["G2"],
  //     ["G7"]
  //   ],
  //   three: [["A2"], ["A7"], ["B1"], ["B8"], ["G1"], ["G8"], ["H2"], ["H7"]],
  //   two: [["A1"], ["A8"], ["H1"], ["H8"]]
  // },

  placeFigure: event => {
    const figure = document.querySelector(".horsie");
    const parent = event.target;
    parent.appendChild(figure);
  }
};

// const moveTo = (currentField, num1, num2) => {
//   const targetField = parseInt(currentField) + num1 * column + num2 * row;
//   highlightTarget(targetField);
// };

let currentId;
let idLetter;
let idNumber;
let targetId;
// let targetFields = [];

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
    ? console.log("i do nothing")
    : highlightTarget(targetId[0] + targetId[1]);
  console.log(targetId);
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

// switch (true) {
//   case targetFields.eight
//     .flat()
//     .some(element => targetClass.includes(element)):
//     oneOclock();
//     twoOclock();
//     fourOclock();
//     fiveOclock();
//     sevenOclock();
//     eightOclock();
//     tenOclock();
//     elevenOclock();
//     break;
//   case targetFields.six[0]
//     .flat()
//     .some(element => targetClass.includes(element)):
//     oneOclock();
//     twoOclock();
//     fourOclock();
//     fiveOclock();
//     sevenOclock();
//     elevenOclock();
//     break;
//   case targetFields.six[1]
//     .flat()
//     .some(element => targetClass.includes(element)):
//     oneOclock();
//     fiveOclock();
//     sevenOclock();
//     eightOclock();
//     tenOclock();
//     elevenOclock();
//     break;
//   default:
//     break;
// }
