const DATA_VERSION = '1.00'

const fetchPokemons = async (languageId) => {
  return window.fetch('https://beta.pokeapi.co/graphql/v1beta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `
        query pokedex {
          pokemons: pokemon_v2_pokemon(limit: 898) {
            id
            height
            weight
            specy: pokemon_v2_pokemonspecy {
              names: pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: ${languageId}}}) {
                name
              }
              texts: pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: ${languageId}}}, distinct_on: pokemon_species_id) {
                text: flavor_text
              }
              evolutions: pokemon_v2_evolutionchain {
                species: pokemon_v2_pokemonspecies(order_by: {order: asc}) {
                  id
                  names: pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: ${languageId}}}) {
                    name
                  }
                }
              }
            }
            types: pokemon_v2_pokemontypes {
              type_id
              type_names: pokemon_v2_type {
                names: pokemon_v2_typenames(where: {language_id: {_eq: ${languageId}}}) {
                  name
                }
              }
            }
            stats: pokemon_v2_pokemonstats {
              id
              base_stat
              stat_names: pokemon_v2_stat {
                names: pokemon_v2_statnames(where: {language_id: {_eq: ${languageId}}}) {
                  name
                }
              }
            }
          }
        }
      `
    })
  })
    .then(response => response.json())
    .then(json => json.data.pokemons)
}

const normalizePokemons = (collection) => {
  const pokemons = []
  for (const item of collection) {
    pokemons.push({
      id: item.id,
      name: item.specy.names[0].name,
      height: item.height,
      weight: item.weight,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`,
      text: item.specy.texts[0] ? item.specy.texts[0].text : '',
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

const getPokemons = async (dataLanguageId) => {
  const storedPokemons = (
    window.localStorage.getItem('data_version') === DATA_VERSION &&
    window.localStorage.getItem('data_language_id') === dataLanguageId
  )
    ? window.localStorage.getItem('pokemons')
    : null

  if (storedPokemons !== null) {
    return JSON.parse(storedPokemons)
  } else {
    return fetchPokemons(dataLanguageId)
      .then(pokemons => normalizePokemons(pokemons))
      .then(pokemons => {
        window.localStorage.setItem('data_version', DATA_VERSION)
        window.localStorage.setItem('data_language_id', dataLanguageId)
        window.localStorage.setItem('pokemons', JSON.stringify(pokemons))
        return pokemons
      })
  }
}

export { getPokemons }
