class Selectors {
    constructor(name){

    }
}

class Pokemon {
    constructor({name, hp, type}) {
        this.name = name,
        this.hp = {
            current: hp,
            total: hp,
        };
        this.type = type;
    }
}

export default Pokemon;