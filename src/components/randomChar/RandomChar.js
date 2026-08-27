import { useState, useEffect, useRef } from 'react';
import { useMarvelService } from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
    const [char, setChar] = useState({});

    const timerId = useRef(null);

    const { error, loading, getCharacter, clearError } = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const updateChar = () => {
        clearError()
        const id = Math.floor(Math.random() * 20 + 1);
        getCharacter(id).then(onCharLoaded)
    };

    const startTimer = () => {

        if (timerId.current) {
            clearInterval(timerId.current);
        }
        timerId.current = setInterval(updateChar, 3000);
    };

    const resetTimer = () => {

        if (timerId.current) {
            clearInterval(timerId.current);
        }

        timerId.current = setInterval(updateChar, 3000);
    };

    useEffect(() => {
        updateChar();
        startTimer();

        return () => {
            if (timerId.current) {
                clearInterval(timerId.current);
            }
        };
    }, []);

    const errorMassage = error ? <Error /> : null;
    const loadingMassage = loading ? <Spinner /> : null;
    const content = !(error || loading) ? <View char={char} /> : null;

    return (
        <div className="randomchar">
            {errorMassage}
            {loadingMassage}
            {content}

            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button
                    className="button button__main"
                    onClick={() => {
                        updateChar();
                        resetTimer();
                    }}
                >
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    );
};

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;

    return (
        <div className="randomchar__block">
            {thumbnail ? (
                <img src={thumbnail} alt="Random character" className="randomchar__img" />
            ) : (
                <Error />
            )}
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RandomChar;