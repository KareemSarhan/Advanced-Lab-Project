const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slotSchema = require('./slot');
const academicMemberSchema = require('./academicMember');

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

    numberOfSlotsNeeded: {
        type: number,
        required: true
    },

    numberOfSlotsAssigned: {
        type: number,
        required: true
    },

    slots: {
        type: [slotSchema],
        required: true
    },

    coverage: number ,
    //can be calculated from the number of assigned slots and number of slots

    teachingAssistants: [academicMemberSchema],
    instructors: [academicMemberSchema],

    courseCoordinator:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'academicMemberSchema'}
});

module.exports = mongoose.model('Course', courseSchema);