window.getPokeData = async () =>{
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

const getPokemon = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const pokemon = await res.json();

  return pokemon.results;
}

const shuffle = (unshuffled) => {
  const shuffled = unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return shuffled;
}

const get4Pokemon = (randomPokemon) => {
  return randomPokemon.slice(0, 1);
}

// this function is to get the number from the url and use it to get the image in the next function, works by capturing the number at the end of the url and returning it by using Regular Expressions

const getNumber = (url) => {
  const numberRegEx = /(\d+)\/$/;
  return (url.match(numberRegEx) || [])[1];
}

const getPokemonImage = ({ url }) => {
  const number = getNumber(url);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
}
