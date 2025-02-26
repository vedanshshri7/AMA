const mongoose = require('mongoose')
const bycrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    mobileNo:{
        type: String,
        require: true,
        match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid mobile number."]
    },
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password:{
        type: String,
        require: true
    },
    role:{
        type: String,
        enum: ['Admin', 'Student', 'Guest'],
        default: 'Guest',
        require: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        return next();
    }
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('Users', UserSchema);

module.exports = User;