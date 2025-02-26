const mongoose = require('mongoose');

/*
id: 1,
name: 'First Guitar',
instrument: 'Guitar',
tag: 'Tab',
lesson_url: 'cloudinary something',
public_url: 'random',
isVisible: 'false'
*/ 

const lessonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    instrument: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true,
        default: 'Guitar'
    },
    lesson_url: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
    },
    isVisible: {
        type: Boolean,
        required: true,
        default: false
    }
})

const LessonData = mongoose.model('Lesson', lessonSchema);

module.exports = LessonData;