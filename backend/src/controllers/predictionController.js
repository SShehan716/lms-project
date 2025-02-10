const predictionService = require("../services/predictionService");

exports.predictStudentPerformance = async (req, res) => {
    try {
        const studentData = req.body.student_data;
        
        // Validate input
        if (!studentData || !Array.isArray(studentData) || studentData.length !== 5) {
            return res.status(400).json({ error: "Invalid student data format! Must be a 5x10 array." });
        }

        // Call service layer
        const prediction = await predictionService.getPrediction(studentData);

        res.json({ prediction });
    } catch (error) {
        console.error(" Prediction Error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};