import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Question } from "./Question";
import { Review } from "./Review";
import * as _ from "lodash";

export function Test() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [step, setStep] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState();

  useEffect(() => {
    setCurrentQuestion(currentQuestions[step - 1]);
  }, [step]);

  useEffect(() => {
    async function fetchData() {
      (await fetch("/answers.json")).json().then((json) => {
        setQuestions(json);
        setCurrentQuestions(
          _.sampleSize(json, 60).sort((a, b) =>
            a.qNumber < b.qNumber ? -1 : 1
          )
        );
        setStep(1);
      });
    }
    fetchData();
  }, []);

  const newTest = () => {
    setCurrentQuestions(
      _.sampleSize(questions, 60).sort((a, b) =>
        a.qNumber < b.qNumber ? -1 : 1
      )
    );
    setAnswers([]);
    setStep(1);
  };

  const handleOnAnswer = (answer) => {
    setAnswers([...answers, { ...currentQuestion, myAnswer: answer }]);
    setStep(step + 1);
  };

  const determineBody = () => {
    if (!currentQuestion && step == 0) return null;
    if (step < 61)
      return <Question question={currentQuestion} onAnswer={handleOnAnswer} />;
    else return <Review answers={answers} onContinue={newTest} />;
  };

  return (
    <Card
      style={{ width: "100%", marginTop: "20px" }}
      className="mx-auto test-card"
    >
      <Card.Body className="card-header">
        <Card.Title>Agent Test</Card.Title>
        {answers.length > 60 || (
          <Card.Text>Question {answers.length + 1} of 60</Card.Text>
        )}
      </Card.Body>
      {determineBody()}
    </Card>
  );
}
