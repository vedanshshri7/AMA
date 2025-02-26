const LessonData = require('../models/Lesson');
const { Router } = require('express');
const roleMiddleware = require('../middleware/role');
const authMiddleware = require('../middleware/auth');
const router = Router();
router.get('/lessons', authMiddleware, roleMiddleware(['Admin', 'Student']), async(req, res) => {
    const lessons = await LessonData.find({isVisible: true});
    return res.status(200).json({
        lessons
    });
});

router.get('/lesson/:public_id', authMiddleware, roleMiddleware(['Admin', 'Student']), async(req, res) => {
    const id = req.params.public_id;
    const lesson = await LessonData.findOne({
        public_id: id,
        isVisible: true
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
module.exports = router;
