import { useState, useEffect } from "react";
import { useMarvelService } from "../../services/MarvelService";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Error from "../error/Error";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import "./charInfo.scss";

const CharInfo = ({ charId }) => {
    const [char, setChar] = useState(null);
    const { error, loading, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        if (charId) {
            updateChar(charId);
        } else {
            randomChar();
        }
    }, [charId]);

    const randomChar = () => {
        const id = Math.floor(Math.random() * 20 + 1);
        clearError();
        getCharacter(id).then(onCharLoaded);
    };

    const updateChar = (id) => {
        if (!id) return;
        clearError();
        getCharacter(id).then(onCharLoaded);
    };

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <Error /> : null;
    const loadingMessage = loading ? <Spinner /> : null;
    const content = !(error || loading || char === null) ? (
        <View char={char} />
    ) : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {loadingMessage}
            {content}
        </div>
    );
};

const View = ({ char }) => {
    const { name, thumbnail, description, homepage, wiki, comics = [] } = char;

    return (
        <>
            <div className="char__basics">
                {thumbnail ? (
                    <img src={thumbnail} alt={name} />
                ) : (
                    <div className="char__no-image">No image</div>
                )}
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        {homepage && (
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                        )}
                        {wiki && (
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">wiki</div>
                            </a>
                        )}
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? (
                    comics.slice(0, 10).map((item, i) => (
                        <li key={i} className="char__comics-item">
                            {item}
                        </li>
                    ))
                ) : (
                    <li className="char__comics-item">There are no comics</li>
                )}
            </ul>
        </>
    );
};

CharInfo.propTypes = {
    charId: PropTypes.number,
};

export default CharInfo;