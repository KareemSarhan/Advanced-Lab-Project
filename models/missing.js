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
    missingDays: {
        type: Number,
        default:0},
    remainingDays: {
        type: Number,
        default:335},
    ExtraHours:{
        type: Number,
        default:0},
    missingHours: {
        type: Number,
        default:0},
    remainingHours: {
        type: Number,
        default:165},
});

module.exports = mongoose.model('missing', missingSchema);
module.exports.missingSchema = missingSchema;