const { text } = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AnnualLeaves = require('./AnnualLeaves');
const AccedentalLeaves = require('./AccedentalLeaves');
const SickLeaves = require('./SickLeaves');
const MaternityLeaves = require('./MaternityLeaves');
const CompensationLeaves = require('./CompensationLeaves');

const memberSchema = require('./members');




const Leaves  = new mongoose.Schema({
 StaffID : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'memberSchema'
 },
 AnnualLeave: {
    type: [AnnualLeaves]
},
AccedentalLeave: {
    type: [AccedentalLeaves]
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