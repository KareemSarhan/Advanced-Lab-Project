const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const departmentSchema = require('./department');

const facultySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    departments: [departmentSchema],
    
    //academic members in this faculty
});

module.exports = mongoose.model('Faculty', facultySchema);