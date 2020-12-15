const { text } = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AnnualLeavesModel = require('./AnnualLeaves');
const AnnualLeaves = AnnualLeavesModel.AnnualLeavesSchema;
const AccidentalLeavesModel = require('./AccedintalLeaves');
const AccidentalLeaves = AccidentalLeavesModel.AccidentalLeavesSchema
const SickLeavesModel = require('./SickLeaves');
const SickLeaves = SickLeavesModel.SickLeavesSchema;
const MaternityLeavesModel = require('./MaternityLeaves');
const MaternityLeaves = MaternityLeavesModel.MaternityLeavesSchema;
const CompensationLeavesModel = require('./CompensationLeaves');
const CompensationLeaves = CompensationLeavesModel.CompensationLeavesSchema;


const Leaves  = new mongoose.Schema({
 StaffID : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'memberSchema'
 },
 AnnualLeave: {
    type: [AnnualLeaves]
},
AccedentalLeave: {
    type: [AccidentalLeaves]
},
SickLeave: {
    type: [SickLeaves]
},
MaternityLeave: {
    type: [MaternityLeaves]
},
CompensationLeave: {
    type: [CompensationLeaves]
}
    
});

module.exports = mongoose.model('Leaves', Leaves);
module.exports.Leaves = Leaves;