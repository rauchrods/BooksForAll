import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateBook from "./pages/create_book/CreateBook";
import Home from "./pages/home/Home";
import ShowBook from "./pages/show_book/ShowBook";
import UpdateBook from "./pages/update_book/UpdateBook";
import DeleteBook from "./pages/delete_book/DeleteBook";

function App() {
  

  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="/books">
        <Route path="create" element={<CreateBook />} />
        <Route path="details/:id" element={<ShowBook />} />
        <Route path="edit/:id" element={<UpdateBook />} />
        <Route path="delete/:id" element={<DeleteBook />} />
      </Route>
      <Route path="*" element={<h1>404 Page not found</h1>}/>
    </Routes>
  );
}

export default App;
