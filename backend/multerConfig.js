// multerConfig.js
const multer = require('multer');
const path = require('path');

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Files are temporarily stored here before upload
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Store file with unique name
  }
});

// Initialize multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 }, // Increase the size limit to 100MB for video
  fileFilter: (req, file, cb) => {
    // Allowed file types for images and videos
    const imageTypes = /jpeg|jpg|png/;
    const videoTypes = /mp4|mov|avi|mkv|flv/;
    
    // Check file type for images and videos
    const extnameImage = imageTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetypeImage = imageTypes.test(file.mimetype);
    
    const extnameVideo = videoTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetypeVideo = videoTypes.test(file.mimetype);

    if (mimetypeImage && extnameImage) {
      return cb(null, true); // Image is valid
    } else if (mimetypeVideo && extnameVideo) {
      return cb(null, true); // Video is valid
    } else {
      cb(new Error('Invalid file type. Only images (jpeg, jpg, png) and videos (mp4, mov, avi, mkv, flv) are allowed.'));
    }
  }
});

module.exports = upload;
