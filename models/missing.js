const { timeStamp } = require('console');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const missingSchema = new mongoose.Schema({
    
    Memberid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'memberSchema'},
    missingHours: Number,
    remainingHours: Number,
    missingHours: Number,
    remainingHours: Number
});

module.exports = mongoose.model('missing', missingSchema);
module.exports.missingSchema = missingSchema;