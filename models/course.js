const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const academicMemberSchemaModel = require('./academicMember');
const academicMemberSchema = academicMemberSchemaModel.academicMemberSchema;
const slotSchemaModel = require('./slot');
const slotSchema = slotSchemaModel.slotSchema;

const courseSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    code:{
        type: String,
        required: true,
        unique: true
    },

    numberOfSlotsNeeded: {
        type: Number,
        required: true
    },

    numberOfSlotsAssigned: {
        type: Number,
        required: true
    },

    slots: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slotSchema'}],

    coverage: Number ,
    //can be calculated from the number of assigned slots and number of slots

    teachingAssistants: [{type: mongoose.Schema.Types.ObjectId,
                         ref: 'academicMemberSchema'}],
    instructors: [{type: mongoose.Schema.Types.ObjectId,
            ref: 'academicMemberSchema'}],

    courseCoordinator:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'academicMemberSchema'}
});

module.exports = mongoose.model('Course', courseSchema);
module.exports.courseSchema = courseSchema;