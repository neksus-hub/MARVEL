import PropTypes from "prop-types";
import "./comicsList.scss";

const ComicsList = ({ comics = [], onLoadMore, charEnded, newItemLoading }) => {
    if (comics.length === 0) {
        return (
            <div className="comics__list">
                <p className="comics__empty">Комиксы не найдены</p>
            </div>
        );
    }

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {comics.map((comic) => (
                    <li key={comic.id} className="comics__item">
                        <a href="#!" onClick={(e) => e.preventDefault()}>
                            <img
                                src={comic.thumbnail}
                                alt={comic.title}
                                className="comics__item-img"
                            />
                            <div className="comics__item-name">{comic.title}</div>
                            <div className="comics__item-price">
                                {comic.price ? `${comic.price}$` : "NOT AVAILABLE"}
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ display: charEnded ? "none" : "block" }}
                onClick={onLoadMore}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

ComicsList.propTypes = {
    comics: PropTypes.array,
    onLoadMore: PropTypes.func,
    charEnded: PropTypes.bool,
    newItemLoading: PropTypes.bool,
};

export default ComicsList;