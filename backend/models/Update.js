const mongoose = require('mongoose');

/*
username: 'admin',
mssg: 'This is an update.',
dated: '13-08-2024 01:08:23',
*/ 

const updateSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    mssg: {
        type: String,
        required: true
    },
    dated: {
        type: Date,
        required: true,
        default: Date.now
    },
})

const UpdateData = mongoose.model('Update', updateSchema);

module.exports = UpdateData;