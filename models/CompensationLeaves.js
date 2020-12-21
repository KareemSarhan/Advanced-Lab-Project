const
{
    text
} = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CompensationLeavesSchema = new mongoose.Schema(
{

<<<<<<< HEAD
    StaffID : {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'memberSchema'
     },
     requestID:{
      type: String,
      required: true,
      unique: true
     },
    dateOfabsence : {
        type: Date,
        required:true
=======
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
    dateOfabsence:
    {
        type: Date,
        required: true
>>>>>>> f41b50f75a8380eaa4a8aec95cb771c832963c26
    },

    dateOfcompensation:
    { // to compare and see if it is in the same month of absence or not and whether it is a day off or not 
        type: Date,
<<<<<<< HEAD
        required:true
    },
    reason : {
        type : String ,
        required:true
=======
        required: true
    },
    reason:
    {
        type: String,
        required: true
    },
    valid:
    { // when he compensate in a day off within the month he was absent in , it will be true
        type: Boolean,
        default: false,
>>>>>>> f41b50f75a8380eaa4a8aec95cb771c832963c26
    }

});

module.exports = mongoose.model('CompensationLeavesSchema', CompensationLeavesSchema);
module.exports.CompensationLeavesSchema = CompensationLeavesSchema;