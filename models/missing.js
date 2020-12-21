const { timeStamp } = require('console');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const missingSchema = new mongoose.Schema({
    
    Memberid: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'memberSchema'},
    SpentHours: Number,
    MissingHours: Number,
    ExtraHour: Number,
    missingDays: Number,
    remainingDays: Number
});

module.exports = mongoose.model('missing', missingSchema);
module.exports.missingSchema = missingSchema;