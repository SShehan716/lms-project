require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const predictionRoutes = require('./routes/predictionRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/predict", predictionRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send('LMS Backend Running');
});

//Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});