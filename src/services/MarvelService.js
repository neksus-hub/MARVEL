import { useHttp } from "../hooks/http.hook";

export const useMarvelService = () => {
    const { error, loading, request, clearError } = useHttp();

    // НЕ ТРОГАЕМ — оставляем как было
    const _apiurl = "https://marvel-server-zeta.vercel.app/characters";
    const _comicsUrl = "https://marvel-server-zeta.vercel.app/comics";
    const _apikey = "apikey=d4eecb0c66dedbfae4eab45d312fc1df";
    const _baseOffset = 0;

    // --- Персонажи (не трогаем) ---
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

    // --- Комиксы (добавляем) ---
    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(
            `${_comicsUrl}?limit=9&offset=${offset}&${_apikey}`
        );
        if (!res?.data?.results) return [];
        return res.data.results.map(_transformComics);
    };

    const _transformComics = (comic) => ({
        id: comic.id,
        title: comic.title,
        description: comic.description,
        thumbnail: comic.thumbnail
            ? `${comic.thumbnail.path}.${comic.thumbnail.extension}`
            : null,
        price: comic.prices?.[0]?.price ?? null,
        pageCount: comic.pageCount,
        language: comic.textObjects?.languages,
    });

    return {
        error,
        loading,
        getCharacter,
        getAllCharacters,
        getAllComics, // ← новый метод
        clearError,
    };
};