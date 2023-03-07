//test code for simple start
const Gameboard = (() => {
  const board = ['1', '2'];
})();

//Using Gameboard.board, make block element
const container = document.querySelector('.container');
function render() {
  //render the contents of the gameboard array to the webpage

  const blocks = Gameboard.board
    .map((value) => {
      return `<div class="block">${value}</div>`;
    })
    .join('');

  //display blocks on screen
  container.innerHTML = blocks;
}
render();
