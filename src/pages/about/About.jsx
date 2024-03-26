import React from "react";
import styles from "./About.module.scss";

function About() {
  return (
    <div className={styles.about_container}>
      <div className={styles.content}>
        <p>Hello Book Worms!!</p>
        <p>
          This is an initiative to create a centralised book library where users
          can add, update and delete books. you just need to provide the pdf url
          link uploaded in some cloud like googlecloud etc. Once added your book
          will be available to all the viewers
        </p>
        <p>
          You can check my portfoio here{" "}
          <a href="https://rauchrodrigues.vercel.app/" target="_blank">My Portfolio</a>
        </p>
      </div>
    </div>
  );
}

export default About;
