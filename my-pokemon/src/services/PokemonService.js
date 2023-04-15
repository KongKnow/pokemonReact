class PokemonService{
    _baseOffsetChar = 0;
    _linkCharacter = 'https://pokeapi.co/api/v2/pokemon/';
    _linkAllCharacters = 'https://pokeapi.co/api/v2/pokemon?'

    getResources = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, fetch status: ${fetch.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffsetChar, limit = 9) => {
        const res = await this.getResources(`${this._linkAllCharacters}limit=${limit}&offset=${offset}`);
        return res.results.map(item => item.url);
        
    }
    getCharacter = async (id) => {
        const res = await this.getResources(`${this._linkCharacter}${id}`);
        
        return this._characterMainInfo(res);
    }

    _characterMainInfo = (res) => {
        return {
            name: res.name,
            description: res.stats.map(item => ([item.stat.name, item.base_stat])),
            thumbnail: res.sprites.front_default,
            moves: res.moves.map(item => item.move.name)
        }
    }
}

export default PokemonService;