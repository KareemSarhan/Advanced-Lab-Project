const
{
    text
} = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MaternityLeavesSchema = new mongoose.Schema(
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
    document : {
     type : String,
     required:true
=======
    document:
    {
        type: String,
        required: true
>>>>>>> f41b50f75a8380eaa4a8aec95cb771c832963c26
    },
    Status:
    {
        type: String,
        default: "Accepted"
    },
<<<<<<< HEAD
    dateOfLeave : {
        type:Date,
        required:true 
=======
    dateOfLeave:
    {
        type: Date,
        required: true
>>>>>>> f41b50f75a8380eaa4a8aec95cb771c832963c26
    }

});

module.exports = mongoose.model('MaternityLeavesSchema', MaternityLeavesSchema);
module.exports.MaternityLeavesSchema = MaternityLeavesSchema;