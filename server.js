require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const studentRoutes = require('./routes/studentRouter')
const attendanceRoutes = require('./routes/attendanceRouter')
const courseRoutes = require('./routes/courseRouter')
const categoryRoutes = require('./routes/categoryRouter')
const authRoutes = require('./routes/authRouter')
const cors = require('cors')
const path = require('path');

app.use(cors());
app.use(express.json());
app.use('/students', express.static(path.join(__dirname, 'students')));

app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/course', courseRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/auth', authRoutes)

mongoose.connect(process.env.CONNECTION_LINK).then(() => {
    console.log("Connected to MongoDB");
});

if (process.env.NODE_ENV !== 'test') {
    const port = process.env.PORT
    app.listen(port, () => {
        console.log(`app running on port: ${port}`);
    });
}

module.exports = app;
