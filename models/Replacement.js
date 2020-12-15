const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReplacementSchema  = new mongoose.Schema({
    StaffID:{    // the staff who sent the request 
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'memberSchema'
    },

   ReplacementID :{//this represents the TA that will replace the Ta whos sent the request
    type : String
   }, 
   found :{
       type : Boolean,
   }

    
});

module.exports = mongoose.model('ReplacementSchema', ReplacementSchema);
module.exports.ReplacementSchema = ReplacementSchema;