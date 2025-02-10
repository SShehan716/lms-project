import React, { useEffect, useState } from "react";
import { Card, Statistic, Progress } from "antd";

const PassFailPrediction = ({ marks }) => {
    const [passProbability, setPassProbability] = useState(0);

    useEffect(() => {
        if (marks.length > 0) {
            const totalMarks = marks.reduce((acc, mark) => acc + mark.score, 0);
            const average = totalMarks / marks.length;

            // Prediction logic: If average > 60%, student has a high probability of passing
            const probability = Math.min(Math.max((average - 40) * 1.5, 0), 100);
            setPassProbability(probability);
        }
    }, [marks]);

    return (
        <Card title="Final Pass Probability">
            <Statistic title="Predicted Pass Probability" value={passProbability.toFixed(2)} suffix="%" />
            <Progress percent={passProbability} status={passProbability >= 50 ? "success" : "exception"} />
        </Card>
    );
};

export default PassFailPrediction;