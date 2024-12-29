
class Pokemon {
    number;
    name;
    type;
    types = [];
    photo;
}

class PokemonDetail extends Pokemon {
    constructor(name, number, type, types, photo, height, abilities, weight, species) {
        super(name, number, type, types, photo)
        Object.assign(this, {name, number, type, types, photo, height, abilities, weight, species})
    } 
}