import React from 'react'
import { Navbar, Nav, Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";

const NavbarLaypout = () => {
  return (
    <div>
      <Navbar sticky="top" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand
            href="home"
            className="d-flex
            align-items-center"
          >
            <Image
              width={38}
              height={38}
              fluid
              src="https://cdn-icons-png.flaticon.com/512/2867/2867522.png"
              alt="logo"
              className="d-inline-block me-3 mb-3"
            />
            <span>Keyboard Store</span>
          </Navbar.Brand>
          <Nav
            className="ms-auto"
          >
            
            <Nav.Link href="cart">Cart</Nav.Link>
            <Nav.Link href="login">Login/Sign in</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarLaypout;