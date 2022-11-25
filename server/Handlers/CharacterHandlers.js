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
const addNewCharacter = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)
  
  const newCharacterDetails = req.body.characterDetails;

  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    const db = client.db("Final_Project_DnD")

    // insert formatted order to db Orders collection
    await db.collection("User-Characters").insertOne( newCharacterDetails )

    res.status(200).json({
      status: 200,
      message: "Character-Added",
      data: newCharacterDetails
    })
  } catch(err) {
    res.status(400).json({
      status: 400, 
      message: "An Error Occured c'mon we got this",
      data: newCharacterDetails
    })
  } finally {
    // disconnect from database 
    client.close()
    console.log("Disconnected")
  }
};



module.exports = {
  addNewCharacter
}