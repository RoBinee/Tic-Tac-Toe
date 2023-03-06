const playboard = ['X', 'X', 'X', 'O', 'O', 'O', 'X', 'X', 'X'];

//3. render playboard array(fill in the array with "x" and "o")
const container = document.querySelector('.container');
function render() {
  //render block elements to container

  //make block element
  container.innerHTML = playboard
    .map((block) => {
      return `<div class="block">${block}</div>`;
    })
    .join('');

  //put them into container
}
render();

//4. build the function
// -> allow players to add marks to a specific spot on the board
// -> letting players click on the gameboard to place their mark
//*keep players from playing in spots that are already taken

//5. build the logic
// -> check for when the game is over

//6. clean up the interface
// -> button to start / restart the game
// -> display element that congradulate the wining player
