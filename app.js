const gameBoard = (() => {
  //Module pattern -> use only once

  //create board
  let board = [];

  const makeEmptyElements = () => {
    for (let i = 0; i < 9; i++) {
      board.push('');
    }
  };

  const resetArray = () => {
    board.length = 0;
    makeEmptyElements();
  };

  const modifyBoard = (index, mark) => {
    board[index] = mark;
  };

  makeEmptyElements();

  return { board, resetArray, modifyBoard };
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

  const displayWinner = ({ name }) => {
    const desc = document.querySelector('.desc');
    desc.textContent = `The winner is ${name}`;
    // console.log(winner);
  };

  const displayBtn = () => {
    const container = document.querySelector('.gameboard-container');
    const btn = document.createElement('button');
    btn.classList.add('restart');
    btn.textContent = 'Restart';
    container.appendChild(btn);
  };

  return { displayBoard, displayMark, displayWinner, displayBtn };
})();

const gameController = (() => {
  //initial setting
  const player1 = player('player1', 'O');
  const player2 = player('player2', 'X');
  let currentplayer = player1;

  //display the board on the screen
  displayController.displayBoard();
  const blockBtns = document.querySelectorAll('.block');

  const startPlay = (e) => {
    const blockBtn = e.currentTarget;
    const nodes = [...e.currentTarget.parentElement.children];
    const index = nodes.indexOf(blockBtn);

    const switchPlayer = () => {
      if (currentplayer === player1) {
        currentplayer = player2;
      } else {
        currentplayer = player1;
      }
    };

    if (blockBtn.textContent != '') {
      //if click btn is already taken, don't add mark
      return;
    }
    displayController.displayMark(blockBtn, currentplayer.mark);

    gameBoard.modifyBoard(index, currentplayer.mark);

    checkIfGameIsOver();

    switchPlayer();
  };

  const endPlay = () => {
    blockBtns.forEach((blockBtn) => {
      blockBtn.removeEventListener('click', startPlay);
    });

    //display the restart button
    displayController.displayBtn();
    const btn = document.querySelector('.restart');
    btn.addEventListener('click', restartPlay);
  };

  const checkIfGameIsOver = () => {
    const board = gameBoard.board;
    const target = [];
    //target to check if it includes wining pattern

    const addToTarget = (value, index) => {
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
    };

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

    //check if every board element is filled with something
    board.forEach((value, index) => {
      addToTarget(value, index);
    });

    if (target.length > 4) {
      //check if target.length > 4 (then, compare with winPattern)
      //5 times is minimum size for deciding winner
      let winnerMark = checkPattern();
      let winner;

      if (winnerMark) {
        winner = findWinner(winnerMark);
        displayController.displayWinner(winner);
        //end the game
        endPlay();
      }
    }
  };

  //allow players to add mark on the board using eventListener
  blockBtns.forEach((blockBtn) => {
    blockBtn.addEventListener('click', startPlay);
  });

  // 0313
  const restartPlay = () => {
    //display empty board on the screen
    gameBoard.resetArray();
    displayController.displayBoard();
    //addEventlistener for each board
    currentplayer = player1;
    //I have to declare blockBtns again since I display the new board
    //it is new blockBtns
    const blockBtns = document.querySelectorAll('.block');

    blockBtns.forEach((blockBtn) => {
      blockBtn.addEventListener('click', startPlay);
    });
  };
})();
