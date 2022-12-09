let gameData;
const main = document.querySelector('main');
const pokemonImage = document.querySelector('#pokemon-image');
const textOverlay = document.querySelector('#text-overlay');
const choices = document.querySelector('#choices');
const playBtn = document.querySelector('#play');
playBtn.addEventListener('click', fetchData);
addAnswerHandler();
fetchData();

async function fetchData() {
  resetImage();
  gameData = await window.getPokeData();
  showSilhouette();
  inputBox();
}

const resetImage = () => {
  pokemonImage.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';
  main.classList.add('fetching');
  main.classList.remove('revealed');
}

const showSilhouette = () => {
  main.classList.remove('fetching');
  pokemonImage.src = gameData.correct.image;
}

const inputBox = () => {
  const { pokemonChoices } = gameData;
  const choicesInput = pokemonChoices.map(({ name }) => {
    return `<input data-name="${name}"></input>`;
  })
  choices.innerHTML = choicesInput;
}

function addAnswerHandler() {
  choices.addEventListener('input', e => {
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
  textOverlay.textContent = `${gameData.correct.name}!`;
}



//! DOM manipulation to change the play button text
const playButton = document.querySelectorAll('#play');
playButton.forEach((button) => {
  button.addEventListener('click', () => {
    button.innerText = "Play again";
    });
});

// function that requires the user to 
