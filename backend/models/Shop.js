const mongoose = require('mongoose');

/*
id: 1,
name: 'First Guitar',
Price: 3000,
img: 'assets/guitar.jpg',
tag: 'Guitar',
condition: 'New',
*/ 

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true,
        default: 'Guitar'
    },
    condition: {
        type: String,
        required: true,
        default: 'New'
    },
    stock: {
        type: Number,
        required: true
    }
})

const ShopData = mongoose.model('Shop', shopSchema);

module.exports = ShopData;