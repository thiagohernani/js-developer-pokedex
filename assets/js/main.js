const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const contentContainer = document.querySelector('.content')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="selectPokemon(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

// name, number, type, types, photo, height, abilities, weight, species

function modalDetail(dataPokemon) {
    return `
    <div class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <span class="close" onclick="fecharModal()">&times;</span>
                <h2>${dataPokemon.name}</h2>
                <h3>${dataPokemon.number}</h3>
            </div>
            <div class="modal-body">
                <img src="${dataPokemon.photo}" alt="${dataPokemon.name}">
                <p class="height">Height: ${dataPokemon.height}</p>
                <p class="weight">Weight: ${dataPokemon.weight}</p>
                ${dataPokemon.abilities.map((ability) => `<p class="ability">Ability: ${ability.ability.name}</p>`).join('')}
                ${dataPokemon.types.map((type) => `<p class="type ${type}">Principal Type: ${type.type.name}</p>`).join('')}
            </div>
        </div>
    </div>
    `
}

function selectPokemon(pokemonName) {
    const path = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    
        return fetch(path)
        .then((response) => response.json())
        .then((pokemon) => {
            const detailedPokemon = new PokemonDetail(pokemon.name, pokemon.id, pokemon.types[0].type.name, pokemon.types, pokemon.sprites.other.home.front_default, pokemon.height, pokemon.abilities, pokemon.weight, pokemon.species)
        return detailedPokemon})
        .then((detailPokemon) => {
            contentContainer.innerHTML  += (modalDetail(detailPokemon))
        });        
};

function fecharModal () {
    const modal = document.querySelector('.modal')
    contentContainer.removeChild(modal)
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    selectPokemon()
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})