import { useMarvelService } from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import uw from '../../resources/img/UW.png';
import './comicsList.scss';
import AppBanner from '../appBanner/AppBanner';

const ComicsList = (props) => {
    const [comicsList, setComicsList] = useState([]);
    const [visibleCount, setVisibleCount] = useState(1);
    const { error, loading, getCharacter } = useMarvelService();

    const loadComics = (charId) => {
        const fetchChar = charId 
            ? getCharacter(charId) 
            : getCharacter(Math.floor(Math.random() * 20 + 1));
        fetchChar
            .then(data => {
                const comics = data.comics || [];
                setComicsList(comics);
                setVisibleCount(Math.min(1, comics.length));
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        loadComics(props.charId);
    }, [props.charId]);

    const handleLoadMore = () => {
        setVisibleCount(prev => Math.min(prev + 1, comicsList.length));
    };

    const isEnded = visibleCount >= comicsList.length ? true : false;

    function renderComics(arr) {
        if (!arr || arr.length === 0) {
            return <li className="comics__item">No comics available</li>;
        }
        const visibleItems = arr.slice(0, visibleCount);
        return visibleItems.map((item, index) => (
            <li className="comics__item" key={index}>
                <a href="#">
                    <img src={uw} alt="comic" className="comics__item-img" />
                    <div className="comics__item-name">{item}</div>
                    <div className="comics__item-price">9.99$</div>
                </a>
            </li>
        ));
    }

    return (
        <>
            <AppBanner />
            <div className="comics__list">
                {loading ? <div>Loading...</div> : null }
                {error ? <div>Error: {error}</div> : null }
                <ul className="comics__grid">
                    {renderComics(comicsList)}
                </ul>
                {!isEnded && comicsList.length > 0 ?  (
                    <button 
                        className="button button__main button__long"
                        onClick={handleLoadMore}
                    >
                        <div className="inner">load more</div>
                    </button>
                ) : null}
            </div>
        </>
    );
};

export default ComicsList;