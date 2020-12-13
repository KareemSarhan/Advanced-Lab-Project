const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const academicMemberSchema = require('./academicMember');

const slotLinkReqSchema = new mongoose.Schema({

    requestID:{
        type: number
    },
    memberID:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'academicMemberSchema',
        required: true},

    courseID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courseSchema',
        required: true
    },
    requestedSlot: {
        type: String,
        required: true},

    status:{
        type: String,
        default: "Pending"
    },
    comment: String
    
});

module.exports = mongoose.model('SlotLinkReq', slotLinkReqSchema);