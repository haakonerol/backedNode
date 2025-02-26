"use strict"
/* -----------------------------------------------------------
    EXPRESS - Personnel API
-------------------------------------------------------------- */
const Personnel = require('../models/personnelModel')
const passwordEncrypt = require('../helpers/passwordEncrypt')
/* ------------------------------------------------------------ */

const checkEmailAndPassword = function(data){

    // -- email validation:
  const isEmailValid = data.email ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) : true

  if(isEmailValid){

    // -- password validation:
    const isPasswordValid = (data.password && data.password.trim() !== '') ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(data.password) : false
    if(isPasswordValid){

        data.password = passwordEncrypt(data.password)

    }else{
        throw new Error('Password is not valid.')
    }
  
  }else{
    throw new Error('Email is not valid.')
  }
}


/* ------------------------------------------------------------ */

module.exports = {

    list: async (req, res) => {

        const data = await res.getModelList(Personnel)

        res.status(200).send({
            error:false,
            details: await res.getModelListDetails(Personnel),
            data,
        })
    },

    create: async (req, res)=> {

        const data = await Personnel.create(checkEmailAndPassword(req.body))

        res.status(201).send({
            error: false,
            data,
        })
    },

    read: async (req, res)=> {

        const data = await Personnel.findOne({_id: req.params.id})

        res.status(200).send({
            error: false,
            data,
        })
    }, 

    update: async (req, res) => {

        const data = await Personnel.updateOne({_id: req.params.id}, checkEmailAndPassword(req.body), {runValidators:true})

        res.status(201).send({
            error: false,
            data,
            new: await Personnel.findOne({_id: req.params.id})
        })
    },

    delete: async (req, res) => {

        const data = await Personnel.deleteOne({_id: req.params.id})

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data,
        })
    }
}
