import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';
import Loading from '../components/Loading';
import styled from "styled-components";
import {Container,Row,Col} from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import ProductInfor from '../components/ProductInfor';

const Product = () => {

  let params = useParams();
    const [keyboard, setKeyboard] = useState([]);

    const [loading,setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        try {
              axios
                .get(`http://localhost:5123/api/keyboard/${params.productId}`)
                .then((res) => {
                  setKeyboard(res.data);
                });
                setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }, []);


    if(loading){
        return <Loading />
    }

    console.log(keyboard);
  return (
    <Wrapper>
      <Container className="mt-10 mb-5">
        <Row md={2}>
          <Col className="d-flex flex-column g-4 border shadow mt-0 ">
            <img
              src={keyboard.keyboardImage}
              alt="keyboard img"
              className="img-fluid product-img mx-auto d-block"
            />
            <h2 className="fw-bold price-color text-center pb-4">
              <span>{keyboard.keyboardPrice}</span>
              <span>$</span>
            </h2>
          </Col>
          <Col>
           
          <ProductInfor keyboard={keyboard} />
              
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .product-img {
    width: 100%;
    max-width: 400px;
    height: 100%;
    max-height: 400px;
  }
  .price-color {
    color: #ffc107;
  }
`;

export default Product