import React, { useEffect, useState } from "react";
import Spinner from "../../components/spinner/Spinner";
import { Link } from "react-router-dom";
import { FaCircleInfo } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { MdEditOff } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import styles from "./Home.module.scss";
import { CiSquarePlus } from "react-icons/ci";
import { useSelector } from "react-redux";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterBooks, setFilterBooks] = useState([]);
  const currentUser = useSelector((state) => state.currentUser);

  // console.log(currentUser);

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
        setLoading(false);
        console.log(error);
      });
  }, []);

  console.log(filterBooks);

  function filterBooksHandler(e) {
    setBooks(
      filterBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(e.target.value.toLowerCase().trim()) ||
          book.author.toLowerCase().includes(e.target.value.toLowerCase().trim()) ||
          book.genre.toLowerCase().includes(e.target.value.toLowerCase().trim())
      )
    );
  }

  return (
    <div className={styles.home_page}>
      <div>{currentUser && <h1>Welcome {currentUser.userName}</h1>}</div>
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
          placeholder="Search Books..."
        />
      </div>
      <div className={styles.table_container}>
        {books && books.length > 0 && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>
                    <div className={styles.crud_sec}>
                      <Link to={`/books/details/${book._id}`}>
                        <FaCircleInfo />
                      </Link>
                      {currentUser && currentUser._id === book.userId ? (
                        <Link to={`/books/edit/${book._id}`}>
                          <FaEdit />
                        </Link>
                      ) : (
                        <MdEditOff />
                      )}
                      {currentUser && currentUser._id === book.userId ? (
                        <Link to={`/books/delete/${book._id}`}>
                          <MdDelete />
                        </Link>
                      ) : (
                        <MdDeleteForever />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {loading && <Spinner />}
    </div>
  );
}

export default Home;
