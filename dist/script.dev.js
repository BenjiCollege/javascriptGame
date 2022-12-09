"use strict";

var gameData;
var main = document.querySelector('main');
var pokemonImage = document.querySelector('#pokemon-image');
var textOverlay = document.querySelector('#text-overlay');
var choices = document.querySelector('#choices');
var playBtn = document.querySelector('#play');
playBtn.addEventListener('click', fetchData);
addAnswerHandler();
fetchData();

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
          inputBox();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}

var resetImage = function resetImage() {
  pokemonImage.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';
  main.classList.add('fetching');
  main.classList.remove('revealed');
};

var showSilhouette = function showSilhouette() {
  main.classList.remove('fetching');
  pokemonImage.src = gameData.correct.image;
};

var inputBox = function inputBox() {
  var _gameData = gameData,
      pokemonChoices = _gameData.pokemonChoices;
  var choicesInput = pokemonChoices.map(function (_ref) {
    var name = _ref.name;
    return "<input data-name=\"".concat(name, "\"></input>");
  });
  choices.innerHTML = choicesInput;
};

function addAnswerHandler() {
  choices.addEventListener('input', function (e) {
    if (e.target.dataset.name === gameData.correct.name) {
      e.target.classList.add('correct');
      revealPokemon();
    } else {
      e.target.classList.add('incorrect');
    }
  });
}

function revealPokemon() {
  main.classList.add('revealed');
  textOverlay.textContent = "".concat(gameData.correct.name, "!");
} //! DOM manipulation to change the play button text


var playButton = document.querySelectorAll('#play');
playButton.forEach(function (button) {
  button.addEventListener('click', function () {
    button.innerText = "Play again";
  });
}); // function that requires the user to