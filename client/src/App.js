import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Navbar } from "./Components/Navbar";
import { Test } from "./Components/Test";
import "./App.scss";

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <Navbar />
        </Col>
      </Row>
      <Row>
        <Col>
          <Test />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
