const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const courseSchema = require('./course');

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
    }

    //academicMember
    //date
});

module.exports = mongoose.model('Slot', slotSchema);