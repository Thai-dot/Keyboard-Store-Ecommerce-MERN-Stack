import React from "react";
import { Spinner, Container } from "react-bootstrap";

const Loading = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Spinner animation="border" variant="info" className="me-2" />
      <Spinner animation="border" variant="info" className="me-2" />
      <Spinner animation="border" variant="info" />
    </Container>
  );
};

export default Loading;
