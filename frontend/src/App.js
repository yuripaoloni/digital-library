import React, { useEffect } from "react";

import Navbar from "components/Navbar";
import SearchBooks from "pages/SearchBooks";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { fetchLibraries } from "states/slices";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLibraries());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SearchBooks />} />
      </Routes>
    </>
  );
};

export default App;
