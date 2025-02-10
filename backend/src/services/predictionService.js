const axios = require("axios");
require("dotenv").config();

const FLASK_API_URL = process.env.FLASK_API_URL;

exports.getPrediction = async (studentData) => {
    try {
        const response = await axios.post(FLASK_API_URL, { student_data: studentData }, {
            headers: { "Content-Type": "application/json" }
        });

        return response.data;
    } catch (error) {
        console.error("Flask API Error:", error.message);
        throw new Error("Failed to get prediction from Flask API");
    }
};