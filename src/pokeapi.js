const fetchPokemons = async (limit = 898) => {
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
            specy: pokemon_v2_pokemonspecy {
              evolution_chain_id
              order
              names: pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 5}}) {
                name
              }
              texts: pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: 5}}, distinct_on: pokemon_species_id) {
                text: flavor_text
              }
            }
            types: pokemon_v2_pokemontypes {
              type: pokemon_v2_type {
                names: pokemon_v2_typenames(where: {language_id: {_eq: 5}}) {
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
      order: item.specy.order,
      evolution_id: item.specy.evolution_chain_id,
      name: item.specy.names[0].name,
      types: item.types.map((types) => types.type.names[0].name),
      text: item.specy.texts[0] ? item.specy.texts[0].text : '',
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`
    })
  }
  return pokemons
}

export { fetchPokemons, normalizePokemons }
