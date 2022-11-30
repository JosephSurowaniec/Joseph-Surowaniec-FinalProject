
require('dotenv').config();
const cloudinary = require('cloudinary').v2 ; 
cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUPAPIKEY,
    api_secret: process.env.CLOUDINARYSECRET
});

module.exports = { cloudinary };