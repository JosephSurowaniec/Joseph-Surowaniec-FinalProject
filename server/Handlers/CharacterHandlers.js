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

const { cloudinary } = require("../cloudinary");

// add new order into database
const addNewCharacter = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)
  
  const newCharacterDetails = req.body.characterDetails;
  const userId = req.body.userId;

  const newCharacter = { _id: uuidv4(),
                        userId: userId,
                        characterInformation: newCharacterDetails}
  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    const db = client.db("Final_Project_DnD")

    // insert formatted order to db Orders collection
    await db.collection("User-Characters").insertOne( newCharacter )

    res.status(200).json({
      status: 200,
      message: "Character-Added",
      data: newCharacter
    })
  } catch(err) {
    res.status(400).json({
      status: 400, 
      message: "An Error Occured c'mon we got this",
      data: newCharacter
    })
  } finally {
    // disconnect from database 
    client.close()
    console.log("Disconnected")
  }
};

// add new order into database
const getCharactersByUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)
  console.log("getting characters by User");
  const getUserInfo = req.params.userId;
  console.log(getUserInfo);

  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    const db = client.db("Final_Project_DnD")

    // insert formatted order to db Orders collection
    const userData = await db.collection("User-Characters").find({userId: `${getUserInfo}`}).toArray();

    res.status(200).json({
      status: 200,
      message: " CHaracter Data found",
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

const getCharacter = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)
  
  const getCharacterId = req.params.characterId;
  

  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    const db = client.db("Final_Project_DnD")

    // insert formatted order to db Orders collection
    const characterData = await db.collection("User-Characters").find({_id: `${getCharacterId}`}).toArray();

    res.status(200).json({
      status: 200,
      message: "Data found",
      data: characterData
    })
  } catch(err) {
    res.status(400).json({
      status: 400, 
      message: "An Error Occured c'mon we got this",
      data: characterData
    })
  } finally {
    // disconnect from database 
    client.close()
    console.log("Disconnected")
  }
};

const getCharacterFeed = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)
  
  const getCharacterId = req.params.characterId;
  

  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    const db = client.db("Final_Project_DnD")

    // insert formatted order to db Orders collection
    const characterFeedData = await db.collection("Home_Feed").find({ $and: [{characterId: `${getCharacterId}`} , {feedPage: "Character"}]}).toArray();

    res.status(200).json({
      status: 200,
      message: "Data found",
      data: characterFeedData
    })
  } catch(err) {
    res.status(400).json({
      status: 400, 
      message: "An Error Occured c'mon we got this",
      data: characterFeedData
    })
  } finally {
    // disconnect from database 
    client.close()
    console.log("Disconnected")
  }
};

const addNewCharacterPost = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)
  
  const newCharacterMessage = req.body.status;
  const userDisplayName = req.body.profileName;
  const characterId = req.body.characterId;

  const newCharacterPost = { _id: uuidv4(),
                        characterId: characterId,
                        message: newCharacterMessage,
                        displayName: userDisplayName,
                        feedPage: "Character"}
  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    const db = client.db("Final_Project_DnD")

    // insert formatted order to db Orders collection
    await db.collection("Home_Feed").insertOne( newCharacterPost )

    res.status(200).json({
      status: 200,
      message: "Character-Added",
      data: newCharacterPost
    })
  } catch(err) {
    res.status(400).json({
      status: 400, 
      message: "An Error Occured c'mon we got this",
      data: newCharacterPost
    })
  } finally {
    // disconnect from database 
    client.close()
    console.log("Disconnected")
  }
};

const getProgressFeed = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)
  
  const getCharacterId = req.params.characterId;
  

  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    const db = client.db("Final_Project_DnD")

    // insert formatted order to db Orders collection
    const characterFeedData = await db.collection("Home_Feed").find({ $and: [{characterId: `${getCharacterId}`} , {feedPage: "Progression"}]}).toArray();

    res.status(200).json({
      status: 200,
      message: "Data found",
      data: characterFeedData
    })
  } catch(err) {
    res.status(400).json({
      status: 400, 
      message: "An Error Occured c'mon we got this",
      data: characterFeedData
    })
  } finally {
    // disconnect from database 
    client.close()
    console.log("Disconnected")
  }
};

