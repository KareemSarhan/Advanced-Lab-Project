const { text } = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CompensationLeavesSchema  = new mongoose.Schema({

    dateOfabsence : {
        type: Date,
        required:ture
    },

    dateOfcompensation : {  // to compare and see if it is in the same month of absence or not and whether it is a day off or not 
        type: Date,
        required:ture
    },
    reason : {
        type : text ,
        required:true
    },
    valid : {  // when he compensate in a day off within the month he was absent in , it will be true
        type : Boolean,
        required : true
    }
    
});

module.exports = mongoose.model('CompensationLeavesSchema',  CompensationLeavesSchema);
module.exports.CompensationLeavesSchema = CompensationLeavesSchema;