import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import styles from "./ShowBook.module.scss";
import BackButton from "../../components/back_button/BackButton";

function ShowBook() {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`https://bookstorerauch.vercel.app/books/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setBook(response);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  function redirectLinkHandler(link){
    window.open(link, "_blank");
  }

  return (
    <div className={styles.show_book}>
      <h1>Book Details</h1>

      <BackButton/>

      {book && (
        <div className={styles.book_container}>
          <div><span>ID:</span> {book._id}</div>
          <div><span>Title:</span> {book.title}</div>
          <div><span>Author:</span> {book.author}</div>
          <div><span>Genre:</span> {book.genre}</div>
          <div><span>Publish Year:</span> {book.publishYear}</div>
          <div><span>Page Count:</span> {book.pageCount}</div>
          <div><span>Created At:</span> {new Date(book.createdAt).toUTCString()}</div>
          <div><span>Last Updated:</span> {new Date(book.updatedAt).toUTCString()}</div>
          <div ><span>PDF Link:</span> <a href={book.pdfLink} target="blank">link for pdf</a></div>
        </div>
      )}

      {loading && <Spinner />}
    </div>
  );
}

export default ShowBook;
