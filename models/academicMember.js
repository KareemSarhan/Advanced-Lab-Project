const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const academicMemberSchema = new mongoose.Schema({

    Memberid: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: 'memberSchema'
    },
    schedule: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slotSchema'
    }],
    type: {
        type: String,
        required: true
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courseSchema'
    }],
    faculty: {
        type: String
    },
    department: {
        type: String
    },
    officeHourse: String
});

module.exports = mongoose.model('AcademicMember', academicMemberSchema);
module.exports.academicMemberSchema = academicMemberSchema;