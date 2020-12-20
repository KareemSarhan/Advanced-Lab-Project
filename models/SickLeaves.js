const
{
    text
} = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SickLeavesSchema = new mongoose.Schema(
{
    StaffID:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Member'
    },
    requestID:
    {
        type: String,
        required: true,
        unique: true
    },
    document:
    {
        type: String,
        required: true
    },
    dateOfLeave:
    {
        type: Date,
        required: true

    },
    dateOfdocument:
    {
        type: Date,
        required: true
    },
    Status:
    {
        type: String,
        default: "pending"
    }
});

module.exports = mongoose.model('SickLeavesSchema', SickLeavesSchema);
module.exports.SickLeavesSchema = SickLeavesSchema;