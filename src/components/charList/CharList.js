import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChars();
    }

    updateChars = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharsLoaded)
            .catch(this.onError);
    }

    onCharsLoaded = (chars) => {
        this.setState({
            chars: chars,
            loading: false
        });
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
        const { chars, loading, error } = this.state;

        const errorMessage = error ? <Error /> : null;
        const loadingMessage = loading ? <Spinner /> : null;
        const content = !(error || loading) ? <View chars={chars} renderChar={this.renderChar} /> : null;

        return (
            <>
                {errorMessage}
                {loadingMessage}
                {content}
            </>
        );
    }
}

const View = ({ chars, renderChar }) => {
    return (
        <div className="char__list">
            <ul className="char__grid">
                {chars.map((char, id) => renderChar(char, id))}
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    );
}

export default CharList;