const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const academicMemberSchema = require('./academicMember');

const dayOffReqSchema = new mongoose.Schema({

    requestID:{
        type: number
    },
    memberID:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'academicMemberSchema',
        required: true},

    requestedDay: {
        type: String,
        required: true},

    status:{
        type: String,
        default: "Pending"
    },
    comment: String
    
});

module.exports = mongoose.model('DayOffReq', dayOffReqSchema);