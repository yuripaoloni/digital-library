import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import SearchBooks from "pages/SearchBooks";
import BookDetails from "pages/BookDetails";
import Landing from "pages/Landing";
import NoMatch from "pages/NoMatch";
import SignIn from "pages/Signin";
import SignUp from "pages/Signup";
import ReadBook from "pages/ReadBook";
import BookNotes from "pages/BookNotes";
import Navbar from "components/Navbar";
import RequireAuth from "components/RequireAuth";
import { fetchRandomBooks, fetchLibraries } from "states/booksSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRandomBooks());
    dispatch(fetchLibraries());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route exact path="books" element={<SearchBooks />} />
        <Route exact path="books/:page/:index" element={<BookDetails />} />
        <Route exact path="signin" element={<SignIn />} />
        <Route exact path="signup" element={<SignUp />} />
        <Route
          exact
          path="read/:page/:index"
          element={
            <RequireAuth>
              <ReadBook />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="notes/:page/:index/:readingPage"
          element={
            <RequireAuth>
              <BookNotes />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default App;
