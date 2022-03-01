import React from "react";
import styled from "styled-components";
import {Form,Button} from "react-bootstrap";
import { BsCartPlusFill } from "react-icons/bs";

const AddProcductToCart = ({ keyboard }) => {
  const { keyboardColor, keyboardQuantity } = keyboard;
  console.log(keyboardColor);
  return (
    <Wrapper className="margin-left-block">
      <Form>
        <Form.Label className="text-success fst-italic">
          Choose Color:{" "}
        </Form.Label>
        <Form.Select className="input-width">
          <option>Color</option>
          {keyboardColor
            ? keyboardColor.map((color, index) => (
                <option key={index} value={color}>
                  {color}
                </option>
              ))
            : "No Color"}
        </Form.Select>

        <div className="d-flex justify-content-between">
          <Form.Group className="mt-3">
            <Form.Label className="text-success fst-italic">
              Choose Number:{" "}
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="1"
              min={1}
              max={keyboardQuantity}
              className="input-width"
            />
          </Form.Group>
          <Button variant="primary" className="button-height d-flex align-items-center">
            <BsCartPlusFill className="me-2" /> 
            <span>
            Add to Cart

            </span>
          </Button>
        </div>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .price-color {
    color: #ff0000;
  }

  .margin-left-block {
    margin-left: 127px;
  }

  .input-width{
    max-width: 100px;
  }
  .button-height{
    height: 50px;
    margin-top: auto;
  }
`;

export default AddProcductToCart;
