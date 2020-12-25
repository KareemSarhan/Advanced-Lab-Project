const express = require('express');
const mongoose = require('mongoose');
const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const key = 'shawerma';
const app = express();
const DeletedToken = require("./models/DeletedTokens")

async function authenticate(req, res, next)
{

    const verified = req.header('auth-token');
    //console.log("here");
    if (!verified)
    {
        //there is no token
        return res.status(401).send("Authentication is required and has failed or has not yet been provided.");
    }
    //authentication method can throw exception so use try and catch
    try
    {
        const token = req.header('auth-token');
        //console.log(token);
        const DecodeToken = jwt_decode(token);
        const id = DecodeToken.id;
        //console.log(id);
        const deletedtoken = await DeletedToken.findOne(
        {
            token: token
        });
        if (deletedtoken)
        {
            //console.log("here3");
            res.send("Sorry you are logged out .")
        }
        else
        {
            //console.log("here2");
            jwt.verify(verified, key);
            next(); //enta mo7trm w authenticated
        }
    }
    catch (err)
    {
        return res.status(401).send("Authentication is required and has failed or has not yet been provided.");
    }
};

module.exports = authenticate;