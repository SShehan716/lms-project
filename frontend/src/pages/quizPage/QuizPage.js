import React, { useState } from "react";
import { Layout, Typography, Button, message } from "antd";
import QuizList from "../../components/quiz/QuizList";

const { Content } = Layout;
const { Title } = Typography;

const quizQuestions = [
    { id: 1, question: "What is 2+2?", options: ["3", "4", "5", "6"], correctAnswer: "4" },
    { id: 2, question: "Capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correctAnswer: "Paris" },
    { id: 3, question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Plato", "Tolstoy", "Hemingway"], correctAnswer: "Shakespeare" },
    { id: 4, question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correctAnswer: "Mars" },
    { id: 5, question: "What is the square root of 64?", options: ["6", "7", "8", "9"], correctAnswer: "8" },
    { id: 6, question: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2", "NaCl"], correctAnswer: "H2O" },
    { id: 7, question: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Mississippi", "Yangtze"], correctAnswer: "Nile" },
    { id: 8, question: "What is the capital of Japan?", options: ["Beijing", "Seoul", "Tokyo", "Bangkok"], correctAnswer: "Tokyo" },
    { id: 9, question: "How many continents are there?", options: ["5", "6", "7", "8"], correctAnswer: "7" },
    { id: 10, question: "Which is the smallest country in the world?", options: ["Monaco", "Vatican City", "Luxembourg", "Malta"], correctAnswer: "Vatican City" },
];

const QuizPage = () => {
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);

    const handleAnswerChange = (questionId, selectedOption) => {
        setAnswers({ ...answers, [questionId]: selectedOption });
    };

    const handleSubmit = () => {
        let totalScore = 0;
        quizQuestions.forEach((question) => {
            if (answers[question.id] === question.correctAnswer) {
                totalScore += 1;
            }
        });
        setScore(totalScore);
        message.success(`You scored ${totalScore} out of 10!`);
    };

    return (
        <Layout style={{ padding: "24px" }}>
            <Content>
                <Title level={2}>Quiz</Title>
                <QuizList questions={quizQuestions} onAnswerChange={handleAnswerChange} />
                <Button type="primary" onClick={handleSubmit} style={{ marginTop: 20 }}>
                    Submit
                </Button>
                {score !== null && (
                    <Title level={3} style={{ marginTop: 20 }}>
                        Your Score: {score} / 10
                    </Title>
                )}
            </Content>
        </Layout>
    );
};

export default QuizPage;