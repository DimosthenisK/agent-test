import React, { useState, useEffect } from "react";
import { Form, ListGroup, Card, Button } from "react-bootstrap";

export function Question(props) {
  const [selectedOption, setSelectedOption] = useState();

  const submitAnswer = () => {
    setSelectedOption(null);
    props.onAnswer(Number(selectedOption));
  };

  const handleSelectionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const renderRadioButton = (option, optionIndex) => {
    return (
      <Form.Check
        custom
        key={optionIndex}
        type={"radio"}
        name={`radio-${props.question.qNumber}`}
        id={`radio-${props.question.qNumber}-${optionIndex}`}
        label={option}
        value={optionIndex}
        onChange={handleSelectionChange}
        checked={selectedOption == optionIndex}
      />
    );
  };

  return (
    <ListGroup.Item>
      <p className="field-label">{props.question.label}</p>
      <Form.Group>
        {props.question.possibleAnswers.map((option, optionIndex) =>
          renderRadioButton(option, optionIndex)
        )}
      </Form.Group>
      <Card.Body className="review-submit-container">
        <Button
          variant="outline-primary"
          block
          className="review-submit-button"
          onClick={submitAnswer}
          disabled={selectedOption == null}
        >
          Next
        </Button>
      </Card.Body>
    </ListGroup.Item>
  );
}
