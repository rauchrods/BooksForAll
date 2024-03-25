import React from "react";
import styles from "./NavBar.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function NavBar() {
  const currentUser = useSelector((state) => state.currentUser);

  return (
    <nav className={styles.navbar}>
      <Link to={"/"}>
        <h2>BooksToYou</h2>
      </Link>
      <div className={styles.right_sec}>
        {currentUser && (
          <Link to={"/yourbooks"}>
            <span>Your Books</span>
          </Link>
        )}
        <Link to={"/about"}>
          <span>About</span>
        </Link>
        {currentUser ? (
          <Link to={"/profile"}>
            <span>{currentUser.userName}</span>
          </Link>
        ) : (
          <Link to={"/signup"}>
            <span>SignIn</span>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
