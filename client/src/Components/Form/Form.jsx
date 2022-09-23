import React from "react";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import "./form.scss";

const Form = ({ login, username, setUserName, password, setPassword }) => {
  return (
    <form className="form" autoComplete="off" onSubmit={login}>
      <Input
        id="username"
        label="Username"
        type="email"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />
      <Input
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default Form;
