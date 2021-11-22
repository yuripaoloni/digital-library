import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Landing from "pages/Landing";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar />
      <Landing />
      <Routes>{/* tutte le routes */}</Routes>
      <Footer />
    </>
  );
};

export default App;
