const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slotSchema = require('./slot');
const academicMemberSchema = require('./academicMember');

const scheduleSchema = new mongoose.Schema({
    
    memberID:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'academicMemberSchema'},

    Saturday: {
        type: [slotSchema]
    },

    Sunday: {
        type: [slotSchema]
    },

    Monday: {
        type: [slotSchema]
    },

    Tuesday: {
        type: [slotSchema]
    },

    Wednesday: {
        type: [slotSchema]
    },

    Thursday: {
        type: [slotSchema]
    }
});

module.exports = mongoose.model('Schedule', scheduleSchema);