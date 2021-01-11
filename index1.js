require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT;
const mongoConnectionString = process.env.mongoConnectionString;

const app = require("./server.js");

mongoose.connect(mongoConnectionString, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");

  app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
  });
});
