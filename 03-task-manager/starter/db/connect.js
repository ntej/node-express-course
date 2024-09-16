const mongoose = require('mongoose')

//Return promise
const connectDB = (url)=>{
    mongoose.connect(url)
}

module.exports = connectDB;
