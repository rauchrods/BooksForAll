import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../components/back_button/BackButton";
import styles from "./UpdateBook.module.scss";
import Spinner from "../../components/spinner/Spinner";
import Button from "../../components/button/Button";

function UpdateBook() {
  const [inputBook, setInputBook] = useState({
    title: "",
    author: "",
    publishYear: "",
    pageCount: "",
    genre: "",
    pdfLink: "",
  });
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  function handleEditBook(e) {
    setInputBook((currState) => ({
      ...currState,
      [e.target.name]: e.target.value,
    }));
  }
  useEffect(() => {
    setLoading(true);
    fetch(`https://bookstorerauch.vercel.app/books/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setInputBook(response);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  // console.log(inputBook);
  function handleSubmitBook(e) {
    e.preventDefault();
    setLoading(true);
    const refinedInputBook = {
      ...inputBook,
      title: inputBook.title.trim(),
      author: inputBook.author.trim(),
      genre: inputBook.genre.trim(),
      pdfLink: inputBook.pdfLink.trim(),
    };
    fetch(`https://bookstorerauch.vercel.app/books/${id}`, {
      method: "PUT",
      body: JSON.stringify(refinedInputBook),
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setLoading(false);
        setInputBook({
          title: "",
          author: "",
          publishYear: "",
          pageCount: "",
          genre: "",
          pdfLink: "",
        });
        alert("Book Updated Succesfully!!");
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  return (
    <div className={styles.edit_book_page}>
      <h1>Edit a Book</h1>
      <BackButton />
      <form onSubmit={handleSubmitBook} className={styles.form_container}>
        <div>
          <label htmlFor="inp-title">Title:</label>
          <input
            type="text"
            name="title"
            onChange={handleEditBook}
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
            onChange={handleEditBook}
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
            onChange={handleEditBook}
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
            onChange={handleEditBook}
            value={inputBook.pageCount}
            id="inp-pageCount"
            required
          />
        </div>
        <div>
          <label htmlFor="inp-genre">Genre:</label>
          <input
            type="text"
            name="genre"
            onChange={handleEditBook}
            value={inputBook.genre}
            id="inp-genre"
            required
          />
        </div>
        <div>
          <label htmlFor="inp-pdfLink">PdfLink:</label>
          <input
            type="text"
            name="pdfLink"
            onChange={handleEditBook}
            value={inputBook.pdfLink}
            id="inp-pdfLink"
            required
          />
        </div>

        <Button type="submit">Edit Book</Button>
      </form>

      {loading && <Spinner />}
    </div>
  );
}

export default UpdateBook;
