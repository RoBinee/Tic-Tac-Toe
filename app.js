const gameBoard = (() => {
  //Module pattern -> use only once

  //create board
  let board = ['X', 'X'];

  return { board };
})();

const DOM = (() => {
  //Module pattern -> use only once

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
})();

const game = () => {
  console.log('game start');
};
