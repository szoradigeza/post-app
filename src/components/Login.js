import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import firebase from "../firebase";

const Login = ({ setUser }) => {
  const { onLogin } = useContext(UserContext);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(email);
    console.log(password);
    onLogin(email, password);
  };

  return (
    <form className="container" name="login" onSubmit={handleLogin}>
      <p>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </p>
      <p>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </p>
      <p>
        <button type="submit" disabled={!email && !password}>
          Login
        </button>
      </p>
    </form>
  );
};

export default Login;
