import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import Error from '../error/Error';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';

const CharInfo = (props) => {

    const { charId } = props
    const [char, setChar] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const marvelService = new MarvelService

    useEffect(() => {
        if (!charId) {
            randomChar();
        }
    }, []);

    useEffect(() => {
        if (charId) {
            updateChar(charId);
        } else {
            randomChar();
        }
    }, [charId]);

    const randomChar = () => {
        const id = Math.floor(Math.random() * (20 - 1) + 1);
        marvelService
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onError)
    }

    const updateChar = () => {
        const { charId } = props

        if (!charId) {
            return;
        }

        setLoading(false)

        marvelService
            .getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError)
    }

    const onError = () => {

        setLoading(false)
        setError(true)
    }

    const onCharLoaded = (char) => {

        setChar(char)
        setLoading(false)
    }

    const skeleton = char || loading || error ? null : <Skeleton />
    const errorMassage = error ? <Error /> : null
    const loadingMassage = loading ? <Spinner /> : null
    const content = !(error || loading || char === null) ? <View char={char} /> : null

    return (
        <div className="char__info">
            {skeleton}
            {errorMassage}
            {loadingMassage}
            {content}
        </div>
    )
}

const View = ({ char }) => {
    const { name, thumbnail, description, homepage, wiki, comics } = char
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There are no comics'}
                {
                    comics.map((item, id) => {
                        if (id > 10) return;
                        return (
                            <li key={id} className="char__comics-item" >
                                {item}
                            </li>
                        )
                    })
                }
            </ul >
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;