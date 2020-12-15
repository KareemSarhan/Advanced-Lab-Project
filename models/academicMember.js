const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const courseSchemaModel = require('./course');
const courseSchema = courseSchemaModel.courseSchema;
const slotSchemaModel = require('./slot');
const slotSchema = slotSchemaModel.slotSchema;

const academicMemberSchema = new mongoose.Schema({

    Memberid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'memberSchema'},
   schedule: [slotSchema],
   type: {
       type: String,
        required: true},
   courses: [{type: mongoose.Schema.Types.ObjectId,
            ref: 'courseSchema'}],
   faculty: {
       type: String
   },
   department: {
       type: String
   }
});

module.exports = mongoose.model('AcademicMember', academicMemberSchema);
module.exports.academicMemberSchema = academicMemberSchema;