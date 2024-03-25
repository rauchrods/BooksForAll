import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Spinner from "../../components/spinner/Spinner";
import styles from "./Login.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/bookstoreSlice";

function LogIn() {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleUserInput(e) {
    setUserInput((currState) => ({
      ...currState,
      [e.target.name]: e.target.value.trim(),
    }));
  }

  function handleSubmitUser(e) {
    e.preventDefault();
    setLoading(true);
    fetch("https://bookstorerauch.vercel.app/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInput),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        alert(result.message);
        setLoading(false);
        if (result.message === "User logged in  succesfully!") {
          dispatch(loginSuccess(result.body));

          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
        setLoading(false);
      });
  }

  return (
    <div className={styles.login_container}>
      <h1>Log In</h1>
      <div className={styles.container}>
        <form className={styles.form_container} onSubmit={handleSubmitUser}>
          <div>
            <label htmlFor="inp-email">Email: </label>
            <input
              type="email"
              name="email"
              id="inp-email"
              placeholder="email"
              required
              autoComplete="true"
              onChange={handleUserInput}
            />
          </div>
          <div>
            <label htmlFor="inp-password">Password: </label>
            <input
              type="password"
              name="password"
              id="inp-password"
              placeholder="password"
              required
              autoComplete="true"
              onChange={handleUserInput}
            />
          </div>
          <Button type="submit">Login</Button>
        </form>

        <div className={styles.bottom_ctn}>
          <span>New User?</span>
          <span>
            <Link to={"/signup"}>Sign Up</Link>
          </span>
        </div>
      </div>

      {loading && <Spinner />}
    </div>
  );
}

export default LogIn;
