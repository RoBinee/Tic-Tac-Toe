const gameBoard = (() => {
  //Module pattern -> use only once

  //create board
  let board = ['X', 'X'];

  return { board };
})();

const DOM = (() => {
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
    console.log('display Board work');
  };

  displayBoard();

  //*** Add mark function ***/
  //make blockBtns clickable
  const blockBtns = document.querySelectorAll('.block');
  blockBtns.forEach((blockBtn, index) => {
    //use index instead of id
    blockBtn.addEventListener('click', () => {
      //keeps players from playing in spots that are already taken
      if (blockBtn.textContent === 'O') {
        //if click btn is already taken, don't add mark
        return;
      }
      console.log('add mark');
      //change the value
      blockBtn.textContent = 'O';
      //change gameBoard.board too
      //Using index, find blockBtn order in gameBoard.board
      gameBoard.board[index] = 'O';

      console.log(gameBoard.board);
    });
  });

  // return { displayBoard };
})();
const game = () => {
  console.log('game start');
};
