const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const departmentSchemaModel = require('./department');
const departmentSchema = departmentSchemaModel.departmentSchema;
const academicMemberSchemaModel = require('./academicMember');
const academicMemberSchema = academicMemberSchemaModel.academicMemberSchema;

const facultySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    departments: [departmentSchema],
    
    teachingAssistants: [academicMemberSchema],
    instructors: [academicMemberSchema]
});

module.exports = mongoose.model('Faculty', facultySchema);
module.exports.facultySchema = facultySchema;