import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Landing from "pages/Landing";
import SearchBooks from "pages/SearchBooks";

import { fetchLibraries } from "states/slices";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLibraries());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Landing />
       <Routes>
        <Route path="/" element={<SearchBooks />} />
       </Routes>
      <Footer />
    </>
  );
};

export default App;
