const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const replacementSchemaModel = require('./Replacement');
//const replacementSchema = replacementSchemaModel.replacementSchema;

const ReplacementSchema = new mongoose.Schema(
{
    StaffID:
    { // the staff who sent the request 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Member'
    },

    ReplacementID:
    { //this represents the TA that will replace the Ta whos sent the request
        type: String
    },
    found:
    {
        type: Boolean,
    }


});

const AnnualLeavesSchema = new mongoose.Schema(
{

    numberOfdays:
    {
        type: number,
        required: true,
    },
    replacement:
    {
        type: [ReplacementSchema],
        //required:true
    },

    Status:
    {
        type: String,
        default: "pending"
    },

    dateOfLeave:
    {
        type: date,
        required: ture
    }


});

module.exports = mongoose.model('AnnualLeavesSchema', AnnualLeavesSchema);
module.exports.AnnualLeavesSchema = AnnualLeavesSchema;