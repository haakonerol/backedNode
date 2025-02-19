"use strict";
/* -------------------------------------------------------
                 BLOG API Project 
------------------------------------------------------- */
const mongoose = require('mongoose')
/* ------------------------------------------------------------------ */

const UserSchema = new mongoose.Schema({

    email:{
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        trim: true,
        required: true,
    },
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    }
},{
    collection: 'users',
    timestamps: true
});

/* ------------------------------------------------------- *
// https://mongoosejs.com/docs/middleware.html

const passwordEncrypt = require('../helpers/passwordEncrypt')

UserSchema.pre(['save', 'updateOne'], function (next) {

    // console.log('pre-save çalıştı.')
    // console.log(this)

    // Güncellerken: data = this._update || Kaydederken: data = this
    const data = this?._update ?? this
    console.log(data.password);

    // Email Control:
    const isEmailValidated = data.email ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) : true

    if (isEmailValidated) {

        // console.log('Email is OK')

        const isPasswordValidated = data.password ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(data.password) : true

        if (isPasswordValidated) {

            if (this?._update) {
                // UPDATE:
                this._update.password = passwordEncrypt(data.password)
            } else {
                // CREATE:
                this.password = passwordEncrypt(data.password)
            }

            next()

        } else {
            // throw new Error('Password is not validated.')
            next(new Error('Password is not validated.'))
        }
    } else {
        // throw new Error('Email is not validated.')
        next(new Error('Email is not validated.'))
    }

})
/* ------------------------------------------------------------------ */

//module.exports = mongoose.model('User', UserSchema) // direct export
module.exports = {User:mongoose.model('User', UserSchema) }// object export