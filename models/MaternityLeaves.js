const { text } = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MaternityLeavesSchema  = new mongoose.Schema({

    document : {
     type : text,
     required:true
    },
    Status:{
        type: String,
        default:"Accepted"
    },
    dateOfLeave : {
        type:date,
        required:true 
    }
    
});

module.exports = mongoose.model('MaternityLeavesSchema', MaternityLeavesSchema);
module.exports.MaternityLeavesSchema = MaternityLeavesSchema;