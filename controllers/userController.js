const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
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
                    attributes: ['id', 'name', 'email', 'role','avatar'],
                },
            );
        }
        else 
        {
            users = await User.findOne(
                {
                    attributes: ['id', 'name', 'email', 'role'],
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

exports.updateUsers = async (req, res) =>
{
    try
    {
        const { name, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const update = {
            name: name,
            password: hashedPassword
        }        

        const [updatedRows] = await User.update(
            update,
            {
                where: {
                    email
                }
            }
        );

        if (updatedRows === 0)
        {
            res
                .status(400)
                .send('User not found.')
        } else
        {
            res
                .status(400)
                .send('User updated successfully.')
        }
    }
    catch (error)
    {
        console.error(error);
        res.sendStatus(500);
    }
}

exports.deleteUsers = async (req , res) =>{
    try {
        const email = req.query.email
        const user = await User.findOne({ where : {email}}) 
        if(!user){
            res 
                .status(400)
                .send('No such email found')
                return
        }
        await user.destroy()
        res
            .status(200)
            .send('User deleted')
    } 
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

exports.uploadProfilePicture = async(req , res) =>{
    try {
        const photo = req.file.filename;
        const email = req.query.email;
        const updatedRows = await User.update(
            {avatar : photo},
            {
                where: {
                    email
                }
            }
        );
        if(!updatedRows){
            res
                .status(400)
                .send("No user found")
                return
        } 
        res
            .status(200)
            .send("Photo Updated") 
    } 
    catch (error) {
        
    }
}
