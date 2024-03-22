import React from "react";
import styles from "./Spinner.module.scss";

function Spinner() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default Spinner;
