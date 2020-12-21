const
{
    text
} = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


<<<<<<< HEAD
const SickLeavesSchema  = new mongoose.Schema({
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
    document : {
     type : String,
     required : true
=======
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
>>>>>>> f41b50f75a8380eaa4a8aec95cb771c832963c26
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
<<<<<<< HEAD
        default:"pending"
    }  
=======
        default: "pending"
    }
>>>>>>> f41b50f75a8380eaa4a8aec95cb771c832963c26
});

module.exports = mongoose.model('SickLeavesSchema', SickLeavesSchema);
module.exports.SickLeavesSchema = SickLeavesSchema;