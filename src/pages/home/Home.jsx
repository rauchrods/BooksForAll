import React, { useEffect, useState } from "react";
import Spinner from "../../components/spinner/Spinner";
import { Link } from "react-router-dom";
import { FaCircleInfo } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import styles from "./Home.module.scss";
import { CiSquarePlus } from "react-icons/ci";
// import axios from "axios";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterBooks, setFilterBooks] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://bookstorerauch.vercel.app/books")
      .then((response) => response.json())
      .then((response) => {
        setBooks(response.data);
        setFilterBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function filterBooksHandler(e) {
    setBooks(
      filterBooks.filter((book) => book.title.includes(e.target.value.trim()))
    );
  }

  return (
    <div className={styles.home_page}>
      <div className={styles.title_sec}>
        <h1>
          Books List{" "}
          <span>
            <Link to={`/books/create`}>
              <CiSquarePlus />
            </Link>
          </span>
        </h1>

        <input
          type="search"
          name="searchBooks"
          id=""
          onChange={filterBooksHandler}
          placeholder="Search Books"
        />
      </div>

      {books && books.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Author</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <div className={styles.crud_sec}>
                    <Link to={`/books/details/${book._id}`}>
                      <FaCircleInfo />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <FaEdit />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <MdDelete />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {books.length == 0 && (
        <h2>No Books Present in Database Please add it to see here</h2>
      )}

      {loading && <Spinner />}
    </div>
  );
}

export default Home;
