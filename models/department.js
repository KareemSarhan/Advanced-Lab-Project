const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const courseSchema = require('./course');
const academicMemberSchema = require('./academicMember');

const departmentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    code:{
        type: String,
        required: true,
        unique: true
    },

    courses: [courseSchema],
    headOfDep: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'academicMemberSchema'},

    teachingAssistants: [academicMemberSchema],
    instructors: [academicMemberSchema]
});

module.exports = mongoose.model('Department', departmentSchema);