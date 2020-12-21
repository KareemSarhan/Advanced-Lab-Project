const mongoose = require('mongoose');
const Schema = mongoose.Schema;


<<<<<<< HEAD
const AccidentalLeavesSchema  = new mongoose.Schema({
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
    numberOfdays: {
        type: Number ,
        required: true,
=======
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
>>>>>>> f41b50f75a8380eaa4a8aec95cb771c832963c26
    }

});

module.exports = mongoose.model('AccidentalLeavesSchema', AccidentalLeavesSchema);
module.exports.AccidentalLeavesSchema = AccidentalLeavesSchema;