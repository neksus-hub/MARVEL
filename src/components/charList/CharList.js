import { Transition } from "react-transition-group";
import { useState, useEffect, useRef } from "react";
import { useMarvelService } from "../../services/MarvelService";
import PropTypes from "prop-types";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import SafeImage from "../../ui/SafeImage";
import "./charList.scss";

const setContent = (process, content, newItemLoading) => {
  switch (process) {
    case "Waiting":
      return <Spinner />;
    case "Loading":
      return newItemLoading ? content : <Spinner />;
    case "Confirmed":
      return content;
    case "Error":
      return <Error />;
    default:
      throw new Error("Непредвиденное состояние процесса");
  }
};

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);

    const { getAllCharacters, setProcess, process } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
        .then(onCharListLoaded)
        .then(() => setProcess('Confirmed'))
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

        const duration = 1000;

        const defaultStyle = {
            transition: `opacity ${duration}ms ease-in-out`,
            opacity: 0,
        }

        const transitionStyles = {
            entering: { opacity: 1 },
            entered:  { opacity: 1 },
            exiting:  { opacity: 0 },
            exited:  { opacity: 0 },
        };

        const items = arr.map((item, i) => {

            const delay = (i % 9) * 60; 

            return (
               <Transition 
                timeout={duration} 
                in={true} 
                appear={true} 
                key={item.id}>
                {state => (
                    <li
                        className="char__item"
                        tabIndex={0}
                        data-id={item.id}
                        ref={(el) => (itemRefs.current[i] = el)}
                        onClick={() => {
                            props.onSelectedChar(item.id);
                            focusOnItem(item.id);
                        }}
                        onKeyPress={(e) => {
                            if (e.key === " " || e.key === "Enter") {
                                e.preventDefault();
                                props.onSelectedChar(item.id);
                                focusOnItem(item.id);
                            }
                        }}
                        style={{
                        ...defaultStyle,
                        ...transitionStyles[state],
                        transitionDelay: `${delay}ms`
                        }}
                    >
                         <SafeImage src={item.thumbnail}/>
                        <div className="char__name">{item.name}</div>
                    </li>
                )
                }
               </Transition>
            );
        });

        return <ul className="char__grid">{items}</ul>;
    }

    return (
        <div className="char__list">
            {setContent(process, renderItems(charList), newItemLoading)}
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