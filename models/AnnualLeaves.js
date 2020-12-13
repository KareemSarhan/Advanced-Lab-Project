const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const replacementSchema = require('./Replacement');



const AnnualLavesSchema  = new mongoose.Schema({

    numberOfdays: {
        type: number ,
        required: true,
    },

    Status:{
        type: String,
        default:"pending"
    },
    replacement : {
        type : [replacementSchema],
        required:true
    },
    dateOfLeave : {
        type : date ,
        required : ture 
    }

    
});

module.exports = mongoose.model('AnnualLavesSchema', AnnualLavesSchema);