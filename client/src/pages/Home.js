import React from "react";
import HomeCard from "../components/HomeCard";
import { Container } from "react-bootstrap";

const Home = () => {
  return (
      <Container className="mt-10 mb-5">
        <h1 id="hometitle" className="text-center mb-4">Thai-dot Keyboard Store</h1>
        <HomeCard />
      </Container>
    
  );
};

export default Home;
