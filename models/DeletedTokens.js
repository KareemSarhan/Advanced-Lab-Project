
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeletedTokensSchema = new mongoose.Schema({
    
    token : String 
});

module.exports = mongoose.model('DeletedTokensSchema', DeletedTokensSchema);
module.exports.DeletedTokensSchema = DeletedTokensSchema;