"use strict";
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// CLIENT CONFIGURATION
const { MongoClient, ObjectId} = require("mongodb")
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  const getUser = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options)
    
    try {
      const userEmail = req.params.userEmail;

      // Connect client
      await client.connect()
      console.log("Connected Here trying");
      console.log("checkpoint 1");
      const db = client.db("Final_Project_DnD")
  
      // insert formatted order to db Orders collection
      const userData = await db.collection("Users").find({email: `${userEmail}`}).toArray();
      console.log("checkpoint 2");
      res.status(200).json({
        status: 200,
        message: "User Data found",
        data: userData
      })
    } catch(err) {
      res.status(400).json({
        status: 400, 
        message: "An Error Occured c'mon we got this",
        data: userData
      })
    } finally {
      // disconnect from database 
      client.close()
      console.log("Disconnected")
    }
  };

  const getUserById = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options)
    
    const userId = req.params.userId;
    
    
    try {
      // Connect client
      await client.connect()
      console.log("Connected")
      const db = client.db("Final_Project_DnD")
  
      // insert formatted order to db Orders collection
      const userData = await db.collection("Users").find({client_id: `${userId}`}).toArray();

      res.status(200).json({
        status: 200,
        message: "Data found",
        data: userData
      })
    } catch(err) {
      res.status(400).json({
        status: 400, 
        message: "An Error Occured c'mon we got this",
        data: userData
      })
    } finally {
      // disconnect from database 
      client.close()
      console.log("Disconnected")
    }
  };

  const getProfileById = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options)
    
    const userId = req.params.userId;

    const profileID = ObjectId(`${userId}`);
    
    
    try {
      // Connect client
      await client.connect()
      console.log("Connected")
      const db = client.db("Final_Project_DnD")
  
      // insert formatted order to db Orders collection
      const userData = await db.collection("Users").find({_id: profileID}).toArray();

      res.status(200).json({
        status: 200,
        message: "Data found",
        data: userData
      })
    } catch(err) {
      res.status(400).json({
        status: 400, 
        message: "An Error Occured c'mon we got this",
        data: userData
      })
    } finally {
      // disconnect from database 
      client.close()
      console.log("Disconnected")
    }
  };

// add new order into database
const addNewUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)
  
  const newUserDetails = req.body;
  const newUser = {  _id: uuidv4(),
                      username: newUserDetails.username,
                      password: newUserDetails.password,
                      email: newUserDetails.email}
  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    const db = client.db("Final_Project_DnD")

    const checkAvailableUsername = await db.collection("Users").find({username: `${newUserDetails.username}`}).toArray();

    // insert formatted order to db Orders collection
    if (checkAvailableUsername[0]) {
      res.status(400).json({status: 400, message: "Username already Taken", data: checkAvailableUsername})
    } else {
      await db.collection("Users").insertOne( newUser )
      res.status(200).json({status: 200, message: "User-Created", data: newUser})
    }
  } catch(err) {
    res.status(400).json({
      status: 400, 
      message: "An Error Occured c'mon we got this",
      data: newUserDetails
    })
  } finally {
    // disconnect from database 
    client.close()
    console.log("Disconnected")
  }
};

const logInAttempt = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options)
    
    const userDetails = req.body;

    try {
        // Connect client
        await client.connect()
      console.log("Connected")
      const db = client.db("Final_Project_DnD")

        console.log("it hit here");
      // insert formatted order to db Orders collection
        const userAttempt = await db.collection("Users").find({username: `${userDetails.username}`}).toArray();
        
        userAttempt[0]
        ?userAttempt[0].password === userDetails.password
            ?res.status(200).json({status: 200, message: "Account found", data: userAttempt})
            :res.status(400).json({status: 400, message: "Incorrect Password"})
        :res.status(400).json({status: 400, message: "No User found"})
        
      } catch(err) {
        res.status(400).json({
          status: 400, 
          message: "An Error Occured c'mon we got this",
          data: err
        })
      } finally {
        // disconnect from database 
        client.close()
        console.log("Disconnected")
      }
  };

  const getHomeFeed = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options)
    
    try {
      // Connect client
      await client.connect()
      console.log("Connected")
      const db = client.db("Final_Project_DnD")
  
      // insert formatted order to db Orders collection
      const mainFeed = await db.collection("Home_Feed").find({feedPage: "Homepage"}).toArray();

      res.status(200).json({
        status: 200,
        message: "Data found",
        data: mainFeed
      })
    } catch(err) {
      res.status(400).json({
        status: 400, 
        message: "An Error Occured c'mon we got this",
        data: mainFeed
      })
    } finally {
      // disconnect from database 
      client.close()
      console.log("Disconnected")
    }
  };

  const addNewPostHomeFeed = async (req, res) => { // POST FEED
    const client = new MongoClient(MONGO_URI, options)
    
    const userPost = req.body;

    try {
        // Connect client
        await client.connect()
      console.log("Connected")
      const db = client.db("Final_Project_DnD");

      const postedCharInfo = await db.collection("User-Characters").find({_id: userPost.characterId }).toArray();

      const newPost = { _id: uuidv4(),
                        userId: userPost.userId,
                        message: userPost.status,
                        userDisplayName: userPost.profileName,
                        character: postedCharInfo,
                        feedPage: "Homepage"}

        console.log("it hit here");
      // insert formatted order to db Orders collection
        const userAddAttempt = await db.collection("Home_Feed").insertOne(newPost)
        
        userAddAttempt
        
            ?res.status(200).json({status: 200, message: "Message Added", data: userAddAttempt})
            :res.status(400).json({status: 400, message: "Bad Attempt"})
        
      } catch(err) {
        res.status(400).json({
          status: 400, 
          message: "An Error Occured c'mon we got this",
          data: err
        })
      } finally {
        // disconnect from database 
        client.close()
        console.log("Disconnected")
      }
  };

  const updateUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options)

    const userIdData = req.body.userId;
    const usernameData = req.body.username;
    const imageData = req.body.profileImage;
    const profileNameData = req.body.profileName;

    const userID = ObjectId(`${userIdData}`);
    

    const query = {_id: userID};
    const update = { $set: { username: `${usernameData}`}}

    const updateImage = { $set: { profileImage: `${imageData}`}}

    try {
      // Connect client
      await client.connect()
      console.log("Connected")
      
      const db = client.db("Final_Project_DnD")
      if (usernameData) {
        const updateUsername = await db.collection("Users").updateOne(query , update);

        const updateDisplayName = await db.collection("Home_Feed").updateMany({userDisplayName: `${profileNameData}`} , { $set: { userDisplayName: `${usernameData}`} });
      }

      if (imageData) {
        const updateUserImage = await db.collection("Users").updateOne(query , updateImage);
      }
      
      console.log("the update went through")

      const checkNewData = await db.collection("Users").find({_id: userID}).toArray();

      checkNewData
      ?res.status(200).json({status: 200, message: "Update Successful", data: checkNewData})
      :res.status(400).json({status: 400, message: "Bad Attempt"})
      
    } catch(err) {
      res.status(400).json({
        status: 400, 
        message: "An Error Occured c'mon we got this",
      })
    } finally {
      // disconnect from database 
      client.close()
      console.log("Disconnected")
    }
  };


module.exports = {
    addNewUser,
    logInAttempt,
    getUser,
    getHomeFeed,
    addNewPostHomeFeed,
    updateUser,
    getUserById,
    getProfileById
}

