import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

import "./comicsList.scss";

const setContent = (process, content, newItemsLoading) => {
  switch (process) {
    case "Waiting":
      return <Spinner />;
    case "Loading":
      return newItemsLoading ? content : <Spinner />;
    case "Confirmed":
      return content;
    case "Error":
      return <Error />;
    default:
      throw new Error("Непредвиденное состояние процесса");
  }
};

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);

  const limit = 9;

  const { process, setProcess, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 9) {
      ended = true;
    }

    setComicsList((comicsList) => [...comicsList, ...newComicsList]);
    setNewItemsLoading(() => false);
    setOffset((offset) => offset + limit);
    setComicsEnded(() => ended);
  };

  const onRequest = (offset, initial) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true);

    getAllComics(offset)
    .then(onComicsListLoaded)
    .then(() => setProcess('Confirmed'))
  };

  function renderItems(arr) {
    const items = arr.map((item, index) => {
      const { id, title, thumbnail, price } = item;

      return (
        <li className="comics__item" key={index}>
          <Link to={`/comics/${id}`}>
            <img src={thumbnail} alt={title} className="comics__item-img" />
            <div className="comics__item-name">{title}</div>
            <div className="comics__item-price">{price}</div>
          </Link>
        </li>
      );
    });

    return (
      <ul className="comics__grid">
        {items}
      </ul>
    );
  }


  return (
    <div className="comics__list">
      {setContent(process, renderItems(comicsList), newItemsLoading)}
      <button
        className="button button__main button__long"
        disabled={newItemsLoading}
        style={{ display: comicsEnded ? "none" : "block" }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">загрузить ещё</div>
      </button>
    </div>
  );
};

export default ComicsList;