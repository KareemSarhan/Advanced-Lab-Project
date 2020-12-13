const { text } = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SickLeavesSchema  = new mongoose.Schema({

    document : {
     type : text,
     required : true
    },
    dateOfLeave :{
        type:date,
        required:true

    },
    dateOfdocument:{
        type:date

    }
    
});

module.exports = mongoose.model('SickLeavesSchema', SickLeavesSchema);