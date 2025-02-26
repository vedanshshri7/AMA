const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');
const User = require('../models/Users');
const UpdateData = require('../models/Update');
const LessonData = require('../models/Lesson');
const cloudinary = require("../cloudinaryConfig");
const fs = require('fs');
const multer = require("multer");
const path = require('path');
const {v4: uuidv4} = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage });

router.put('/update-role/:id', authMiddleware, roleMiddleware(['Admin']), async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({msg: 'User not found'});
        }
        user.role = req.body.role;
        await user.save();

        res.status(200).json({msg: 'User role updated', user});
    }catch(err){
        res.status(500).send({msg: 'Server error'});
    }
})

router.get('/users', authMiddleware, roleMiddleware(['Admin']), async (req, res) => {
    try{
        const users = await User.find().select('-password');
        res.json(users);
    }catch(err){
        res.status(500).send('Server Error');
    }
})

router.get('/user/:id', authMiddleware, roleMiddleware(['Admin']), async (req, res) => {
    try{
        const user = await User.findById(req.params.id).select('-password');
        if(!user){
            return res.status(404).json({msg: 'User not found'});
        }
        res.json(user);
    }catch(err){
        res.status(500).send('Server Error');
    }
})

router.put('/update-post', authMiddleware, roleMiddleware(['Admin']), async (req, res) => {
    try{
        const { username, mssg } = req.body;

        const newUpdate = new UpdateData({
            username,
            mssg
        });

        await newUpdate.save();
        res.status(200).json({msg: 'Update sent successfully!', item: newUpdate});
    }catch(err){
        res.status(500).send("Server Error")
    }
})

router.get('/lessons', authMiddleware, roleMiddleware(['Admin']), async(req, res) => {
    const lessons = await LessonData.find({});
    return res.status(200).json({
        lessons
    });
});

router.get('/lesson/:public_id', authMiddleware, roleMiddleware(['Admin']), async(req, res) => {
    const id = req.params.public_id;
    const lesson = await LessonData.findOne({
        public_id: id,
    });
    if(!lesson){
        return res.status(404).json({
            msg: 'Not found 404'
        });
    }
    return res.status(200).json({
        lesson
    });
})


router.post('/new-lesson', authMiddleware, roleMiddleware(['Admin']), upload.single('file'), async(req, res) => {
    try{
        if(!req.file){
            return res.status(400).json({msg: 'No file uploaded.'});
        }
        const body = req.body;
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'raw',
            folder: 'music_class_lessons'
        })
    
        fs.unlinkSync(req.file.path);
        const randomPublicId = uuidv4();
        const lesson = new LessonData({
            name: body.name,
            instrument: body.instrument,
            tag: body.tag,
            lesson_url: result.secure_url,
            public_id: randomPublicId,
            isVisible: false
        });
        await lesson.save();
    
        return res.status(200).json({
            msg: 'Lesson created!'
        });
    }catch(err){
        return res.status(500).json({msg: 'Server error'});
    }
})


router.put('/lesson/:public_id', authMiddleware, roleMiddleware(['Admin']), async(req, res) => {
    const body = req.body;
    const id = req.params.public_id;
    await LessonData.updateOne({
        public_id: id
    }, body);

    return res.status(200).json({
        msg: 'Updated!'
    });
});

router.delete('/lesson/:public_id', authMiddleware, roleMiddleware(['Admin']), async(req, res) => {
    const id = req.params.public_id;
    try{
        await LessonData.deleteOne({public_id: id});
        await cloudinary.uploader.destroy(id, {resource_type: 'raw'});
        return res.status(200).json({
            msg: 'Deleted Successfully'
        });
    }catch(err){
        return res.status(500).json({msg: "Server error"});
    }
})



module.exports = router;