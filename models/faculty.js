const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const departmentSchema = require('./department');
const academicMemberSchema = require('./academicMember');

const facultySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    departments: [departmentSchema],
    
    teachingAssistants: [academicMemberSchema],
    instructors: [academicMemberSchema],
});

module.exports = mongoose.model('Faculty', facultySchema);