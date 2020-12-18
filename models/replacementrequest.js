const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReplacementRequestSchema = new mongoose.Schema({

    requestID: {
        type: Number
    },
    memberID: { //asking for the request
        type: mongoose.Schema.Types.ObjectId,
        ref: 'academicMemberSchema',
        required: true
    },

    requestedID: { //member to send the request to
        type: String,
        required: true
    },
    requestedDay: {
        type: Date,
        required: true
    },

    requestedSlot: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Pending"
    },
    comment: {
        type: String
    }

});

module.exports = mongoose.model('ReplacementRequest', ReplacementRequestSchema);
module.exports.ReplacementRequestSchema = ReplacementRequestSchema;