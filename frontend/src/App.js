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
import PersonalPage from "pages/PersonalPage";

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
        <Route
          exact
          path="books/details/:libraryId/:title"
          element={<BookDetails />}
        />
        <Route exact path="signin" element={<SignIn />} />
        <Route exact path="signup" element={<SignUp />} />
        <Route
          exact
          path="books/read/:libraryId/:title"
          element={
            <RequireAuth>
              <ReadBook />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="books/notes/:libraryId/:title/:readingPage"
          element={
            <RequireAuth>
              <BookNotes />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <RequireAuth>
              <PersonalPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default App;
