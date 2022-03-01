import React from 'react'
import styled from 'styled-components'
import AddProcductToCart from './AddProcductToCart'

const ProductInfor = ({keyboard}) => {
  return (
    <Wrapper>
      <div className="d-flex flex-column ms-5">
        <h2 className="fw-bold text-center">{keyboard.keyboardName}</h2>
        <div className="d-flex justify-content-around align-items-center">
          <p>
            <span className="fw-bold">Brand: </span>
            {keyboard.keyboardBrand}
          </p>
          <p>
            <span className="fw-bold">Country: </span>
            {keyboard.keyboardCountry}
          </p>
        </div>
        <div className="d-flex justify-content-around align-items-center">
          <p>
            <span className="fw-bold">Type: </span>
            {keyboard.keyboardType}
          </p>
          <p>
            <span className="fw-bold">Insurane Month: </span>
            {keyboard.keyboardInsuranceMonth}
          </p>
        </div>
        <div className="margin-left-block">
          <p>
            <span className="fw-bold">Color: </span>
            {keyboard.keyboardColor
              ? keyboard.keyboardColor.map((color) => (
                  <span>
                    <span key={color} className="mx-2">
                      {color}
                    </span>
                  </span>
                ))
              : "No Color"}
          </p>
          <p>
            <span className="fw-bold">Quatity: </span>
            {keyboard.keyboardQuantity}
          </p>

          <p>{keyboard.keyboardDescription}</p>
        </div>
        <AddProcductToCart keyboard={keyboard} />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .margin-left-block {
    margin-left: 92px;
  }
`;
export default ProductInfor