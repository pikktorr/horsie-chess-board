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

const addFields = () => {
  for (let i = 0; i < fields.length; i++) {
    const div = document.createElement("div");
    const fieldName = fields[i][0] + fields[i][1];
    const fieldNumber = numFields[i][0] + numFields[i][1];
    div.className = `field ${fieldName} ${fieldNumber}`;
    fieldNumber % 2 === 0
      ? div.classList.add("black")
      : div.classList.add("white");

    boardDiv.appendChild(div);
  }
};
addFields();

// ACTUAL CHESS BOARD SQUARES
const squares = document.querySelectorAll(".field");

const horsie = {
  name: "chess knight",
  class: "horsie"
};
