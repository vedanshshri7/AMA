require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT;
const authRoutes = require('./routes/auth.js');
const adminRoutes = require('./routes/admin.js');
const imageRoutes = require('./routes/image.js');
const updateRoutes = require('./routes/update.js');
const videoRoutes = require('./routes/video.js');
const keepAlive = require('./keepAlive.js');
const lessonRoutes = require('./routes/lesson.js');

//const allowedOrigin = "https://aryanmusic.co.in";
const allowedOrigin = ["https://aryanmusic.co.in", "http://localhost:3000", "http://ip_address:3000"];
app.use(cors({
  origin: function(origin, callback){
    if(!origin || allowedOrigin.includes(origin)){
      callback(null, true);
    }
    else{
      callback(new Error("Not allowed by CORS"));
    }
  }
}))
app.use(express.json({extended: false}));
keepAlive();
// MongoDB connection
mongoose.connect(process.env.MONGODB_URI+"/MainDB")
  .then(() => {
    console.log('Connected to MongoDB');
  }).catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.get('/', (req, res) => {
  res.send('Hello, MERN!');
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', imageRoutes);
app.use('/api', updateRoutes);
app.use('/api', videoRoutes);
app.use('/api', lessonRoutes);

app.use(function(err, req, res, next){
  return res.status(500).json({
    msg: "server error",
  });
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port: ${port}`);
});
