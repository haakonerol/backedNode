"use strict"
/* -----------------------------------------------------------
    EXPRESS - Personnel API
-------------------------------------------------------------- */
// https://swagger-autogen.github.io/docs/
// $ npm i swagger-autogen # JSON creator
// $ npm i swagger-ui-express
// $ npm i redoc-express
/* ------------------------------------------------------------- */

require('dotenv').config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000

/*-------------------------------------------------------------- *
// Default swagger options:
const options = {
    openapi:          <string>,     // Enable/Disable OpenAPI.                        By default is null
    language:         <string>,     // Change response language.                      By default is 'en-US'
    disableLogs:      <boolean>,    // Enable/Disable logs.                           By default is false
    autoHeaders:      <boolean>,    // Enable/Disable automatic headers recognition.  By default is true
    autoQuery:        <boolean>,    // Enable/Disable automatic query recognition.    By default is true
    autoBody:         <boolean>,    // Enable/Disable automatic body recognition.     By default is true
    writeOutputFile:  <boolean>     // Enable/Disable writing the output file.        By default is true
};
/* -------------------------------------------------------------- */

const swaggerAutogen = require('swagger-autogen')()

const packageJson = require('./package.json')

const document = {
    // info: {
    //     version: '1.0.0',
    //     title: 'Personnel API',
    //     description: 'Personnel Management System API Service v.1',
    //     termOfService: '',
    //     contact: {name: 'HakanErol', email:'hakan-erol@outlook.com'},
    //     license: {name: 'Apache License'}
    // },
    info: {
        version: packageJson.version,
        title: packageJson.name,
        description: packageJson.description,
        termOfService: '',
        contact: {name: 'HakanErol', email:'hakan-erol@outlook.com'},
        license: {name: packageJson.license}
    },
    host: `${HOST}:${PORT}`,
    basePath: '/',
    schemes: ['http', 'https'],
    // Simple token settings:
    securityDefinitions: {
        Token: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'Simple Token Authentication * Example: <b>Token ...tokenKey...</b>'
        }
    },
    security: [
        {Token: []}
    ],
    definitions: {
        "Department": require('./src/models/departmentModel').schema.obj,
        "Personnel": require('./src/models/personnelModel').schema.obj,
    }
}

const routes = ['./index.js'];
const outputFile = './swagger.json'

// Run:
swaggerAutogen(outputFile, routes, document)