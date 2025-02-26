const authMiddleware = require("../middleware/auth");
const express = require('express');
const router = express.Router();
const UpdateData = require('../models/Update');

router.get('/updates', authMiddleware, async (req, res) => {
    try{
        const updates = await UpdateData.find().sort({dated: -1});
        res.json(updates);
    }catch(err){
        res.status(500).send("Server Error");
    }
})

module.exports = router;