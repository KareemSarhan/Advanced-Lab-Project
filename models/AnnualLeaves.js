<<<<<<< HEAD
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// //const replacementSchemaModel = require('./Replacement');
// //const replacementSchema = replacementSchemaModel.replacementSchema;

// const ReplacementSchema  = new mongoose.Schema({
//     StaffID:{    // the staff who sent the request 
//         type: mongoose.Schema.Types.ObjectId,
//         required:true,
//         ref: 'memberSchema'
//     },

//    ReplacementID :{//this represents the TA that will replace the Ta whos sent the request
//     type : String
//    }, 
//    found :{
//        type : Boolean,
//    }

    
// });

// const AnnualLeavesSchema  = new mongoose.Schema({

//     numberOfdays: {
//         type: Number ,
//         required: true,
//     },
//     replacement : {
//         type : [ReplacementSchema],
//         //required:true
//     },
    
//     Status:{
//         type: String,
//         default:"pending"
//     },

//     dateOfLeave : {
//         type : Date ,
//         required : true 
//     }

    
// });
=======
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const replacementSchemaModel = require('./Replacement');
//const replacementSchema = replacementSchemaModel.replacementSchema;
const AnnualLeavesSchema = new mongoose.Schema(
{
    StaffID:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Member'
    },
    requestID:
    {
        type: String,
        required: true,
        unique: true
    },
    numberOfdays:
    {
        type: Number,
        required: true,
    },
    // replacement:
    // {
    //     //required:true
    // },

    Status:
    {
        type: String,
        default: "pending"
    },

    dateOfLeave:
    {
        type: Date,
        required: true
    }


});
>>>>>>> f41b50f75a8380eaa4a8aec95cb771c832963c26

// module.exports = mongoose.model('AnnualLeavesSchema', AnnualLeavesSchema);
// module.exports.AnnualLeavesSchema = AnnualLeavesSchema;