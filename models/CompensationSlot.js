const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const compensationslotSchema = new mongoose.Schema(
{

    slot:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Slot'
    },
    Date:
    {
        required: true,
        type: Date
    }

});

module.exports = mongoose.model('CompensationSlot', compensationslotSchema);
module.exports.compensationslotSchema = compensationslotSchema;