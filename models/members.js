const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
//const attendanceLog = require('./attendance');

const memberSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true},
    password:{ 
        type: String,
        required: true,
        default: "123456"},
    userType: String,
    email:{
        type: String,
        required: true,
        unique: true
    },
    officeLocation: {
        type: String,
        required: true
    },
    salary:{
        type: Currency,
        required: true
    },
    gender: String,
    dayOff: String
});

module.exports = mongoose.model('Member', memberSchema);