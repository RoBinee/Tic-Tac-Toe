const gameBoard = (() => {
  //Module pattern -> use only once

  let board = [];

  makeEmptyElements();

  function resetArray() {
    board.length = 0;
    makeEmptyElements();
  }

  function makeEmptyElements() {
    for (let i = 0; i < 9; i++) {
      board.push('');
    }
  }

  function modifyBoard(index, { mark }) {
    board[index] = mark;
  }

  return { board, resetArray, modifyBoard };
})();

const player = (name, mark, color) => {
  return { name, mark, color };
};

const displayController = (() => {
  //Module pattern -> use only once

  function displayBoard() {
    const container = document.querySelector('.gameboard-container');

    const formatted = gameBoard.board
      .map((element) => {
        return `<button class="block">${element}</button>`;
      })
      .join('');

    //put formatted element in the container
    container.innerHTML = formatted;
  }

  function displayMark(blockBtn, { mark, color }) {
    //fill the empty block with mark
    blockBtn.textContent = mark;
    blockBtn.style.color = color;
  }

  function displayWinner({ name } = false) {
    const desc = document.querySelector('.desc');
    if (!name) {
      desc.textContent = ``;
      return;
    }
    desc.textContent = `The winner is ${name}`;
    // console.log(winner);
  }

  function displayBtn() {
    const container = document.querySelector('.gameboard-container');
    const btn = document.createElement('button');
    btn.classList.add('restart');
    btn.textContent = 'Restart';
    container.appendChild(btn);
  }

  return { displayBoard, displayMark, displayWinner, displayBtn };
})();

const gameController = (() => {
  //initial setting
  const player1 = player('player1', 'O', '#eb737d');
  const player2 = player('player2', 'X', '#00a5ff');
  let currentplayer = player1;

  //display the board on the screen
  displayController.displayBoard();
  let blockBtns = document.querySelectorAll('.block');

  //allow players to add mark on the board using eventListener
  blockBtns.forEach((blockBtn) => {
    blockBtn.addEventListener('click', startPlay);
  });

  function startPlay(e) {
    const blockBtn = e.currentTarget;
    const nodes = [...e.currentTarget.parentElement.children];
    const index = nodes.indexOf(blockBtn);

    if (blockBtn.textContent != '') {
      //if click btn is already taken, don't add mark
      return;
    }
    displayController.displayMark(blockBtn, currentplayer);

    gameBoard.modifyBoard(index, currentplayer);

    checkIfGameIsOver();

    switchPlayer();

    function switchPlayer() {
      if (currentplayer === player1) {
        currentplayer = player2;
      } else {
        currentplayer = player1;
      }
    }
  }

  function endPlay() {
    blockBtns.forEach((blockBtn) => {
      blockBtn.removeEventListener('click', startPlay);
    });

    //display the restart button
    displayController.displayBtn();
    const btn = document.querySelector('.restart');
    btn.addEventListener('click', restartPlay);
  }

  function checkIfGameIsOver() {
    const board = gameBoard.board;
    //target to check if it includes wining pattern
    const target = [];

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

    function addToTarget(value, index) {
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
    }

    function checkIfSameMark(pattern) {
      const board = gameBoard.board;
      if (
        board[pattern[0]] === board[pattern[1]] &&
        board[pattern[0]] === board[pattern[2]]
      ) {
        return board[pattern[0]];
      }
    }

    function findWinner(mark) {
      let winner;
      if (mark === player1.mark) {
        winner = player1;
      } else {
        winner = player2;
      }
      return winner;
    }

    function checkPattern() {
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
    }
  }

  // 0313
  function restartPlay() {
    //display empty board on the screen
    gameBoard.resetArray();
    //addEventlistener for each board
    currentplayer = player1;
    //I have to declare blockBtns again since I display the new board
    //display the board on the screen
    displayController.displayBoard();
    displayController.displayWinner();
    let blockBtns = document.querySelectorAll('.block');

    //allow players to add mark on the board using eventListener
    blockBtns.forEach((blockBtn) => {
      blockBtn.addEventListener('click', startPlay);
    });
  }
})();
