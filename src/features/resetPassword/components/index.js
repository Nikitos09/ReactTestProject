import * as React from "react";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock } from "@fortawesome/fontawesome-free-solid";
import Input from "./../../../components/forms/Input";
import "./style/style.css";

export default (props): React.Node | null => {
  const { handleSubmit, error, isSuccess } = props;
  const { sendForm } = props.actions;
  const { from, gratitudeText } = props.location.state || {};
  if (isSuccess) {
    return <Redirect to={from || { pathname: "/auth/signin" }} />;
  }
  return (
    <div className="container resetPassword-form">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-2 col-lg-4" />
        <div className="col-12 col-sm-12 col-md-8 col-lg-4">
          <div className="row">
            <h2 textalign="center">Изменение пароля</h2>
          </div>
          <div className="row">
            <form
              onSubmit={handleSubmit(sendForm)}
              className="w-100"
              noValidate
            >
              <p>{gratitudeText}</p>
              <Input
                name="newPassword"
                icon={<FontAwesomeIcon icon={faUnlock} />}
                placeholder="Введите пароль"
                type="password"
              />
              <Input
                name="confirm_newPassword"
                icon={<FontAwesomeIcon icon={faUnlock} />}
                placeholder="Повторите пароль"
                type="password"
              />
              <button type="submit" className="btn btn-primary btn-lg w-100">
                Изменить
              </button>
              {error && <div className="text-danger">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
