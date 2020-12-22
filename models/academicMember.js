const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const academicMemberSchema = new mongoose.Schema(
{

    Memberid:
    {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: 'Member'
    },
    schedule: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot'
    }],
    type:
    {
        type: String,
        required: true
    },
    courses: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    }],
    faculty:
    {
        type: String
    },
    department:
    {
        type: String
    },
    officeHourse: String,
    CompensationSlots: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompensationSlot'
    }]
});

module.exports = mongoose.model('AcademicMember', academicMemberSchema);
module.exports.academicMemberSchema = academicMemberSchema;