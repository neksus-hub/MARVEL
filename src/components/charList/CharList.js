import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 0,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest()
    }

    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newChars) => {
        let ended = false
        if (newChars.length < 9) {
            ended = true
        }
        this.setState(({ offset, chars }) => ({
            chars: [...chars, ...newChars],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    renderChar = (char) => {
        const { id, name, thumbnail } = char;

        return (
            <li key={id}
                onClick={() => { this.props.onSelectedChar(id) }}
                className="char__item">
                {thumbnail ? (
                    <img
                        src={thumbnail}
                        alt={name}
                        className="char__img"
                    />
                ) : (
                    <Error />
                )}
                <div className="char__name">{name}</div>
            </li>
        );
    }

    render() {
        const { chars, loading, error, newItemLoading, offset, charEnded } = this.state;

        const errorMessage = error ? <Error /> : null;
        const loadingMessage = loading ? <Spinner /> : null;


        const content = !(error || loading) ? (
            <div className="char__list">
                <ul className="char__grid">
                    {chars.map((char) => this.renderChar(char))}
                </ul>
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{ 'display': charEnded ? 'none' : 'block' }}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        ) : null;

        return (
            <>
                {errorMessage}
                {loadingMessage}
                {content}
            </>
        );
    }
}

export default CharList;