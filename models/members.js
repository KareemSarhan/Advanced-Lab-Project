const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new mongoose.Schema(
{

    name:
    {
        type: String,
        required: true
    },
    id:
    {
        type: String,
        required: true,
        unique: true
    },
    password:
    {
        type: String,
        required: true,
        default: "123456"
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    officeLocation:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        //required: true
        //make sure it is an office
    },
    salary:
    {
        type: Number,
        required: true
    },
    salarySoFar: Number,
    prompt:
    {
        type: Boolean,
        default: true
            //change to false if user changed password on the first time
    },
    phoneNumber: Number,
    SecondayMail: String,
    gender: String,
    dayOff: String
});

module.exports = mongoose.model('Member', memberSchema);
module.exports.memberSchema = memberSchema;