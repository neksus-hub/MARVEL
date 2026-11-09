import { useState, useEffect } from "react";
import { useMarvelService } from "../../services/MarvelService";
import PropTypes from "prop-types";

import setContent from "../../utils/setContent";
import SafeImage from "../../ui/SafeImage";
import "./charInfo.scss";

const CharInfo = ({ charId }) => {
    const [char, setChar] = useState(null);
    const { process, getCharacter, clearError, setProcess } = useMarvelService();

    useEffect(() => {
        if (charId) {
            updateChar(charId);
        } else {
            randomChar();
        }
    }, [charId]);

    const randomChar = () => {
        const id = Math.floor(Math.random() * 19 + 2);
        clearError();
        getCharacter(id)
        .then(onCharLoaded)
        .then(() => setProcess('Confirmed'))
    };

    const updateChar = (id) => {
        if (!id) return;
        clearError();
        getCharacter(id)
        .then(onCharLoaded)
        .then(() => setProcess('Confirmed'))
    };

    const onCharLoaded = (char) => {
        setChar(char);
    };

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    );
};

const View = ({ data }) => {
    const { name, thumbnail, description, homepage, wiki, comics = [] } = data;

    return (
        <>
            <div className="char__basics">
                <SafeImage src={thumbnail} className='char__img'/>
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