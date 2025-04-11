const Attendance = require('../model/Attendance');
const faceRecognitionService = require('../services/faceRecognitionService');
const Student = require('../model/Student');

exports.markAttendance = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('Image is required');
    }
    const imagePath = req.file.path;

    const studentName = await faceRecognitionService.recognizeFace(imagePath);

    const fs = require('fs');
    fs.unlinkSync(imagePath);

    if (studentName === 'No match') {
      return res.status(404).json({ message: 'No matching student found' });
    }

    const student = await Student.findOne({ name: studentName });
    if (!student) {
      return res.status(404).json({ message: 'Student not found in database' });
    }

    const attendance = new Attendance({ student: student._id });
    await attendance.save();
    res.status(200).json({ message: `Attendance marked for ${studentName}`, attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAttendance = async (req, res)=>{
  try{
    const attendace = await Attendance.find({}).populate('student')
    res.json({attendace})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
