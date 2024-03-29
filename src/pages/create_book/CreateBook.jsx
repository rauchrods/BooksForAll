import React, { useEffect, useState } from "react";
import BackButton from "../../components/back_button/BackButton";
import Spinner from "../../components/spinner/Spinner";
import styles from "./CreateBook.module.scss";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { useSelector } from "react-redux";

function CreateBook() {
  const currentUser = useSelector((state) => state.currentUser);
  const [inputBook, setInputBook] = useState({
    title: "",
    author: "",
    publishYear: "",
    pageCount: "",
    genre: "",
    pdfLink: "",
    userId: currentUser ? currentUser._id : "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const validPdfLinkRegEx = new RegExp(
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
  );

  function handleInputBook(e) {
    setInputBook((currState) => ({
      ...currState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSaveBook(e) {
    e.preventDefault();
    if (!inputBook.pdfLink.match(validPdfLinkRegEx)) {
      setErrorMsg("Enter a valid URl link");
      // console.log("invalid url");
      return;
    }

    const refinedInputBook = {
      ...inputBook,
      title: inputBook.title.trim(),
      author: inputBook.author.trim(),
      genre: inputBook.genre.trim(),
      pdfLink: inputBook.pdfLink.trim(),
    };

    setLoading(true);
    fetch("https://bookstorerauch.vercel.app/books", {
      method: "POST",
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
        alert("Book added Successfully!! ");

        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
        // console.log(error);
      });
  }

  useEffect(() => {
    if (currentUser === null) {
      navigate("/signup");
    }
  });

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
        <div>
          <label htmlFor="inp-genre">Genre:</label>
          <input
            type="text"
            name="genre"
            onChange={handleInputBook}
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
            onChange={handleInputBook}
            value={inputBook.pdfLink}
            id="inp-pdfLink"
            required
            placeholder="Paste the shareable link of your pdf file ."
          />
        </div>

        <Button type="submit" className={"addBook_button"}>
          Create Book
        </Button>
      </form>
      {errorMsg && (
        <p
          style={{
            color: "red",
          }}
        >
          {errorMsg}
        </p>
      )}

      {loading && <Spinner />}
    </div>
  );
}

export default CreateBook;
