const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AccidentalLeavesSchema = new mongoose.Schema(
{

    numberOfdays:
    {
        type: number,
        required: true,
        max: 6
    }

});

module.exports = mongoose.model('AccidentalLeavesSchema', AccidentalLeavesSchema);
module.exports.AccidentalLeavesSchema = AccidentalLeavesSchema;