import React from "react";
import { useState, useEffect } from "react";
import NavbarLaypout from "../components/NavbarLayout";
import HomeCard from "../components/HomeCard";
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <div>
      <NavbarLaypout />
      <Container>
        <h1 id="hometitle" className="text-center mt-4 mb-4">Thai-dot Keyboard Store</h1>
        <HomeCard />
      </Container>
    </div>
  );
};

export default Home;
