require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const mongoConnectionString = process.env.mongoConnectionString;

const app = require('./server.js')

mongoose.connect(mongoConnectionString, { useNewUrlParser: true , useUnifiedTopology: true} , ()=>{
    app.listen(PORT, function() {
        console.log("Server is running on Port: " + PORT)});
})
