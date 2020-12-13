const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AccedntalLeavesSchema  = new mongoose.Schema({

    numberOfdays: {
        type: number ,
        required: true,
       default : 6 
    }
    
});

module.exports = mongoose.model('AccedntalLeavesSchema', AccedntalLeavesSchema);