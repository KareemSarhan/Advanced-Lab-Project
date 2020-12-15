const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const courseSchemaModel = require('./course');
const courseSchema = courseSchemaModel.courseSchema;
const academicMemberSchemaModel = require('./academicMember');
const academicMemberSchema = academicMemberSchemaModel.academicMemberSchema;

const departmentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    code:{
        type: String,
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
module.exports.departmentSchema = departmentSchema;