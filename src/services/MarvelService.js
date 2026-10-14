import { useHttp } from "../hooks/http.hook";

export const useMarvelService = () => {
    const { error, loading, request, clearError } = useHttp();

    const _apiurl = "https://marvel-server-zeta.vercel.app/characters";
    const _comicsUrl = "https://marvel-server-zeta.vercel.app/comics";
    const _apikey = "apikey=d4eecb0c66dedbfae4eab45d312fc1df";
    const _baseOffset = 0;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(
            `${_apiurl}?limit=9&offset=${offset}&${_apikey}`
        );
        return res.data.results.map(_transformChar);
    };

    const getCharacter = async (id) => {
        const res = await request(`${_apiurl}/${id}?${_apikey}`);
        if (res.data.results[0].description === null) {
            res.data.results[0].description = "Отсутствует описание персонажа";
        }
        return _transformChar(res.data.results[0]);
    };

    const _transformChar = (char) => ({
        id: char.id,
        name: char.name,
        description: char.description,
        thumbnail: char.thumbnail
            ? `${char.thumbnail.path}.${char.thumbnail.extension}`
            : null,
        homepage: char.urls?.[0]?.url,
        wiki: char.urls?.[1]?.url,
        comics: char.comics.items,
    });

    const getComic = async (id) => {
        try {
            const res = await request(`${_comicsUrl}/${id}?${_apikey}`);
            // Если API вернул пустой массив — комикса нет
            if (!res?.data?.results?.[0]) return null;
            return _transformComics(res.data.results[0]);
        } catch (e) {
            // Если это 404 — комикса нет, возвращаем null
            // (ошибка уже записана в state хука useHttp, но мы её "глотаем")
            return null;
        }
    };

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(
            `${_comicsUrl}?limit=9&offset=${offset}&${_apikey}`
        );
        if (!res?.data?.results) return [];
        return res.data.results.map(_transformComics);
    };

    const _transformComics = (comics) => ({
        id: comics.id,
        title: comics.title,
        description: comics.description,
        thumbnail: comics.thumbnail
            ? `${comics.thumbnail.path}.${comics.thumbnail.extension}`
            : null,
        price: comics.prices?.[0]?.price ?? null,
        pageCount: comics.pageCount,
        language: comics.textObjects?.languages,
    });

    return {
        error,
        loading,
        getCharacter,
        getAllCharacters,
        getAllComics,
        getComic,
        clearError,
    };
};

export default useMarvelService