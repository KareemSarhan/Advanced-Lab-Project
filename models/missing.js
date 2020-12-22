const
{
    timeStamp
} = require('console');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const missingSchema = new mongoose.Schema(
{

    Memberid:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Member'
    },
    missingDays: Number,
    remainingDays: Number,
    missingHours: Number,
    remainingHours: Number,
    ExtraHour: Number
});

module.exports = mongoose.model('missing', missingSchema);
module.exports.missingSchema = missingSchema;