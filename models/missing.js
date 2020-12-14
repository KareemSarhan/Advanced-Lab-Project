const { timeStamp } = require('console');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const memberSchema = require('./members');

//require('mongoose-currency').loadType(mongoose);

const missingSchema = new mongoose.Schema({
    
    Memberid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'memberSchema'},
    missingHours: Number,
    remainingHours: Number,
    missingDays: Number,
    remainingHours: Number
});

module.exports = mongoose.model('missing', missingSchema);