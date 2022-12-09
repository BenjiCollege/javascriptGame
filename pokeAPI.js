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
//! this function is to get the pokemon from the api out of 151 pokemon, changing the limit of 151 will increase or decrease the number of pokemon
const getPokemon = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const pokemon = await res.json();

  return pokemon.results;
}
//! this function is to shuffle the array of pokemon using the sort method and Math.random
const shuffle = (unshuffled) => {
  const shuffled = unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return shuffled;
}
//! this function is to get 4 random pokemon from the array of pokemon
const get4Pokemon = (randomPokemon) => {
  return randomPokemon.splice(0, 4);
}

//! this function is to get the number from the url and use it to get the image in the next function, works by capturing the number at the end of the url and returning it by using Regular Expressions

const getNumber = (url) => {
  const numberRegEx = /(\d+)\/$/;
  return (url.match(numberRegEx) || [])[1];
}

const getPokemonImage = ({ url }) => {
  const number = getNumber(url);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
}


//! This needs to be used for a hint function when the user gets the answer wrong
// const getPokemonType = (url) => {
//   const type = getType(url);
//   return `https://pokeapi.co/api/v2/type/{id or name}/`;
// }

// const getPokemonHeight = (url) => {
//   const height = getHeight(url);
//   return `https://pokeapi.co/api/v2/height/{id or name}/`;
// }

// const getPokemonWeight = (url) => {
//   const weight = getWeight(url);
//   return `https://pokeapi.co/api/v2/weight/{id or name}/`;
// }
// const getPokemonAbility = (url) => {
//   const ability = getAbility(url);
//   return `https://pokeapi.co/api/v2/ability/{id or name}/`;
// }


