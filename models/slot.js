const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slotSchema = new mongoose.Schema(
{

    type: String,
    //whether it is a lecture, tutorial, or lab

    course:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'course'
    },

    location:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Location'
    },

    timing:
    {
        type: String,
        required: true
    },

    memberID:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'academicMember'
    }
});

module.exports = mongoose.model('Slot', slotSchema);
module.exports.slotSchema = slotSchema;