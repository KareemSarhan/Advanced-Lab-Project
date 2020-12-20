const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const replacementSchemaModel = require('./Replacement');
//const replacementSchema = replacementSchemaModel.replacementSchema;
const AnnualLeavesSchema = new mongoose.Schema(
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
    },
    // replacement:
    // {
    //     //required:true
    // },

    Status:
    {
        type: String,
        default: "pending"
    },

    dateOfLeave:
    {
        type: Date,
        required: true
    }


});

module.exports = mongoose.model('AnnualLeavesSchema', AnnualLeavesSchema);
module.exports.AnnualLeavesSchema = AnnualLeavesSchema;