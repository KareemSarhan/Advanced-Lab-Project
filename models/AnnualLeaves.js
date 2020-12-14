const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const replacementSchema = require('./Replacement');

const AnnualLeavesSchema  = new mongoose.Schema({

    numberOfdays: {
        type: number ,
        required: true,
    },
    replacement : {
        type : [replacementSchema],
        //required:true
    },
    
    Status:{
        type: String,
        default:"pending"
    },

    dateOfLeave : {
        type : date ,
        required : ture 
    }

    
});

module.exports = mongoose.model('AnnualLeavesSchema', AnnualLeavesSchema);