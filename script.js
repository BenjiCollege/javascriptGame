//! HTML elements that need to be selected and manipulated
let gameData;
const main = document.querySelector('main');
const pokemonImage = document.querySelector('#pokemon-image');
const textOverlay = document.querySelector('#text-overlay');
const choices = document.querySelector('#choices');
const playBtn = document.querySelector('#play');
playBtn.addEventListener('click', fetchData);
addAnswerHandler();
fetchData();

//! this function is to fetch the data from the api and display the pokemon as a silhouette before the user chooses an answer
async function fetchData() {
  resetImage();
  gameData = await window.getPokeData();
  showSilhouette();
  displayChoices();
}
//! reset the image to a silhouette after the user selects the play again button
const resetImage = () => {
  pokemonImage.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';
  main.classList.add('fetching');
  main.classList.remove('revealed');
}
//! show the pokemon as a silhouette after the user selects the play again button
const showSilhouette = () => {
  main.classList.remove('fetching');
  pokemonImage.src = gameData.correct.image;
}
//! button box for the user to type in the name of the pokemon
//! the .join('') is to remove the commas between the buttons and concatenate them into one string
const displayChoices = () => {
  const { pokemonChoices } = gameData;
  const choicesHTML = pokemonChoices.map(({ name }) => {
    return `<button data-name="${name}">${name}</button>`;
  }).join('');
  choices.innerHTML = choicesHTML;
}

//! add event listener to the button box to check if the user's answer is correct if it is, it will add the class 'correct' to the button, if not, it will add the class 'incorrect' to the button
function addAnswerHandler() {
  choices.addEventListener('click', e => {
    const { name } = e.target.dataset;
    const resultClass = (name === gameData.correct.name) ?
      'correct' : 'incorrect';

    e.target.classList.add(resultClass);
    revealPokemon();
  });
}
//! reveal the pokemon when the user's answer is correct
function revealPokemon() {
  main.classList.add('revealed');
  textOverlay.textContent = `${gameData.correct.name}!`;
}
// when the pokemon is revealed 



//! DOM manipulation to change the play button text
const playButton = document.querySelectorAll('#play');
playButton.forEach((button) => {
  button.addEventListener('click', () => {
    button.innerText = "Play again";
    });
});

