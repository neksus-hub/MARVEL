import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Spinner from "../components/spinner/Spinner";
import Error from "../components/error/Error";
import useMarvelService from "../services/MarvelService";
import AppBanner from "../components/appBanner/AppBanner";

const SinglePage = ({ Component, dataType }) => {
  //useParams() - отдает объект вида {id: '8461'}
  const { id } = useParams();
  const [data, setData] = useState(null);

  // элемент класса MarvelService - объект CharInfo
  const { loading, error, clearError, getComic, getCharacter } =
    useMarvelService();

  useEffect(() => {
    updateData();
  }, [id]);

  //Смена статуса после загрузки персонажа
  const onDataLoaded = (data) => {
    setData(data);
  };

  const updateData = () => {
    clearError();
    switch (dataType) {
      case "comic":
        getComic(id).then(onDataLoaded);
        break;
      case "character":
        getCharacter(id).then(onDataLoaded);
        break;
      default:
        break;
    }
  };

  const errorMessage = error ? <Error /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !data) ? (
    <Component data={data} />
  ) : null;

  return (
    <>
      <AppBanner />
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

export default SinglePage;