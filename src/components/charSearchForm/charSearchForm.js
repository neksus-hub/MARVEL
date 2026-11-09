import { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
} from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import Error from "../error/Error";

import "./charSearchForm.scss";
import Spinner from "../spinner/Spinner";

const setContent = (process, Component, data) => {
  switch (process) {
    case "Waiting":
      return null;
    case "Loading":
      return <Spinner />;
    case "Confirmed":
      return <Component char={data}/>;
    case "Error":
      return (
        <div className="char__search-critical-error">
          <Error />
        </div>
      );
    default:
      return (
        <div className="char__search-error">
          Персонаж не найден. Проверьте имя и повторите попытку.
        </div>
      );
  }
};

const CharSearchForm = () => {
  const [char, setChar] = useState(null);
  const { process, setProcess, getCharacterByName, clearError } = useMarvelService();

  //Смена статуса после загрузки персонажа
  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = (name) => {
    clearError();
    getCharacterByName(name)
    .then(onCharLoaded)
    .then(() => setProcess('Confirmed'))
  };

  const View = ({char}) => {
    const { name, id } = char
    return (
      <div className="char__search-wrapper">
        <div className="char__search-susses">
          Успех! Перейти на страницу {name}?
        </div>
        <Link
          to={`/characters/${id}`}
          className="button button__secondary"
        >
          <div className="inner">О персонаже</div>
        </Link>
      </div>
    )
  }

  //Form - компонент - при нажатии на кнопку отправки формы вызовет formik.onSubmit, если пройдена валидация
  //Field - компонент - вызовет встроенные ф-ции formik.values.name, formik.handleChange, formik.handleBlur (value возьмет из name)
  return (
    <div className="char__search-form">
      <Formik
        initialValues={{
          charName: "",
        }}
        validationSchema={Yup.object({
          charName: Yup.string().required("Обязательное поле!"),
        })}
        onSubmit={({ charName }) => {
          updateChar(charName);
        }}
      >
        <Form>
          <label className="char__search-label" htmlFor="charName">
            Или найдите персонажа по полному имени:
          </label>
          <div className="char__search-wrapper">
            <Field
              id="charName"
              name="charName"
              type="text"
              placeholder="Введите имя"
            />

            <button
              type="submit"
              className="button button__main"
              disabled={process === 'Loading'}
            >
              <div className="inner">Найти</div>
            </button>
          </div>

          <FormikErrorMessage
            component="div"
            className="char__search-error"
            name="charName"
          />
        </Form>
      </Formik>
      {setContent(process, View, char)}
    </div>
  );
};

export default CharSearchForm;