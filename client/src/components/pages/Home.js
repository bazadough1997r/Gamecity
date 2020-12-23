import React, { Component } from "react";
import GameList from "../games/GameList";
import { Col, Row, Container } from "react-bootstrap";

export default class Home extends Component {
  render() {
    return (
      <div>
        <GameList />

        <Container>
          <Row className="justify-content-md-center">
            <Col xs lg="2">
              1 of 3
            </Col>
            <Col md="auto">Variable width content</Col>
            <Col xs lg="2">
              3 of 3
            </Col>
          </Row>
          <Row>
            <Col>1 of 3</Col>
            <Col md="auto">Variable width content</Col>
            <Col xs lg="2">
              3 of 3
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
