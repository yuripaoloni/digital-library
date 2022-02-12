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
import PersonalPage from "pages/PersonalPage";
import GroupsPage from "pages/GroupsPage";

import Navbar from "components/Navbar";
import RequireAuth from "components/RequireAuth";

import { fetchRandomBooks, fetchLibraries } from "states/booksSlice";
import { onSearchUser } from "states/authSlice";
import { onFetchGroups } from "states/groupsSlice";
import ResetPassword from "pages/ResetPassword";
document.body.style = "background: #F3F4F7;";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRandomBooks());
    dispatch(fetchLibraries());
    if (localStorage.getItem("username") && localStorage.getItem("authToken")) {
      dispatch(onSearchUser({ param: localStorage.getItem("username") }));
      dispatch(onFetchGroups());
    }
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
        <Route exact path="resetPassword" element={<ResetPassword />} />
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
        <Route
          exact
          path="/groups"
          element={
            <RequireAuth>
              <GroupsPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default App;
