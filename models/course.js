const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slotSchema = require('./slot');

const courseSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    code:{
        type: String,
        required: true,
        unique: true
    },

    numberOfSlots: {
        type: number,
        required: true
    },

    slots: {
        type: [slotSchema],
        required: true
    },

    coverage: number 
    //can be calculated from the number of assigned slots and number of slots

    //teaching assistants
    //instructors
});

module.exports = mongoose.model('Course', courseSchema);