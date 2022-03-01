import React from "react";
import Home from "./pages/Home";
import Product from "./pages/Product";
import FooterLayout from "./components/FooterLayout";
import NavbarLayout from "./components/NavbarLayout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <div className="MainBody">
      <Router>
        <NavbarLayout />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/keyboard/product/:productId" element={<Product />} />
        </Routes>
        <FooterLayout />
      </Router>
    </div>
  );
};

export default App;
