const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/Users')
const router = express.Router()

router.post('/register', async(req, res) => {
    const {name, mobileNo, username, password} = req.body
    try{
        let user = await User.findOne({username});
        if(user){
            return res.status(400).json({ msg: 'Username already exists!' });
        }
        user = new User({
            name,
            mobileNo,
            username,
            password,
            role: 'Guest',
        });
        await user.save();
        const payload = {
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                name: user.name,
            },
        };
        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'}, (err, token) => {
            if (err) throw err;
            res.json({token});
        });
    } catch(err){
        res.status(500).send('Server error');
    }
});

router.post('/login', async(req, res) => {
    const {username, password} = req.body;
    try{
        let user = await User.findOne({username});
        if(!user){
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ msg: 'Invalid Credentials' })
        }
        const payload = {
            user:{
                id: user.id,
                username: user.username,
                role: user.role,
                name: user.name,
            },
        };
        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '3600000'}, (err, token) => {
            if (err) throw err;
            res.json({token});
        });
    } catch(err){
        res.status(500).send('Server error');
    }
});
const authMiddleware = require('../middleware/auth');

router.get('/user', authMiddleware, async(req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password')
        if(!user){
            return res.status(400).json({ msg: 'User not found' })
        }
        res.json({user});
    } catch(err){
        res.status(500).send('Server Error');
    }
})

router.get('/test', async(req, res) => {
    res.json({msg: 'It is working!'})
})

module.exports = router;