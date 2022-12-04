const express = require('express');
const helmet = require("helmet");
const morgan = require('morgan');

const { addNewUser, logInAttempt , getUser , getHomeFeed , addNewPostHomeFeed , updateUser , getUserById , getProfileById } = require('./Handlers/UserHandlers');
const { addNewCharacter,
        getCharactersByUsers,
        getCharacter, 
        addNewCharacterPost, 
        getCharacterFeed, 
        getProgressFeed, 
        addProgressPost, 
        uploadImageToCloud, 
        uploadUserImageToCloud,
        editCharacter } = require('./Handlers/CharacterHandlers');
const port = 8000;



express()

    .use(express.json( {limit: '50mb'}))
    .use(helmet())
    .use(morgan('tiny'))
    .use(express.urlencoded({ limit: '50mb' , extended: true }))
    .use('/', express.static(__dirname + '/'))

    .post("/newcharacters", addNewCharacter)
    .patch("/editcharacter/:characterId", editCharacter)

    .post("/newUser", addNewUser)
    .post("/user",  logInAttempt)
    .get("/profile/:userId", getCharactersByUsers )
    .get("/character/:characterId", getCharacter )

    .get("/user/profile/:userId" , getProfileById)

    .get("/user/feed/:userId" , getUserById)
    .get("/user/:userEmail", getUser)

    .get("/homefeed", getHomeFeed )
    .post("/homefeed/addPost", addNewPostHomeFeed )

    .get("/characterFeed/:characterId", getCharacterFeed )
    .post("/characterFeed/addCharacterPost", addNewCharacterPost )

    .get("/characterFeed/progression/:characterId", getProgressFeed )
    .post("/characterFeed/addProgressPost", addProgressPost )

    .post("/testingUpload", uploadImageToCloud)
    .post("/uploadUserImage", uploadUserImageToCloud)

    .patch("/user/editUser" , updateUser)

    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "This is obviously not what you are looking for.",
        });
      })

    .listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    });