const mangoose = require('mongoose');
require("dotenv").config(); 
const MONGODB_URL = process.env.MONGODB_URL;

 
const connectDB = async () => {
  try {
    await  mangoose.connect(MONGODB_URL)
  }
  catch (error) {   
    console.error("Error connecting to MongoDB:", error.message);
  }
  console.log("MongoDB connected successfully");      
}


module.exports = connectDB;