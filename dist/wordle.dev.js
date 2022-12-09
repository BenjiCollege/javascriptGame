"use strict";

// 1. Store an alphabet - letters on the keypad
// ---------------------
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; // ---------------------
// 2. Insert the letters directly into the HTML
// ---------------------

var insertLetters = function insertLetters() {
  var letterContainer = document.querySelector(".alphabet");
  alphabet.forEach(function (letter) {
    var letterHTML = "<button>".concat(letter, "</button>");
    letterContainer.innerHTML += letterHTML;
  });
};

insertLetters(); // ---------------------
// 3. Get random word from words array and store it in a variable called randomWord;
// ---------------------

var randomWord = "";

var getRandomWord = function getRandomWord() {
  randomWord = words[Math.floor(Math.random() * words.length)];
  return randomWord;
}; // ---------------------
// 4. Insert the word into the HTML document
// ---------------------


var createWordHTML = function createWordHTML(letter) {
  return "<p data-letter=\"".concat(letter, "\">_<p>");
};

var clue = document.querySelector(".hidden-letters");

var displayPuzzle = function displayPuzzle(word) {
  for (var i = 0; i < word.length; i++) {
    var letter = word[i];
    var wordHTML = createWordHTML(letter);
    clue.innerHTML += wordHTML;
  }
}; // -------------------------------------------------
// 5. Create the event listener for starting our game
// -------------------------------------------------


var startButton = document.querySelector(".button--start");
var overlay = document.getElementById("overlay");
startButton.addEventListener('click', function () {
  // hide the welcome page
  overlay.style.display = "none"; //generate new random word

  randomWord = getRandomWord(); // display _ _ _ istead of the word

  displayPuzzle(randomWord); // display the starting lives

  displayHearts();
  return;
}); // ---------------------
// 6. Listen for events on every letter - And see if the clicked letter matches a letter from the word
// ---------------------

var letterButton = document.querySelectorAll(".alphabet button");
letterButton.forEach(function (button) {
  // 6.1 Add an event listener for each letter (button) at the bottom of the screen
  button.addEventListener('click', function () {
    // 6.2 change the background of the tile
    button.style.backgroundColor = "black";
    checkIfLetterExists(button.innerHTML); // 6.3 loose a life if there is no match

    loseOneLife();
    isLifeLost = true;
  });
});

var checkIfLetterExists = function checkIfLetterExists(letter) {
  // Go through each of our hidden letter dom elements
  var hiddenLetterElements = document.querySelectorAll(".hidden-letters p");
  hiddenLetterElements.forEach(function (hiddenLetterElement) {
    // if the letter is hidden, and it's the letter we're looking for, show it
    var isHidden = hiddenLetterElement.innerHTML == "_";
    var elementLetter = hiddenLetterElement.dataset.letter;

    if (isHidden && elementLetter == letter) {
      // show the letter if it's hidden in here
      hiddenLetterElement.innerHTML = letter;
      isLifeLost = false;
    }
  });
}; //------------------------------
// 7. Create the event listner to start a new game
//------------------------------


var newGame = document.querySelector(".button--new");
newGame.addEventListener('click', function () {
  // get a new random word
  clue.innerHTML = "";
  randomWord = getRandomWord(); // display _ _ _ istead of the word

  displayPuzzle(randomWord); // clear the letter colors

  letterButton.forEach(function (button) {
    button.style.background = "#4E5283";
  }); // reset the lives

  lives.innerHTML = "";
  numberOfLives = [1, 2, 3, 4, 5];
  displayHearts();
  disableButtons(false);
  return;
}); //------------------------------
// 8. Create the event listner to show solution
//------------------------------

var giveUp = document.querySelector(".button--surrender");
giveUp.addEventListener('click', function () {
  clue.innerHTML = randomWord;
  disableButtons(true);
}); //-------------------------------
// 9. Display the numbers of lives available
//-------------------------------

var lives = document.querySelector(".lives");
var isLifeLost = true;
var numberOfLives = [1, 2, 3, 4, 5];

var displayHearts = function displayHearts() {
  lives.innerHTML = "";
  numberOfLives.forEach(function (life) {
    var lifeHTML = "<i class=\"fas fa-heart fa-4x\"></i>";
    lives.innerHTML += lifeHTML;
  });
}; //-------------------------------------------------
// 10. At each letter clicked check if a life is lost
//-------------------------------------------------


var loseOneLife = function loseOneLife() {
  if (isLifeLost) {
    numberOfLives.pop();
    displayHearts();
    isLifeLost = true;
    gameOver();
  }
}; //----------------------------------------------
// 11. Display Game Over when all 5 lives are lost and disable the buttons for further use
//----------------------------------------------


var gameOver = function gameOver() {
  if (numberOfLives.length === 0) {
    alert("game over");
    disableButtons(true);
  } else {
    disableButtons(false);
  }
};

var disableButtons = function disableButtons(_boolean) {
  letterButton.forEach(function (button) {
    button.disabled = _boolean;
  });
};