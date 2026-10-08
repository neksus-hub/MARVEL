import { useState, useEffect } from "react";
import ComicsList from "../components/comicsList/ComicsList";
import { useMarvelService } from "../services/MarvelService";
import Spinner from "../components/spinner/Spinner";
import Error from "../components/error/Error";
import AppBanner from "../components/appBanner/AppBanner"

const ComicsPage = () => {
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(0);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [charEnded, setCharEnded] = useState(false);

    const { error, loading, getAllComics } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset).then(onComicsLoaded);
    };

    const onComicsLoaded = (newComics) => {
        let ended = false;
        if (newComics.length < 9) ended = true;

        setComics((comics) => [...comics, ...newComics]);
        setNewItemLoading(false);
        setOffset((offset) => offset + 9);
        setCharEnded(ended);
    };

    const errorMessage = error ? <Error /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <>
        <AppBanner/>
                <div className="comics__page">
            {errorMessage}
            {spinner}
            <ComicsList
                comics={comics}
                onLoadMore={() => onRequest(offset)}
                charEnded={charEnded}
                newItemLoading={newItemLoading}
            />
        </div>
        </>
    );
};

export default ComicsPage;