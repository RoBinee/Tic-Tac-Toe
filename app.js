const gameBoard = (() => {
  //Module pattern -> use only once

  //create board
  let board = [];

  for (let i = 0; i < 9; i++) {
    board.push(' ');
  }

  const modifyBoard = (index, mark) => {
    board[index] = mark;
  };

  return { board, modifyBoard };
})();

const player = (mark) => {
  return { mark };
};

const displayController = (() => {
  //Module pattern -> use only once

  const displayBoard = () => {
    const container = document.querySelector('.gameboard-container');

    //formatting
    const formatted = gameBoard.board
      .map((element) => {
        return `<button class="block">${element}</button>`;
      })
      .join('');

    //inset formatted element in the container
    container.innerHTML = formatted;
  };

  const displayMark = (blockBtn, mark) => {
    if (blockBtn.textContent === mark) {
      //if click btn is already taken, don't add mark
      return;
    }
    //change the text
    blockBtn.textContent = mark;
  };

  return { displayBoard, displayMark };
})();

const gameController = (() => {
  const player1 = player('O');
  const player2 = player('X');
  let currentplayer = player1.mark;

  //display the board on the screen
  displayController.displayBoard();

  const switchPlayer = () => {
    if (currentplayer === player1.mark) {
      currentplayer = player2.mark;
    } else {
      currentplayer = player1.mark;
    }
  };

  //allow players to add mark on the board
  const blockBtns = document.querySelectorAll('.block');

  blockBtns.forEach((blockBtn, index) => {
    blockBtn.addEventListener('click', () => {
      displayController.displayMark(blockBtn, currentplayer);

      gameBoard.modifyBoard(index, currentplayer);
      console.log(gameBoard.board);

      switchPlayer();
    });
  });

  //move addEvent here
})();
