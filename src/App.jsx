import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateBook from "./pages/create_book/CreateBook";
import Home from "./pages/home/Home";
import ShowBook from "./pages/show_book/ShowBook";
import UpdateBook from "./pages/update_book/UpdateBook";
import DeleteBook from "./pages/delete_book/DeleteBook";
import LogIn from "./pages/log_in/LogIn";
import SignIn from "./pages/sign_in/SignIn";
import Profile from "./pages/profile/Profile";
import About from "./pages/about/About";
import NavBar from "./components/nav_bar/NavBar";
import YourBook from "./pages/your_books/YourBook";
// import { ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books">
          <Route path="create" element={<CreateBook />} />
          <Route path="details/:id" element={<ShowBook />} />
          <Route path="edit/:id" element={<UpdateBook />} />
          <Route path="delete/:id" element={<DeleteBook />} />
        </Route>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About/>} />
        <Route path="/yourbooks" element={<YourBook/>} />
        <Route path="*" element={<h1>404 Page not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
