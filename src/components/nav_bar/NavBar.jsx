import React, { useState } from "react";
import styles from "./NavBar.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoIosMenu } from "react-icons/io";
import { MdMenuOpen } from "react-icons/md";

function NavBar() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const currentUser = useSelector((state) => state.currentUser);

  function menuOpenHandler() {
    setIsMenuOpened((currState) => !currState);
  }

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
      <div className={styles.ham_menu} onClick={menuOpenHandler}>
        {isMenuOpened ? <MdMenuOpen /> : <IoIosMenu />}
      </div>

      {isMenuOpened && (
        <div className={styles.ham_menu_display}>
          {currentUser && (
            <Link to={"/yourbooks"}>
              <span onClick={menuOpenHandler}>Your Books</span>
            </Link>
          )}
          <Link to={"/about"}>
            <span onClick={menuOpenHandler}>About</span>
          </Link>
          {currentUser ? (
            <Link to={"/profile"}>
              <span onClick={menuOpenHandler}>{currentUser.userName}</span>
            </Link>
          ) : (
            <Link to={"/signup"}>
              <span onClick={menuOpenHandler}>SignIn</span>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
