const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slotSchema = require('./slot');

const scheduleSchema = new mongoose.Schema({
    
    //academic member id
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