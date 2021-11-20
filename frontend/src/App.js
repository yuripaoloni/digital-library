import Footer from "components/Footer";
import Navbar from "components/Navbar";

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>{/* tutte le routes */}</Routes>
      <Footer />
    </>
  );
};

export default App;
