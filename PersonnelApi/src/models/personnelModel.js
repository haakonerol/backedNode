"use strict"
/* -----------------------------------------------------------
    EXPRESS - Personnel API
-------------------------------------------------------------- */
const { mongoose} = require('../config/dbConnection')
/* ------------------------------------------------------------ */

const PersonnelSchema = new mongoose.Schema({

    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    userName: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    firstName: {
        type: String,
        trim: true,
        require: true
    },
    lastName: {
        type: String,
        trim: true,
        require: true
    },
    phone: {
        type: String,
        trim: true,
        require: true
    },
    email: {
        type: String,
        trim: true,
        require: true,
        unique: true
    },
    title: {
        type: String,
        trim: true,
        require: true
    },
    salary: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        trim: true,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isLead: {
        type: Boolean,
        default: false
    },
    startedAt: {
        type: Date,
        default: Date.now()
    }
}, {
    collection: 'personnels',
    timestamps: true
})
/* ------------------------------------------------------------ */

module.exports = mongoose.model('Personnel', PersonnelSchema)