const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const courseSchemaModel = require('./course');
const courseSchema = courseSchemaModel.courseSchema;
const slotLinkReqSchema = new mongoose.Schema(
{

    requestID:
    {
        type: Number
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

    status:
    {
        type: String,
        default: "Pending"
    },
    comment: String

});

module.exports = mongoose.model('SlotLinkReq', slotLinkReqSchema);
module.exports.slotLinkReqSchema = slotLinkReqSchema;