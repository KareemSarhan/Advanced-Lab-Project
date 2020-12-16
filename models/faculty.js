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

    departments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'departmentSchema'}],
    
    teachingAssistants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'academicMemberSchema'}],
    instructors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'academicMemberSchema'}]
});

module.exports = mongoose.model('Faculty', facultySchema);
module.exports.facultySchema = facultySchema;