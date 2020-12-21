const { timeStamp } = require('console');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceLogSchema = new mongoose.Schema({
    
    Memberid: {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'memberSchema'
    },
    signIn: Date,
    signOut: Date,
    duration: Number
    //this can be calculated from signin and signout
});


module.exports = mongoose.model('Attendance', attendanceLogSchema);
module.exports.attendanceLogSchema = attendanceLogSchema;