const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connection Success');
    }catch(error){
        console.error('MongoDB Connection Failed');
        process.exit(1);
    }
};

module.exports = connectDB;