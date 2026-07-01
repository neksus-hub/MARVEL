class MarvelService {
    _apiurl = 'https://marvel-server-zeta.vercel.app/characters'
    _apikey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df'

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiurl}?limit=9&offset=10&${this._apikey}`)
    }

    getCharacter = (id) => {
        return this.getResource(`${this._apiurl}/${id}?${this._apikey}`)
    }
}

export default MarvelService;