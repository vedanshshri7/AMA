const express = require('express');
const multer = require('multer');
const cloudinary = require('../cloudinaryConfig');
const router = express.Router();
const upload = require('../multerConfig'); // Multer middleware for handling form-data
const FeaturedVideoData = require('../models/FeaturedVideo');
const fs = require('fs');

// POST route for uploading a video
router.post('/upload-featured-video', upload.single('video'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No video file uploaded.' });
        }

        const {name} = req.body;
        // Upload the video file to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'music_class_video', // Folder to organize videos
            resource_type: 'video', // Specify it's a video upload
        });

        // Delete the temporary video file from the server after uploading to Cloudinary
        fs.unlinkSync(req.file.path);
        const updatedVideo = await FeaturedVideoData.findOneAndUpdate(
            {},
            {$set :{name: name, videoUrl: result.secure_url}},
            {new: true, upsert: true}
        )
        // Delete old videos from the folder
        const allVideos = await cloudinary.search
            .expression('folder:music_class_video')
            .sort_by('uploaded_at', 'desc') // Newest first
            .execute();

        const videosToDelete = allVideos.resources.filter(
            (video) => video.public_id !== result.public_id
        );
        for (const video of videosToDelete) {
            await cloudinary.uploader.destroy(video.public_id, { resource_type: 'video' });
        }

        // Respond with the uploaded video details
        res.json({
            message: 'New featured video uploaded and old videos deleted successfully.',
            video: updatedVideo,
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to upload video or delete old videos.' });
    }
});
router.get('/get-featured-video', async (req, res) => {
    try {
        const featuredVideo = await FeaturedVideoData.findOne({});
        if (!featuredVideo) {
            return res.status(404).json({ message: 'No featured video found.' });
        }
        res.json(featuredVideo);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch featured video.' });
    }
});

module.exports = router;
