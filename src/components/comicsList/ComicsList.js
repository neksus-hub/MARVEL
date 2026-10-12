import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../error/Error";

import "./comicsList.scss";

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);

  const limit = 9;

  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  //Смена статуса после загрузки персонажа
  //loaded - уже загружен
  const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 9) {
      ended = true;
    }
    //есть зависимость от предыдущего состояния
    setComicsList((comicsList) => [...comicsList, ...newComicsList]);
    setNewItemsLoading(() => false);
    setOffset((offset) => offset + limit);
    setComicsEnded(() => ended);
  };

  //Метод для загрузки карточек персонажей (при загрузке и по кнопке Загузить ещё)
  const onRequest = (offset, initial) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true);

    getAllComics(offset).then(onComicsListLoaded);
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
    return items;
  }

  const elements = renderItems(comicsList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemsLoading ? <Spinner /> : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      <ul className="comics__grid">{elements}</ul>
      <button
        className="button button__main button__long"
        disabled={newItemsLoading}
        style={{ display: comicsEnded ? "none" : "block" }}
        onClick={() => onRequest(offset, true)}
      >
        <div className="inner">загрузить ещё</div>
      </button>
    </div>
  );
};

export default ComicsList;