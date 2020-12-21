const { text } = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const Leaves  = new mongoose.Schema({
 StaffID : {
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: 'memberSchema'
 },
 status:{
     type: String,
     default: "Pending"
 },
 requestID:{
     type:Number,
     //unique: true
 },
Leavetype:{
     type: String,
},
numberOfdays: {
    type: Number ,
},
dateOfLeave : {
    type : Date ,
},
replacementID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'academicMemberSchema'
},
dateOfabsence : {
    type: Date,
},
dateOfcompensation : {  // to compare and see if it is in the same month of absence or not and whether it is a day off or not 
    type: Date,
},
reason : {
    type : String ,
},
document : {
    type : String,
   },
dateOfdocument:{
    type: Date,
},
HodComment:{
    type:String
}
});

module.exports = mongoose.model('Leaves', Leaves);
module.exports.Leaves = Leaves;