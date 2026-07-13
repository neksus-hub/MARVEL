class MarvelService {
    _apiurl = 'https://marvel-server-zeta.vercel.app/characters'
    _apikey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df'
    _baseOffset = 0

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiurl}?limit=9&offset=${offset}&${this._apikey}`)
        console.log(res)
        return res.data.results.map(this._transformChar)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiurl}/${id}?${this._apikey}`)
        if (res.data.results[0].description === null) {
            res.data.results[0].description = 'Отсутствует описание персонажа'
        }
        return this._transformChar(res.data.results[0])
    }

    _transformChar = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail !== undefined ? char.thumbnail.path + '.' + char.thumbnail.extension : null,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelService;