const express = require("express");
const User = require("../models/User");
require("dotenv").config();

exports.getUsers = async (req, res) =>
{
    try
    {
        let { email } = req.query;
        let users;
        if (!email)
        {
            users = await User.findAll(
                {
                    attributes: ['id', 'name', 'email', 'password', 'role'],
                },
            );
        }
        else 
        {
            users = await User.findOne(
                {
                    attributes: ['id', 'name', 'email', 'password', 'role'],
                    where: {
                        email
                      }
                },
            );
        }
       
        res
            .status(200)
            .send({ users });
    }
    catch (error)
    {
        console.error(error);
        res.sendStatus(500);
    }
}



