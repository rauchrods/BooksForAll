import React, {  useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import Button from "../../components/button/Button";
import styles from './DeleteBook.module.scss';

function DeleteBook() {
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  function deleteBookHandler() {
    setLoading(true);
    fetch(`https://bookstorerauch.vercel.app/books/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);

        alert("Book Deleted Succesfully!!");
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  function cancelDeleteBookHandler(){
     navigate("/");;
  }

  return (
    <div className={styles.delete_book_page}>
      <div className="">
        <p>Are you Sure you want to delete this Book?</p>
        <div>
        <Button className={"deleteBook_button"} onClick={deleteBookHandler}>
          Delete
        </Button>
        <Button  onClick={cancelDeleteBookHandler}>
          Cancel
        </Button>
        </div>
        
      </div>
      {loading && <Spinner />}
    </div>
  );
}

export default DeleteBook;
