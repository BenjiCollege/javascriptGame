"use strict";

//! HTML elements that need to be selected and manipulated
var gameData;
var main = document.querySelector('main');
var pokemonImage = document.querySelector('#pokemon-image');
var textOverlay = document.querySelector('#text-overlay');
var choices = document.querySelector('#choices');
var playBtn = document.querySelector('#play');
playBtn.addEventListener('click', fetchData);
addAnswerHandler();
fetchData(); //! this function is to fetch the data from the api and display the pokemon as a silhouette before the user chooses an answer

function fetchData() {
  return regeneratorRuntime.async(function fetchData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          resetImage();
          _context.next = 3;
          return regeneratorRuntime.awrap(window.getPokeData());

        case 3:
          gameData = _context.sent;
          showSilhouette();
          displayChoices();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
} //! reset the image to a silhouette after the user selects the play again button


var resetImage = function resetImage() {
  pokemonImage.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';
  main.classList.add('fetching');
  main.classList.remove('revealed');
}; //! show the pokemon as a silhouette after the user selects the play again button


var showSilhouette = function showSilhouette() {
  main.classList.remove('fetching');
  pokemonImage.src = gameData.correct.image;
}; //! button box for the user to type in the name of the pokemon
//! the .join('') is to remove the commas between the buttons and concatenate them into one string


var displayChoices = function displayChoices() {
  var _gameData = gameData,
      pokemonChoices = _gameData.pokemonChoices;
  var choicesHTML = pokemonChoices.map(function (_ref) {
    var name = _ref.name;
    return "<button data-name=\"".concat(name, "\">").concat(name, "</button>");
  }).join('');
  choices.innerHTML = choicesHTML;
}; //! add event listener to the button box to check if the user's answer is correct if it is, it will add the class 'correct' to the button, if not, it will add the class 'incorrect' to the button


function addAnswerHandler() {
  choices.addEventListener('click', function (e) {
    var name = e.target.dataset.name;
    var resultClass = name === gameData.correct.name ? 'correct' : 'incorrect';
    e.target.classList.add(resultClass);
    revealPokemon();
  });
} //! reveal the pokemon when the user's answer is correct


function revealPokemon() {
  main.classList.add('revealed');
  textOverlay.textContent = "".concat(gameData.correct.name, "!");
} // when the pokemon is revealed 
//! DOM manipulation to change the play button text


var playButton = document.querySelectorAll('#play');
playButton.forEach(function (button) {
  button.addEventListener('click', function () {
    button.innerText = "Play again";
  });
});