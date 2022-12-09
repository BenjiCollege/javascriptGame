"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

window.getPokeData = function _callee() {
  var pokemon, randomPokemon, pokemonChoices, _pokemonChoices, firstPokemon, image;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getPokemon());

        case 2:
          pokemon = _context.sent;
          randomPokemon = shuffle(pokemon);
          pokemonChoices = get4Pokemon(randomPokemon);
          _pokemonChoices = _slicedToArray(pokemonChoices, 1), firstPokemon = _pokemonChoices[0];
          image = getPokemonImage(firstPokemon);
          return _context.abrupt("return", {
            pokemonChoices: shuffle(pokemonChoices),
            correct: {
              image: image,
              name: firstPokemon.name
            }
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};

function getPokemon() {
  var res, pokemon;
  return regeneratorRuntime.async(function getPokemon$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(fetch('https://pokeapi.co/api/v2/pokemon?limit=151'));

        case 2:
          res = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(res.json());

        case 5:
          pokemon = _context2.sent;
          return _context2.abrupt("return", pokemon.results);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function shuffle(unshuffled) {
  var shuffled = unshuffled.map(function (value) {
    return {
      value: value,
      sort: Math.random()
    };
  }).sort(function (a, b) {
    return a.sort - b.sort;
  }).map(function (_ref) {
    var value = _ref.value;
    return value;
  });
  return shuffled;
}

function get4Pokemon(randomPokemon) {
  return randomPokemon.splice(0, 4);
}

function getPokemonImage(_ref2) {
  var url = _ref2.url;
  var number = getNumber(url);
  return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/".concat(number, ".png");
}

;

function getNumber(url) {
  var numberRegEx = /(\d+)\/$/;
  return (url.match(numberRegEx) || [])[1];
}

var gameData;
var main = document.querySelector('main');
var pokemonImage = document.querySelector('#pokemon-image');
var textOverlay = document.querySelector('#text-overlay');
var choices = document.querySelector('#choices');
var playBtn = document.querySelector('#play');
playBtn.addEventListener('click', fetchData);
loadVoice();
addAnswerHandler();

function fetchData() {
  return regeneratorRuntime.async(function fetchData$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          resetImage();
          _context3.next = 3;
          return regeneratorRuntime.awrap(window.getPokeData());

        case 3:
          gameData = _context3.sent;
          showSilhouette();
          displayChoices();

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function resetImage() {
  pokemonImage.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';
  main.classList.add('fetching');
  main.classList.remove('revealed');
}

function showSilhouette() {
  main.classList.remove('fetching');
  pokemonImage.src = gameData.correct.image;
}

function displayChoices() {
  var _gameData = gameData,
      pokemonChoices = _gameData.pokemonChoices;
  var choicesHTML = pokemonChoices.map(function (_ref3) {
    var name = _ref3.name;
    return "<button data-name=\"".concat(name, "\">").concat(name, "</button>");
  }).join('');
  choices.innerHTML = choicesHTML;
}

function addAnswerHandler() {
  choices.addEventListener('click', function (e) {
    var name = e.target.dataset.name;
    var resultClass = name === gameData.correct.name ? 'correct' : 'incorrect';
    e.target.classList.add(resultClass);
    revealPokemon();
    speakAnswer();
  });
}

function revealPokemon() {
  main.classList.add('revealed');
  textOverlay.textContent = "".concat(gameData.correct.name, "!");
}

function loadVoice() {
  window.speechSynthesis.onvoiceschanged = function () {
    window.femaleVoice = speechSynthesis.getVoices()[4];
  };
}

function speakAnswer() {
  var utterance = new SpeechSynthesisUtterance(gameData.correct.name);
  utterance.voice = window.femaleVoice;
  utterance.pitch = 0.9;
  utterance.rate = 0.85;
  speechSynthesis.speak(utterance);
}