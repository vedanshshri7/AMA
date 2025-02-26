const mongoose = require('mongoose');

const featuredVideoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    videoUrl:{
        type: String,
        required: true,
    }
})

const FeaturedVideoData = mongoose.model('Featured-Video', featuredVideoSchema);

module.exports = FeaturedVideoData;