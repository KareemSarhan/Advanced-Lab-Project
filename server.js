require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const mongoConnectionString = process.env.mongoConnectionString
mongoose.connect(mongoConnectionString, { useNewUrlParser: true , useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");

})

app.use(bodyParser.json());
module.exports= app