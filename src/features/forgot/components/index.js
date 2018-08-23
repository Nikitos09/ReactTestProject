import * as React from "react";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/fontawesome-free-solid";
import Input from "./../../../components/forms/Input";
import "./style/style.css";

export default (props): React.Node | null => {
  const { handleSubmit, error, isSuccess, pageData } = props;
  const { sendForm } = props.actions;
  const { from, gratitudeText } = props.location.state || {};
  if (pageData && pageData.token) {
    return <Redirect to={from || { pathname: "/" }} />;
  }
  return (
    <div className="container resetPassword-form">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-2 col-lg-4" />
        <div className="col-12 col-sm-12 col-md-8 col-lg-4">
          <div className="row">
            <h2 textalign="center">Забыли пароль?</h2>
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
                icon={<FontAwesomeIcon icon={faEnvelope} />}
                placeholder="Введите ваш email"
                type="text"
              />
              <button type="submit" className="btn btn-primary btn-lg w-100">
                Отправить
              </button>
              {error && <div className="text-danger">{error}</div>}
              {isSuccess && <div className="text-success">На указанный email отправлено письмо. Проверьте почту для продолжения процедуры восстановления пароля</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
