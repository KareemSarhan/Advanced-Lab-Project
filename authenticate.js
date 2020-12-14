const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const key = 'shawerma';
const app = express();

function authenticate(req,res,next){

    const verified = req.header('auth-token');
    if (!verified){
        //there is no token
        return res.status(403).send("kda 8alat");
    }
    //authentication method can throw exception so use try and catch
    try{
        jwt.verify(verified, key);
        next(); //enta mo7trm w authenticated
    }
    catch(err){
        res.status(403).send("kda a8lat");
    }
};
module.exports = authenticate;

