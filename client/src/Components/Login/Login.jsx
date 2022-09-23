import React, { useState } from "react";
import axios from "axios";
import Form from "../Form/Form";
import "./login.scss";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [succsess, setSuccsess] = useState("");

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5600/api/auth/login", {
        username,
        password,
      })
      .then((response) => {
        console.log("response", response);
        localStorage.setItem(
          "login",
          JSON.stringify({
            userLogin: true,
            token: response.data.access_token,
          })
        );
        setError("");
        setUserName("");
        setPassword("");
        setSuccsess(response.data.succsessMessage);
      })
      .catch((error) => setError(error.response.data.errorMessage));
  };
  return (
    <div className="login">
      <div className="login__form-wrapper">
        <h2 className="login__title">Страница входа</h2>
        {error && <p className="login__error">{error}</p>}
        {succsess && <p className="login__succsess">{succsess}</p>}
        <Form
          login={login}
          username={username}
          setUserName={setUserName}
          password={password}
          setPassword={setPassword}
        />
      </div>
    </div>
  );
};

export default Login;
