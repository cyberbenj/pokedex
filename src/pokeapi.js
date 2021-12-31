const DATA_VERSION = '1.00'
const DATA_LANGUAGE_ID = 5
const DATA_LIMIT =  898 // 151, 251, 386, 493, 649, 721, 809, 898

const fetchPokemons = async (limit) => {
  return fetch('https://beta.pokeapi.co/graphql/v1beta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query pokedex {
          pokemons: pokemon_v2_pokemon(limit: ${limit}) {
            id
            height
            weight
            specy: pokemon_v2_pokemonspecy {
              names: pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 5}}) {
                name
              }
              texts: pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: 5}}, distinct_on: pokemon_species_id) {
                text: flavor_text
              }
              evolutions: pokemon_v2_evolutionchain {
                species: pokemon_v2_pokemonspecies(order_by: {order: asc}) {
                  id
                  names: pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 5}}) {
                    name
                  }
                }
              }
              habitat: pokemon_v2_pokemonhabitat {
                id
                names: pokemon_v2_pokemonhabitatnames(where: {language_id: {_eq: 5}}) {
                  name
                }
              }
            }
            types: pokemon_v2_pokemontypes {
              type_id
              type_names: pokemon_v2_type {
                names: pokemon_v2_typenames(where: {language_id: {_eq: 5}}) {
                  name
                }
              }
            }
            stats: pokemon_v2_pokemonstats {
              id
              base_stat
              stat_names: pokemon_v2_stat {
                names: pokemon_v2_statnames(where: {language_id: {_eq: 5}}) {
                  name
                }
              }
            }
          }
        }
      `,
    })
  })
  .then(response => response.json())
  .then(json => json.data.pokemons)
}

const normalizePokemons = (collection) => {
  const pokemons = []
  for(let item of collection){
    pokemons.push({
      id: item.id,
      name: item.specy.names[0].name,
      height: item.height,
      weight: item.weight,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`,
      text: item.specy.texts[0] ? item.specy.texts[0].text : '',
      habitat: item.specy.habitat ? item.specy.habitat.names[0].name : '',
      evolutions: item.specy.evolutions.species.map((specy) => {
        return {
          id: specy.id,
          name: specy.names[0].name,
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${specy.id}.png`,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${specy.id}.png`
        }
      }),
      types: item.types.map((type) => {
        return {
          id: type.type_id,
          name: type.type_names.names[0].name
        }
      }),
      stats: item.stats.map((stat) => {
        return {
          id: stat.id,
          name: stat.stat_names.names[0].name,
          value: stat.base_stat
        }
      })
    })
  }
  return pokemons
}

const getPokemons = async () => {
  const storedPokemons = 
  (
    localStorage.getItem('data_version') === DATA_VERSION &&
    localStorage.getItem('data_language_id') === DATA_LANGUAGE_ID &&
    localStorage.getItem('data_limit') === DATA_LIMIT
  ) 
  ? localStorage.getItem('pokemons') 
  : null

  if (storedPokemons !== null) {
    return JSON.parse(storedPokemons)
  } else {
    return fetchPokemons(DATA_LIMIT)
    .then(pokemons => normalizePokemons(pokemons))
    .then(pokemons => {
      localStorage.setItem('data_version', DATA_VERSION)
      localStorage.setItem('data_language_id', DATA_LANGUAGE_ID)
      localStorage.setItem('data_limit', DATA_LIMIT)
      localStorage.setItem('pokemons', JSON.stringify(pokemons))
      return pokemons
    })
  }
}

export { getPokemons }
