const { text } = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MaternityLeavesSchema  = new mongoose.Schema({

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
    },
    Status:{
        type: String,
        default:"Accepted"
    },
    dateOfLeave : {
        type:Date,
        required:true 
    }
    
});

module.exports = mongoose.model('MaternityLeavesSchema', MaternityLeavesSchema);
module.exports.MaternityLeavesSchema = MaternityLeavesSchema;