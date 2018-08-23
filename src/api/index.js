// @flow

import axios from "axios";
import history from "./../navigation/history";

let baseURL = process.env.REACT_APP_MOCK_DOMAIN_NAME

if (process.env.NODE_ENV === "production") {
  baseURL = "/";
}

const fetch = axios.create({ baseURL });

fetch.interceptors.request.use(
  config => {
    const auth =
      JSON.parse(window.localStorage.getItem("jwtAuth") || "{}") || {};
    if (typeof auth === "object" && auth.accessToken) {
      config.headers.Authorization = "Bearer " + auth.token;
    }
    config.headers["Cache-Control"] = "no-cache,no-store,must-revalidate,max-age=-1,private";
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

fetch.interceptors.response.use(
  response => {
    if (
      response.data == null &&
      response.config.responseType === "json" &&
      response.request.responseText != null
    ) {
      try {
        response.data = JSON.parse(response.request.responseText);
      } catch (error) {
        // ignored
      }
    }
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      if (!history.location.pathname.includes("auth")) {
        history.push("/auth/signout");
      }
    }
    return Promise.reject(error);
  }
);

export default fetch;
