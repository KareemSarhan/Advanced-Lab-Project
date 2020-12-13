const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const courseSchema = require('./course');

const departmentSchema = new mongoose.Schema({

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

    courses: [courseSchema],

    //headOfDep: academic member of the same faculty 
    //academic members of this department must be of the same faculty
});

module.exports = mongoose.model('Department', departmentSchema);