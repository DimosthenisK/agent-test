import React, { useState, useEffect } from "react";
import { Alert, ListGroup, Card, Button, Row, Col } from "react-bootstrap";

export function Review(props) {
  const renderAnswer = (answer) => {
    return (
      <ListGroup.Item key={answer.qNumber}>
        <p className="field-label">{answer.label}</p>
        <Alert variant={"danger"}>
          {answer.possibleAnswers[answer.myAnswer]}
        </Alert>
        <Alert variant={"success"}>
          {answer.possibleAnswers[answer.correctAnswer]}
        </Alert>
      </ListGroup.Item>
    );
  };

  return (
    <>
      <Row>
        <Col>
          <p className="review-title">
            Επιτυχίες:
            <br />
            <h2>
              {
                props.answers.filter(
                  (answer) => answer.myAnswer === answer.correctAnswer
                ).length
              }
            </h2>
          </p>
        </Col>

        <Col>
          <p className="review-title">
            Αποτυχίες:
            <br />
            <h2>
              {
                props.answers.filter(
                  (answer) => answer.myAnswer !== answer.correctAnswer
                ).length
              }
            </h2>
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className="result-header">
            {props.answers.filter(
              (answer) => answer.myAnswer === answer.correctAnswer
            ).length >= 54
              ? "Pass!"
              : "Fail :("}
          </h1>
        </Col>
      </Row>
      {props.answers
        .filter((answer) => answer.myAnswer !== answer.correctAnswer)
        .map((answer) => renderAnswer(answer))}
      <Card.Body className="review-submit-container">
        <Button
          variant="outline-primary"
          block
          className="review-submit-button"
          onClick={props.onContinue}
        >
          New Test
        </Button>
      </Card.Body>
    </>
  );
}
