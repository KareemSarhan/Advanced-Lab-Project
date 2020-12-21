const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const courseSchemaModel = require('./course');
const courseSchema = courseSchemaModel.courseSchema;
const slotLinkReqSchema = new mongoose.Schema(
{

<<<<<<< HEAD
const slotLinkReqSchema = new mongoose.Schema({

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

    courseID:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    requestedSlot:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot',
        required: true
    },
<<<<<<< HEAD
    requestedSlot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slotSchema',
        required: true},
=======
>>>>>>> f41b50f75a8380eaa4a8aec95cb771c832963c26

    status:
    {
        type: String,
        default: "Pending"
    },
    comment: String

});

module.exports = mongoose.model('SlotLinkReq', slotLinkReqSchema);
module.exports.slotLinkReqSchema = slotLinkReqSchema;