const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AccidentalLeavesSchema = new mongoose.Schema(
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
    numberOfdays:
    {
        type: Number,
        required: true,
        max: 6
    }

});

module.exports = mongoose.model('AccidentalLeavesSchema', AccidentalLeavesSchema);
module.exports.AccidentalLeavesSchema = AccidentalLeavesSchema;