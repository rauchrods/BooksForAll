import React, { useState } from "react";
import styles from "./SignIn.module.scss";
import Button from "../../components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";

function SignIn() {
  const [userInput, setUserInput] = useState({
    userName: "",
    email: "",
    password: "",
    cnfPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function handleUserInput(e) {
    setUserInput((currState) => ({
      ...currState,
      [e.target.name]: e.target.value.trim(),
    }));
  }



  function handleSubmitUser(e) {
    e.preventDefault();
    if (userInput.password !== userInput.cnfPassword) {
      setErrorMessage("Password is not matching");
      return;
    }

    setLoading(true);
    fetch("https://bookstorerauch.vercel.app/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInput),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        alert(result.message);
        setLoading(false);
        setErrorMessage("");
        if (result.message === "User created succesfully!") {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
        setErrorMessage("");
        setLoading(false);
      });
  }

  return (
    <div className={styles.SignUp_container}>
      <h1>Sign Up</h1>
      <div className={styles.container}>
        <form className={styles.form_container} onSubmit={handleSubmitUser}>
          <div>
            <label htmlFor="inp-username">Username: </label>
            <input
              type="text"
              name="userName"
              id="inp-username"
              placeholder="username"
              required
              onChange={handleUserInput}
              autoComplete="true"
            />
          </div>
          <div>
            <label htmlFor="inp-email">Email: </label>
            <input
              type="email"
              name="email"
              id="inp-email"
              placeholder="email"
              required
              onChange={handleUserInput}
              autoComplete="true"
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
              onChange={handleUserInput}
              autoComplete="true"
            />
          </div>
          <div>
            <label htmlFor="inp-cnfPassword">Confirm Password: </label>
            <input
              type="password"
              name="cnfPassword"
              id="inp-cnfPassword"
              placeholder="confirm password"
              required
              onChange={handleUserInput}
              autoComplete="false"
            />
          </div>
          <Button type="submit">SignUp</Button>
        </form>

        <div className={styles.bottom_ctn}>
          <span>Have an account?</span>
          <span>
            <Link to={"/login"}>Log In</Link>
          </span>
        </div>
      </div>
      {errMessage && <p style={{
        color: "red"
      }}>{errMessage}</p>}

      {loading && <Spinner />}
    </div>
  );
}

export default SignIn;