const addProgressPost = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)
  
  const newMessage = req.body.status;
  const userDisplayName = req.body.profileName;
  const characterId = req.body.characterId;

  const newProgressPost = { _id: uuidv4(),
                        characterId: characterId,
                        message: newMessage,
                        displayName: userDisplayName,
                        feedPage: "Progression"}
  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    const db = client.db("Final_Project_DnD")

    // insert formatted order to db Orders collection
    await db.collection("Home_Feed").insertOne( newProgressPost )

    res.status(200).json({
      status: 200,
      message: "Character-Added",
      data: newProgressPost
    })
  } catch(err) {
    res.status(400).json({
      status: 400, 
      message: "An Error Occured c'mon we got this",
      data: newProgressPost
    })
  } finally {
    // disconnect from database 
    client.close()
    console.log("Disconnected")
  }
};

const uploadImageToCloud = async (req, res) => {
  const imageFile = req.body.data;

  try {
    const uploadedImage = await cloudinary.uploader.upload(imageFile , {
      upload_preset: 'Testing_Setup'
    })
    res.status(200).json({status: 200,message: "Image-Submitted", data: uploadedImage})
  } catch (error) {
    console.log(error)
    res.status(400).json({status: 400,message: "Submission Failed"})
  }
};
const uploadUserImageToCloud = async (req, res) => {
  const imageFile = req.body.data;
  
  try {
    const uploadedImage = await cloudinary.uploader.upload(imageFile , {
      upload_preset: 'User_Profile'
    })
    res.status(200).json({status: 200,message: "Image-Submitted", data: uploadedImage})
  } catch (error) {
    console.log(error)
    res.status(400).json({status: 400,message: "Submission Failed"})
  }
};

const editCharacter = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)

  const updatedCharacterData = req.body.characterDetails;
  
  const getCharacterId = req.params.characterId;


  const query = {_id: getCharacterId };
  const updateName = { $set: { "characterInformation.characterName" : `${updatedCharacterData.characterName}`}};
  const updateImage = { $set: { "characterInformation.characterImageId" : `${updatedCharacterData.characterImageId}`}};
  const updateClass = { $set: { "characterInformation.selectedClass" : updatedCharacterData.selectedClass } };
  const updateRace = { $set: { "characterInformation.selectedRace" : updatedCharacterData.selectedRace }};
  const updateClassData= { $set: { "characterInformation.classData" : updatedCharacterData.classData }};
  const updateLevel = { $set: { "characterInformation.level" : `${updatedCharacterData.level}`}};
  const updateAbilityScores = { $set: { "characterInformation.abilityScores" : updatedCharacterData.abilityScores } };
  const updateModifiedAbilityScores = { $set: { "characterInformation.modifiedAbilityScores" : updatedCharacterData.modifiedAbilityScores }};
  const updateAssignedPoints = { $set: { "characterInformation.assignedPoints" : updatedCharacterData.assignedPoints } };
  // const updateAll = { $set: { characterInformation : `${updatedCharacterData.characterName}`}};


  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    
    const db = client.db("Final_Project_DnD")
    // if (usernameData) {
      await db.collection("User-Characters").updateOne(query , updateName);
      await db.collection("User-Characters").updateOne(query , updateImage);
      await db.collection("User-Characters").updateOne(query , updateClass);
      await db.collection("User-Characters").updateOne(query , updateRace);
      await db.collection("User-Characters").updateOne(query , updateClassData);
      await db.collection("User-Characters").updateOne(query , updateLevel);
      await db.collection("User-Characters").updateOne(query , updateAbilityScores);
      await db.collection("User-Characters").updateOne(query , updateModifiedAbilityScores);
      await db.collection("User-Characters").updateOne(query , updateAssignedPoints);

      // await db.collection("User-Characters").updateOne(query , updateName);

    //   const updateDisplayName = await db.collection("Home_Feed").updateMany({userDisplayName: `${profileNameData}`} , { $set: { userDisplayName: `${usernameData}`} });
    // }

    // if (imageData) {
    //   const updateUserImage = await db.collection("Users").updateOne(query , updateImage);
    // }
    
    console.log("the update went through")

    const checkNewData = await db.collection("User-Characters").find({_id: getCharacterId}).toArray();

    checkNewData
    ?res.status(200).json({status: 200, message: "Update Successful", data: checkNewData , character: updatedCharacterData})
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
  addNewCharacter,
  getCharactersByUsers,
  getCharacter,
  getCharacterFeed,
  addNewCharacterPost,
  addProgressPost,
  getProgressFeed,
  uploadImageToCloud,
  uploadUserImageToCloud,
  editCharacter
}