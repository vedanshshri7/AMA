const express = require('express');
const router = express.Router();
const cloudinary = require('../cloudinaryConfig');
const upload = require('../multerConfig'); // Multer middleware for handling form-data
const fs = require('fs');
const ShopData = require('../models/Shop');
// POST route for uploading an image
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Upload the image file to Cloudinary
    const {name, Price, tag, condition, stock} = req.body;
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "shop_images", // Optional: Folder to organize your uploads in Cloudinary
      use_filename: true
    });

    // Delete the temporary image file from the server after uploading to Cloudinary
    fs.unlinkSync(req.file.path);

    const newItem = new ShopData({
      name,
      Price,
      img: result.secure_url,
      tag,
      condition,
      stock
    })

    await newItem.save();

    res.json({
      message: 'Item uploaded successfully',
      item: newItem // The URL to access the uploaded image
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload item' });
  }
});

router.get('/shop-items', async (req, res) => {
  try {
      const shopItems = await ShopData.find();
      res.json(shopItems); // Respond with the shop items from MongoDB
  } catch (err) {
      res.status(500).json({ error: 'Server Error' });
  }
});


module.exports = router;
