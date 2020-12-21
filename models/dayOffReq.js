const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const academicMemberSchemaModel = require('./academicMember');
const academicMemberSchema = academicMemberSchemaModel.academicMemberSchema;

const dayOffReqSchema = new mongoose.Schema(
{

<<<<<<< HEAD
    requestID:{
        type: String
=======
    requestID:
    {
        type: Number
>>>>>>> f41b50f75a8380eaa4a8aec95cb771c832963c26
    },
    memberID:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AcademicMember',
        required: true
    },

    requestedDay:
    {
        type: String,
        required: true
    },

    status:
    {
        type: String,
        default: "Pending"
    },
    comment: String

});

module.exports = mongoose.model('DayOffReq', dayOffReqSchema);
module.exports.dayOffReqSchema = dayOffReqSchema;