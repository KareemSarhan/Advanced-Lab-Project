const { text } = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CompensationLeavesSchema  = new mongoose.Schema({

    dateOfabsence : {
        type: date,
        required:ture
    },

    dateOfcompensation : {  // to compare and see if it is in the same month of absence or not and whether it is a day off or not 
        type: date,
        required:ture
    },
    reason : {
        type : text ,
        required:true
    },
    valid : {  // when he compensate in a day off within the month he was absent in , it will be true
        type : Boolean,
        require : true
    }
    
});

module.exports = mongoose.model('CompensationLeavesSchema',  CompensationLeavesSchema);