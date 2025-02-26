// cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // From your Cloudinary dashboard
  api_key: process.env.CLOUDINARY_API_KEY,       // From your Cloudinary dashboard
  api_secret: process.env.CLOUDINARY_API_SECRET, // From your Cloudinary dashboard
});

module.exports = cloudinary;
