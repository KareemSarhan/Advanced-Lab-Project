const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const academicMemberSchema = require('./academicMember');

const slotSchema = new mongoose.Schema({
    
    type: String,
    //whether it is a lecture, tutorial, or lab

    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courseSchema'
    },

    location:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'locationSchema'
    },

    timing: {
        type: String,
        required: true
    },

    memberID:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'academicMemberSchema'}
});

module.exports = mongoose.model('Slot', slotSchema);