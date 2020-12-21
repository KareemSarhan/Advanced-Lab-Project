const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const courseSchemaModel = require('./course');
const courseSchema = courseSchemaModel.courseSchema;
const academicMemberSchemaModel = require('./academicMember');
const academicMemberSchema = academicMemberSchemaModel.academicMemberSchema;

const departmentSchema = new mongoose.Schema(
{

    name:
    {
        type: String,
        required: true
            //unique: true
    },

    code:
    {
        type: String,
        //unique: true
    },
    facultyName: String,

    courses: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    headOfDep:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AcademicMember'
    },

    teachingAssistants: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AcademicMember'
    }],
    instructors: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AcademicMember'
    }]
});

module.exports = mongoose.model('Department', departmentSchema);
module.exports.departmentSchema = departmentSchema;