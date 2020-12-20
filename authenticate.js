const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const key = 'shawerma';
const app = express();

async function authenticate(req,res,next){

    const verified = req.header('auth-token');
    if (!verified){
        //there is no token
        return res.status(403).send("kda 8alat");
    }
    //authentication method can throw exception so use try and catch
    try{
        const token  = req.header('auth-token');
        const DecodeToken = jwt_decode(token);
        const id = DecodeToken.id;
        const deletedtoken = await DeletedToken.findOne({token:token});
        if(deletedtoken){
            res.send("Sorry you are logged out .")
        }else{
        jwt.verify(verified, key);
        next(); //enta mo7trm w authenticated
        }
    }
    catch(err){
        res.status(403).send("kda a8lat");
    }
};

module.exports = authenticate;

