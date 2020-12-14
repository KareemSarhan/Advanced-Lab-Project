const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    capacity: {
        type: Number,
        required: true},
    
    type: String
    //whether it is and office, room, lab, or hall
});

module.exports = mongoose.model('Loction', locationSchema);