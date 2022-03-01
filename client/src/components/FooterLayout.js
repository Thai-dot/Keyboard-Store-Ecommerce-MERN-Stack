import React from 'react'
import {Row,Col}   from 'react-bootstrap'

const FooterLayout = () => {
  return (
    <div className="mt-5 bg-secondary p-2 footerSetting">
      <Row className="rowFooter mt-3">
        <Col className="colFooter">
          <h2>Thai-dot Keyboard Store</h2>
          <p>
            <span className="fw-bold">Address: </span>
            182,Nguyen Thi Dinh st, Giong Trom, Ben Tre
          </p>
          <p>
            <span className="fw-bold">Copyright </span>© 2020 Thai-dot Keyboard
            Store
          </p>
        </Col>
        <Col className="colFooter">
          <h2>Contact</h2>
          <p>
            <span className="fw-bold">Phone: </span>
            035.868.868
          </p>
          <p>
            <span className="fw-bold">Email: </span>
            nguyenhoangthai7871@gmail.com
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default FooterLayout