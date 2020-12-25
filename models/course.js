const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new mongoose.Schema(
{

    name:
    {
        type: String,
        required: true
    },

    code:
    {
        type: String,
        required: true,
        // unique: true
    },

    numberOfSlotsNeeded:
    {
        type: Number,
        required: true
    },

    numberOfSlotsAssigned:
    {
        type: Number,
        default: 0
    },

    slots: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot'
    }],

    coverage: Number,
    //can be calculated from the number of assigned slots and number of slots

    teachingAssistants: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AcademicMember'
    }],
    instructors: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AcademicMember'
    }],

    courseCoordinator:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AcademicMember'
    },
    creditHours: Number
});

module.exports = mongoose.model('Course', courseSchema);
module.exports.courseSchema = courseSchema;