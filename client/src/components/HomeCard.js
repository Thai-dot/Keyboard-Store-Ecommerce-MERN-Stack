import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Row,Col,Card,Button } from "react-bootstrap";
import Loading from "../components/Loading";

const HomeCard = () => {

    const [keyboards, setKeyboards] = useState([]);

    const [loading,setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        try {
           axios.get("http://localhost:5123/api/keyboard").then((res) => {
             setKeyboards(res.data);
           });
           setLoading(false);
        } catch (error) {
          console.log(error);
        }
     
    }, []);

    if(loading){
      return <Loading />
    }
  return (
    <div>
      <Row xs={1} md={4} className="g-4">
        {keyboards.map((keyboard,index) => (
          <Col key={index}>
            <Card>
              <Card.Img variant="top" src={keyboard.keyboardImage} />
              <Card.Body>
                <Card.Title>{keyboard.keyboardName}</Card.Title>
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Text className="mb-0 fw-bold priceColor">
                    {keyboard.keyboardPrice}
                    <span>$</span>
                  </Card.Text>
                  <Card.Link>
                    <Link to={`/keyboard/product/${keyboard._id}`}>
                      <Button variant="primary">Detail</Button>
                    </Link>
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