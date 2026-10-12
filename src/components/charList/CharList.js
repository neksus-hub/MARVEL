import { useState, useEffect, useRef } from "react";
import { useMarvelService } from "../../services/MarvelService";
import PropTypes from "prop-types";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import "./charList.scss";

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);

    const { error, loading, getAllCharacters } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset).then(onCharListLoaded);
    };

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList((charList) => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset((offset) => offset + 9);
        setCharEnded(ended);
    };

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach((item) =>
            item.classList.remove("char__item_selected")
        );
        const target = itemRefs.current.find(
            (item) => item?.dataset?.id === String(id)
        );
        if (target) {
            target.classList.add("char__item_selected");
            target.focus();
        }
    };

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            const imgStyle = { objectFit: "cover" };

            return (
                <li
                    className="char__item"
                    tabIndex={0}
                    data-id={item.id}
                    ref={(el) => (itemRefs.current[i] = el)}
                    key={item.id}
                    onClick={() => {
                        props.onSelectedChar(item);
                        focusOnItem(item.id);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                            e.preventDefault();
                            props.onSelectedChar(item);
                            focusOnItem(item.id);
                        }
                    }}
                >
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });

        return <ul className="char__grid">{items}</ul>;
    }

    const items = renderItems(charList);
    const errorMessage = error ? <Error /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ display: charEnded ? "none" : "block" }}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired,
};

export default CharList;