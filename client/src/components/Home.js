import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import NavbarLaypout from './NavbarLayout';
import { Container } from 'react-bootstrap';

const Home = () => {
  const [keyboards,setKeyboards] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5123/api/keyboard").then(res => {
      setKeyboards(res.data)
    })

  },[keyboards]);

  return (
    <div>
      <NavbarLaypout />
      <Container>
        <h1 className="text-center mt-4 mb-4">Thai-dot Keyboard Store</h1>
        {keyboards.map((keyboard,index) => (
          <div className="d-flex justify-content-center" key={keyboard._id}>
            <div className="card m-2" style={{ width: "8rem" }}>
              <img
                src={keyboard.keyboardImage}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{keyboard.keyboardName}</h5>
                <p className="card-text">{keyboard.keyboardDescription}</p>
                <p className="card-text">Price: {keyboard.keyboardPrice}</p>
                <p className="card-text">
                  Quantity: {keyboard.keyboardQuantity}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
}

export default Home