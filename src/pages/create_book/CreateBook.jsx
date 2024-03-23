import React, { useState } from "react";
import BackButton from "../../components/back_button/BackButton";
import Spinner from "../../components/spinner/Spinner";
import styles from "./CreateBook.module.scss";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";

function CreateBook() {
  const [inputBook, setInputBook] = useState({
    title: "",
    author: "",
    publishYear: "",
    pageCount: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleInputBook(e) {
    setInputBook((currState) => ({
      ...currState,
      [e.target.name]: e.target.value.trim(),
    }));
  }

  function handleSaveBook(e) {
    e.preventDefault();
    setLoading(true);
    fetch("https://bookstorerauch.vercel.app/books", {
      method: "POST",
      body: JSON.stringify(inputBook),
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setLoading(false);
        setInputBook({
          title: "",
          author: "",
          publishYear: "",
          pageCount: "",
        });
        alert("Book added Successfully!! ");
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  return (
    <div className={styles.create_book_page}>
      <h1>Add a Book so that the whole World can see it!</h1>
      <BackButton />
      <form onSubmit={handleSaveBook} className={styles.form_container}>
        <div>
          <label htmlFor="inp-title">Title:</label>
          <input
            type="text"
            name="title"
            onChange={handleInputBook}
            value={inputBook.title}
            id="inp-title"
            required
          />
        </div>
        <div>
          <label htmlFor="inp-author">Author:</label>
          <input
            type="text"
            name="author"
            onChange={handleInputBook}
            value={inputBook.author}
            id="inp-author"
            required
          />
        </div>
        <div>
          <label htmlFor="inp-publishYear">PublishYear:</label>
          <input
            type="number"
            name="publishYear"
            onChange={handleInputBook}
            value={inputBook.publishYear}
            id="inp-publishYear"
            required
          />
        </div>
        <div>
          <label htmlFor="inp-pageCount">PageCount:</label>
          <input
            type="number"
            name="pageCount"
            onChange={handleInputBook}
            value={inputBook.pageCount}
            id="inp-pageCount"
            required
          />
        </div>

        <Button type="submit" className={"addBook_button"}>
          Create Book
        </Button>
      </form>

      {loading && <Spinner />}
    </div>
  );
}

export default CreateBook;
