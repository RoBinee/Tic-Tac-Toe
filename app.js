const gameBoard = (() => {
  //Module pattern -> use only once

  //create board
  let board = [];

  for (let i = 0; i < 9; i++) {
    board.push('');
  }

  const modifyBoard = (index, mark) => {
    board[index] = mark;
  };

  return { board, modifyBoard };
})();

const player = (name, mark) => {
  return { name, mark };
};

const displayController = (() => {
  //Module pattern -> use only once

  const displayBoard = () => {
    const container = document.querySelector('.gameboard-container');

    const formatted = gameBoard.board
      .map((element) => {
        return `<button class="block">${element}</button>`;
      })
      .join('');

    //put formatted element in the container
    container.innerHTML = formatted;
  };

  const displayMark = (blockBtn, mark) => {
    //fill the empty block with mark
    blockBtn.textContent = mark;
  };

  const displayWinner = (winner) => {
    console.log(winner);
  };

  return { displayBoard, displayMark, displayWinner };
})();

const gameController = (() => {
  const player1 = player('player1', 'O');
  const player2 = player('player2', 'X');
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
      if (blockBtn.textContent != '') {
        //if click btn is already taken, don't add mark
        return;
      }
      displayController.displayMark(blockBtn, currentplayer);

      gameBoard.modifyBoard(index, currentplayer);

      checkIfGameIsOver(gameBoard.board);

      switchPlayer();
    });
  });

  const winingPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //target to check if it includes wining pattern
  const target = [];

  const checkIfGameIsOver = (board) => {
    //check if every board element is filled with something
    board.forEach((value, index) => {
      if (value != '') {
        //the value is filled with mark
        //if blocks is already filled with this index, don't push it
        if (target.includes(index)) {
          return;
        } else {
          target.push(index);
        }
      } else {
        //player haven't choose this block
        return;
      }
    });
    // console.log(target);

    const checkIfSameMark = (pattern) => {
      const board = gameBoard.board;
      if (
        board[pattern[0]] === board[pattern[1]] &&
        board[pattern[0]] === board[pattern[2]]
      ) {
        return board[pattern[0]];
      }
    };
    const findWinner = (mark) => {
      let winner;
      if (mark === player1.mark) {
        winner = player1;
      } else {
        winner = player2;
      }
      return winner;
    };

    const checkPattern = () => {
      //findWiningPattern and check if their makes are the same
      //return the mark
      let result;
      let mark;

      winingPatterns.forEach((pattern) => {
        //compare pattern one by one, now pattern is single array
        //compare all the numbers of pattern is included in target array
        let check = pattern.every((num) => {
          return target.includes(num);
        });

        if (check) {
          //looks like there are marks in a row or a tie
          mark = checkIfSameMark(pattern);
          if (mark) {
            result = mark;
            // return doesn't work in forEach
          }
        }
      });
      //return value from checkPattern method
      return result;
    };

    if (target.length > 4) {
      //check if target.length > 4 (then, compare with winPattern)
      //5 times is minimum size for deciding winner
      let mark = checkPattern();
      let winner;

      if (mark) {
        winner = findWinner(mark);
        displayController.displayWinner(winner);
      }
    }
  };
})();
