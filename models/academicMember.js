const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const scheduleSchema = require('./schedule');
const courseSchema = require('./course');

//require('mongoose-currency').loadType(mongoose);
//const Currency = mongoose.Types.Currency;

const academicMemberSchema = new mongoose.Schema({

    Memberid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'memberSchema'},
   schedule: scheduleSchema,
   type: {
       type: String,
        required: true},
   courses: [courseSchema],
   faculty: {
       type: String
   },
   department: {
       type: String
   }
});

module.exports = mongoose.model('AcademicMember', academicMemberSchema);