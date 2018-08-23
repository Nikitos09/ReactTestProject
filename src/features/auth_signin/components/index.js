// @flow
import * as React from "react";
// import type { Props } from "./../types";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUnlock } from "@fortawesome/fontawesome-free-solid";
import Input from "./../../../components/forms/Input";
import "./style/style.css";

export default (props): React.Node | null => {
  const { handleSubmit, error, pageData} = props;
  const {sendForm} = props.actions;
  const { from, gratitudeText } = props.location.state || {};
  if (pageData && pageData.token) {
    return <Redirect to={from || { pathname: "/" }} />;
  }
  return (
    <div className="container login-form">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-2 col-lg-4" />
        <div className="col-12 col-sm-12 col-md-8 col-lg-4">
          <div className="row">
            <h2 textalign="center">Войти в аккаунт</h2>
          </div>
          <div className="row">
            <form
              onSubmit={handleSubmit(sendForm)}
              className="w-100"
              noValidate
            >
              <p>{gratitudeText}</p>
              <Input
                name="email"
                icon={<FontAwesomeIcon icon={faUser} />}
                type="text"
                placeholder="Введите идентификационный номер"
              />
              <Input
                name="password"
                icon={<FontAwesomeIcon icon={faUnlock} />}
                placeholder="Введите пароль"
                type="password"
              />
              <button type="submit" className="btn btn-primary btn-lg w-100">
                Войти
              </button>
              {error && <div className="text-danger">{error}</div>}
            </form>
          </div>
          <div
            className="card w-100 text-center mt-3"
            style={{ width: "23rem" }}
          >
            <div className="card-body">
              <Link to={`/auth/signup`}>Регистрация</Link>
              <br />
              <Link to={`/auth/forgot`}>Забыли пароль?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
