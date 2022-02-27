import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { Container,Row,Col,Card,Button } from "react-bootstrap";

const HomeCard = () => {

    const [keyboards, setKeyboards] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:5123/api/keyboard").then((res) => {
        setKeyboards(res.data);
      });
    }, [keyboards]);
  return (
    <div>
      <Row xs={1} md={4} className="g-4">
        {keyboards.map((keyboard) => (
          <Col>
            <Card>
              <Card.Img variant="top" src={keyboard.keyboardImage} />
              <Card.Body>
                <Card.Title>{keyboard.keyboardName}</Card.Title>
                <div className='d-flex justify-content-between align-items-center'>
                  <Card.Text className='mb-0 fw-bold priceColor'>
                    {keyboard.keyboardPrice}
                    <span>$</span>
                  </Card.Text>
                  <Card.Link>
                    <Button variant="primary">Detail</Button>
                  </Card.Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomeCard