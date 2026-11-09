import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../services/MarvelService";
import AppBanner from "../components/appBanner/AppBanner";
import setContent from "../utils/setContent";

const SinglePage = ({ Component, dataType }) => {
  //useParams() - отдает объект вида {id: '8461'}
  const { id } = useParams();
  const [data, setData] = useState(null);

  // элемент класса MarvelService - объект CharInfo
  const 
  { 
    process, 
    clearError, 
    getComic, 
    getCharacter, 
    setProcess 
  } = useMarvelService();

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
        getComic(id)
        .then(onDataLoaded)
        .then(() => setProcess('Confirmed'))
        break;
      case "character":
        getCharacter(id)
        .then(onDataLoaded)
        .then(() => setProcess('Confirmed'))
        break;
      default:
        break;
    }
  };

  return (
    <>
      <AppBanner />
      {setContent(process, Component, data)}
    </>
  );
};

export default SinglePage;