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
        return data

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
        /*
            #swagger.tags = ['Personnels']
            #swagger.summary = 'List Personnels'
            #swagger.description = `
            You can send query with endpoint for search[], sort[], page and limit.
            <ul> Examples:
                <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                <li>URL/?<b>page=2&limit=1</b></li>
            </ul>
        `
        */

        const data = await res.getModelList(Personnel)

        res.status(200).send({
            error:false,
            details: await res.getModelListDetails(Personnel),
            data,
        })
    },

    create: async (req, res)=> {
        /*
            #swagger.tags = ['Personnels']
            #swagger.summary = 'Create Personnel'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: '#/definitions/Personnel'
                }
            }
        */

        const data = await Personnel.create(checkEmailAndPassword(req.body))

        res.status(201).send({
            error: false,
            data,
        })
    },

    read: async (req, res)=> {
        /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "Get Single Personnel"
        */

        const data = await Personnel.findOne({_id: req.params.id})

        res.status(200).send({
            error: false,
            data,
        })
    }, 

    update: async (req, res) => {
        /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "Update Personnel"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                $ref: '#/definitions/Personnel'
                }
            }
        */

        const data = await Personnel.updateOne({_id: req.params.id}, checkEmailAndPassword(req.body), {runValidators:true})

        res.status(201).send({
            error: false,
            data,
            new: await Personnel.findOne({_id: req.params.id})
        })
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Personnels"]
            #swagger.summary = "Delete Personnel"
        */

        const data = await Personnel.deleteOne({_id: req.params.id})

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data,
        })
    }
}
