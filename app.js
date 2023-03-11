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
  const addMark = (player1Mark, player2Mark) => {
    const blockBtns = document.querySelectorAll('.block');
    let player = player1Mark;

    const switchPlayer = () => {
      if (player === player1Mark) {
        player = player2Mark;
      } else {
        player = player1Mark;
      }
    };

    blockBtns.forEach((blockBtn, index) => {
      blockBtn.addEventListener('click', () => {
        //keeps players from playing in spots that are already taken
        if (blockBtn.textContent === player) {
          //if click btn is already taken, don't add mark
          return;
        }
        //change the text
        blockBtn.textContent = player;

        gameBoard.modifyBoard(index, player);
        console.log(gameBoard.board);

        //switch player
        switchPlayer();
      });
    });
  };

  return { displayBoard, addMark };
})();
const gameController = (() => {
  const player1 = player('O');
  const player2 = player('X');

  //display the board on the screen
  displayController.displayBoard();

  const test = document.querySelectorAll('button');
  console.log(test);
  //add game mark
  displayController.addMark(player1.mark, player2.mark);

  //move addEvent here
})();
