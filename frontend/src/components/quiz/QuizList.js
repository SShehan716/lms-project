import React from "react";
import { List, Card, Radio } from "antd";

const QuizList = ({ questions, onAnswerChange }) => {
    return (
        <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={questions}
            renderItem={(question) => (
                <List.Item>
                    <Card title={question.question}>
                        <Radio.Group onChange={(e) => onAnswerChange(question.id, e.target.value)}>
                            {question.options.map((option, index) => (
                                <Radio key={index} value={option}>
                                    {option}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Card>
                </List.Item>
            )}
        />
    );
};

export default QuizList;