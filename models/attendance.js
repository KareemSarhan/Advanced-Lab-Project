const { timeStamp } = require('console');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const memberSchema = require('./members');

require('mongoose-currency').loadType(mongoose);

const attendanceLogSchema = new mongoose.Schema({
    
    Memberid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'memberSchema'},
    signIn: Date,
    signOut: Date
});

module.exports = mongoose.model('Attendance', attendanceLogSchema);