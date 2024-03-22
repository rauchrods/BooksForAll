import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";

function DeleteBook() {
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  return <div className={"delete_book_page"}>{loading && <Spinner />}</div>;
}

export default DeleteBook;
