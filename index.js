require('dotenv').config();
const PORT = process.env.PORT;

const app = require('./server.js')
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});