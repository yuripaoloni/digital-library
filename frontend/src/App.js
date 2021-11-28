import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import SearchBooks from "pages/SearchBooks";
import BookDetails from "pages/BookDetails";
import Landing from "pages/Landing";
import NoMatch from "pages/NoMatch";

import Footer from "components/Footer";
import Navbar from "components/Navbar";

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
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
