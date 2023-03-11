const gameBoard = (() => {
  //Module pattern -> use only once

  //create board
  let board = [];

  for (let i = 0; i < 9; i++) {
    board.push(' ');
  }

  return { board };
})();

const player = (mark) => {
  return { mark };
};

const displayController = (() => {
  //Module pattern -> use only once

  //*** Display board function ***/
  const displayBoard = () => {
    //**display gameBoard.board on the screen
    const container = document.querySelector('.gameboard-container');

    //format every board content
    const board = gameBoard.board;
    const formatted = board
      .map((element) => {
        return `<button class="block">${element}</button>`;
      })
      .join('');

    //inset formatted element in the container
    container.innerHTML = formatted;
  };

  //*** Add mark function ***/
  const addMark = () => {
    //make blockBtns clickable
    const blockBtns = document.querySelectorAll('.block');

    blockBtns.forEach((blockBtn, index) => {
      blockBtn.addEventListener('click', () => {
        //keeps players from playing in spots that are already taken
        if (blockBtn.textContent === 'O') {
          //if click btn is already taken, don't add mark
          return;
        }
        //change the value
        blockBtn.textContent = 'O';

        //Using index, find blockBtn order in gameBoard.board and modify gameBoard.board too
        gameBoard.board[index] = 'O';
        // console.log(gameBoard.board);

        //switch player

        // switch player end
      });
    });
  };

  return { displayBoard, addMark };
})();
const gameController = (() => {
  //display the board on the screen
  displayController.displayBoard();
  //add game mark
  displayController.addMark();
})();
