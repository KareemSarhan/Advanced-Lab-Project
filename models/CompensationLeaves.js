const { text } = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CompensationLeavesSchema  = new mongoose.Schema({

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
    },

    dateOfcompensation : {  // to compare and see if it is in the same month of absence or not and whether it is a day off or not 
        type: Date,
        required:true
    },
    reason : {
        type : String ,
        required:true
    }
    
});

module.exports = mongoose.model('CompensationLeavesSchema',  CompensationLeavesSchema);
module.exports.CompensationLeavesSchema = CompensationLeavesSchema;