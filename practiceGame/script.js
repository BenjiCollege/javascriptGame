window.getPokeData = async function() {
  const pokemon = await getPokemon();
  const randomPokemon = shuffle(pokemon);
  const pokemonChoices = get4Pokemon(randomPokemon);
  const [ firstPokemon ] = pokemonChoices;
  const image = getPokemonImage(firstPokemon);

  return { 
    pokemonChoices: shuffle(pokemonChoices),
    correct: {
      image,
      name: firstPokemon.name,
    }
  };
};

async function getPokemon() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const pokemon = await res.json();
  
  return pokemon.results;
}

function shuffle(unshuffled) {
  const shuffled = unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  
  return shuffled;
}

function get4Pokemon(randomPokemon) {
  return randomPokemon.splice(0, 4);
}

function getPokemonImage({ url }) {
  const number = getNumber(url);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
};

function getNumber(url) {
  const numberRegEx = /(\d+)\/$/;
  return (url.match(numberRegEx) || [])[1];
}


let gameData;
const main = document.querySelector('main');
const pokemonImage = document.querySelector('#pokemon-image');
const textOverlay = document.querySelector('#text-overlay');
const choices = document.querySelector('#choices');
const playBtn = document.querySelector('#play');
playBtn.addEventListener('click', fetchData);
loadVoice();
addAnswerHandler();


async function fetchData() {
  resetImage();
  gameData = await window.getPokeData();
  showSilhouette();
  displayChoices();
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
  const { pokemonChoices } = gameData;
  const choicesHTML = pokemonChoices.map(({ name }) => {
    return `<button data-name="${name}">${name}</button>`;
  }).join('');

  choices.innerHTML = choicesHTML;
}

function addAnswerHandler() {
  choices.addEventListener('click', e => {
    const { name } = e.target.dataset;
    const resultClass = (name === gameData.correct.name) ?
      'correct' : 'incorrect';

    e.target.classList.add(resultClass);
    revealPokemon();
    speakAnswer();
  });
}

function revealPokemon() {
  main.classList.add('revealed');
  textOverlay.textContent = `${gameData.correct.name}!`;
}

function loadVoice() {
  window.speechSynthesis.onvoiceschanged = () => {
    window.femaleVoice = speechSynthesis.getVoices()[4];
  };
}

function speakAnswer() {
  const utterance = new SpeechSynthesisUtterance(gameData.correct.name);
  utterance.voice = window.femaleVoice;
  utterance.pitch = 0.9;
  utterance.rate = 0.85;
  speechSynthesis.speak(utterance);
}