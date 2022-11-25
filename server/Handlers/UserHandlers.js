"use strict";
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// CLIENT CONFIGURATION
const { MongoClient} = require("mongodb")
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

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



module.exports = {
    addNewUser,
    logInAttempt
}