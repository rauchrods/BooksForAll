import React from "react";
import styles from "./Button.module.scss";

function Button({ type = "button", children, className, onClick }) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[className]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
