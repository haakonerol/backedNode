"use strict";
/* -------------------------------------------------------
                 BLOG API Project 
------------------------------------------------------- */
const { User} = require('../models/userModel')
const passwordEncrypt = require('../helpers/passwordEncrypt')
/* ------------------------------------------------------------------ */

const userEmailAndPasswordValidation = (data) => {

    // email control with regex
    const isEmailValid = data.email ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) : true;
    
    if(isEmailValid){

        if(data.password && data.password !== ''){
            const isPasswordvalid =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(data.password);

            if(isPasswordvalid){
            
                data.password = passwordEncrypt(data.password)
                
                return data;
    
            }else{
                throw new Error('Password is not validated.')
            }

        }else{
            throw new Error('Password cannot be empty.');
        }
       
    }else{
        throw new Error('Email is not validated.')
    };

}
/* ------------------------------------------------------------------ */
// userController:

module.exports.userController = {

    list: async (req, res) => {

        // const data = await User.find()
        const data = await res.getModelList(User)


        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(User),
            result: data
        })

    },

    create: async (req, res) => {

        const data = await User.create(userEmailAndPasswordValidation(req.body));
        // console.log(data);

        res.status(201).send({
            error: false,
            result: data

        })
    },

    read: async (req, res) => {

        // const userId = req.params.userId;
        // const data = await User.findOne({_id: userId});
        const data = await User.findOne({_id: req.params.userId});

        res.status(200).send({
            error: false,
            result: data
        })
    },

    update: async (req, res) => {
        
        // const data = await User.updateOne({...filter}, {...data})
        const data = await User.updateOne({_id: req.params.userId}, userEmailAndPasswordValidation(req.body), { runValidators: true, })
         
        res.status(202).send({
            error: false,
            result: data,
            new: await User.findOne({_id: req.params.userId})
        })
    },

    delete: async (req, res) => {

        const data = await User.deleteOne({_id: req.params.userId})

        // console.log(data);
        // res.status(204).send({
        //     error: false,
        //     result: data
        // })
        if(data.deletedCount){

            res.sendStatus(204)
        }else{

            res.errorStatusCode = 404
            throw new Error(' Not Found. ')
        }
    }
}