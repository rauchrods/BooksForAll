import React from "react";
import { useSelector } from "react-redux";
import Button from "../../components/button/Button";
import styles from "./Profile.module.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutSuccess } from "../../redux/bookstoreSlice";

function Profile() {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logoutHandler() {
    dispatch(logoutSuccess());
    navigate("/");
  }

  return (
    <div className={styles.profile_container}>
      <h1>Profile</h1>
      <div className={styles.container}>
        <form>
          <div>
            <label htmlFor="inp-username">UserName: </label>
            <input
              type="text"
              name="username"
              id="inp-username"
              placeholder="username"
              autoComplete="true"
              disabled={true}
              value={currentUser.userName}
            />
          </div>
          <div>
            <label htmlFor="inp-email">email: </label>
            <input
              type="email"
              name="email"
              id="inp-email"
              placeholder="email"
              autoComplete="true"
              disabled={true}
              value={currentUser.email}
            />
          </div>
          {/* <div>
            <label htmlFor="inp-password">Password: </label>
            <input
              type="password"
              name="password"
              id="inp-password"
              placeholder="password"
              autoComplete="true"
              disabled="true"
              value={currentUser.password}
            />
          </div> */}

          <Button className={"logout_btn"} onClick={logoutHandler}>
            Logout
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
