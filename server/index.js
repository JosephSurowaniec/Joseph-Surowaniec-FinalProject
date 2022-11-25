const express = require('express');
const helmet = require("helmet");
const morgan = require('morgan');

const { addNewUser, logInAttempt } = require('./Handlers/UserHandlers')
const { addNewCharacter } = require('./Handlers/CharacterHandlers');
const port = 8000;



express()

    .use(express.json())
    .use(helmet())
    .use(morgan('tiny'))
    .use(express.urlencoded({ extended: false }))
    .use('/', express.static(__dirname + '/'))

    .post("/newcharacters", addNewCharacter)
    .post("/newUser", addNewUser)
    .post("/user",  logInAttempt)

    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "This is obviously not what you are looking for.",
        });
      })

    .listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    });