import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/error/Error";
import useMarvelService from "../services/MarvelService";
import Page404 from "./Page404";

import "./singleComic.scss";

const SingleComicPage = () => {
  //useParams() - отдает объект вида {comicId: '8461'}
  const { comicId } = useParams();
  const [comic, setComic] = useState(null);
  const [notFound, setNotFound] = useState(false)

  // элемент класса MarvelService - объект CharInfo
  const { loading, error, clearError, getComic } = useMarvelService();

  useEffect(() => {
    updateComic();
  }, [comicId]);

  const updateComic = () => {
      clearError();
      setNotFound(false);
      setComic(null);

      getComic(comicId).then((data) => {
          if (!data) {
              setNotFound(true);
          } else {
              setComic(data);
          }
      });
  };

  if (notFound) {
      return <Page404 />;
  }

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ comic }) => {
  const { title, description, pageCount, thumbnail, language, price } = comic;
  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Все комиксы
      </Link>
    </div>
  );
};

export default SingleComicPage;