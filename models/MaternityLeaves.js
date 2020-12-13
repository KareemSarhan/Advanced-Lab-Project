const { text } = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MaternityLeavesSchema  = new mongoose.Schema({

    document : {
     type : text,
     required:true
    }
    
});

module.exports = mongoose.model('MaternityLeavesSchema', MaternityLeavesSchema);