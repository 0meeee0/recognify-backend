const jwt = require('jsonwebtoken');
const Student = require('../model/Student');
const Attendance = require('../model/Attendance');
const { recognizeFace } = require('../services/faceRecognitionService');
const SECRET_KEY = process.env.JWT_SECRET;

exports.faceAuth = async (req, res) => {
    const { name } = req.body;
    const imageFile = req.file;

    if (!name || !imageFile) {
        return res.status(400).json({ message: 'Name and image are required' });
    }

    try {
        const student = await Student.findOne({ name });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const recognizedName = await recognizeFace(imageFile.path);

        const fs = require('fs');
        fs.unlinkSync(imageFile.path);

        if (recognizedName !== name) {
            return res.status(401).json({ message: 'Face does not match the given name' });
        }

        const token = jwt.sign(
            { id: student._id, name: student.name, role: student.role },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        const attendance = new Attendance({ student: student._id });
        await attendance.save();
        const role = student.role
        
        res.json({
            message: `Attendance marked for ${student.name}`,
            token,
            attendance,
            role
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
