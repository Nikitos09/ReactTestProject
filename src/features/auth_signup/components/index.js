import * as React from "react";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUnlock, faEnvelope} from "@fortawesome/fontawesome-free-solid";
import Input from "./../../../components/forms/Input";
import "./style/style.css";

export default (props): React.Node | null => {
  const { handleSubmit, error, pageData} = props;
  const {sendForm} = props.actions;
  const { from, gratitudeText } = props.location.state || {};
  if (pageData && pageData.data.success) {
    return <Redirect to={from || { pathname: "/" }} />;
  }
  return (
    <div className="container login-form">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-2 col-lg-4" />
        <div className="col-12 col-sm-12 col-md-8 col-lg-4">
          <div className="row justify-content-center">
            <h2>Зарегистрировать акаунт</h2>
          </div>
          <div className="row">
            <form
              onSubmit={handleSubmit(sendForm)}
              className="w-100"
              noValidate
            >
              <p>{gratitudeText}</p>
              <Input
                name="name"
                icon={<FontAwesomeIcon icon={faUser} />}
                type="text"
                placeholder="Введите имя"
              />
              <Input
                name="email"
                icon={<FontAwesomeIcon icon={faEnvelope} />}
                type="text"
                placeholder="Введите email"
              />
              <Input
                name="password"
                icon={<FontAwesomeIcon icon={faUnlock} />}
                placeholder="Введите пароль"
                type="password"
              />
              <Input
                name="confirm_password"
                icon={<FontAwesomeIcon icon={faUnlock} />}
                placeholder="Повторите пароль"
                type="password"
              />
              <button type="submit" className="btn btn-primary btn-lg w-100">
                Зарегистрироваться
              </button>
              {error && <div className="text-danger">{error}</div>}
            </form>
          </div>
          <div
            className="card w-100 text-center mt-3"
            style={{ width: "23rem" }}
          >
            <div className="card-body">
              <Link to={`/auth/signin`}>Авторизация</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
