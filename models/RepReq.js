const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const academicMemberSchema = require('./academicMember');

const RepReqSchema = new mongoose.Schema({

    requestID:{
        type: Number
    },
    memberID:{ //asking for the request
        type: mongoose.Schema.Types.ObjectId,
        ref: 'academicMemberSchema',
        required: true},

    requestedID:{ //member to send the request to
        type: Number,
        required: true
    },
    requestedDay: {
        type: String,
        required: true},

    requestedSlot: {
        type: String,
        required: true},

    status:{
        type: String,
        default: "Pending"
    },
    comment: String
    
});

module.exports = mongoose.model('RepReq', RepReqSchema);