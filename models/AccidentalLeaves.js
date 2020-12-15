const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AccidntalLeavesSchema  = new mongoose.Schema({

    numberOfdays: {
        type: number ,
        required: true,
        max:6
    }
    
});

module.exports = mongoose.model('AccidntalLeavesSchema', AccidntalLeavesSchema);
module.exports.AccidntalLeavesSchema = AccidntalLeavesSchema;