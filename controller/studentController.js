const Student = require('../model/Student');
const path = require('path');
const fs = require('fs');

exports.createStudent = async (req, res) => {
  try {
    const studentName = req.body.name;
    if (!studentName || !req.file) {
      return res.status(400).send('Name and image are required');
    }

    const studentsDir = path.join(__dirname, '../students');
    if (!fs.existsSync(studentsDir)) {
      fs.mkdirSync(studentsDir);
    }

    
    const newImagePath = path.join(studentsDir, `${studentName}.jpg`);
    fs.renameSync(req.file.path, newImagePath);

    const student = new Student({ name: studentName, imagePath: newImagePath });
    await student.save();
    res.status(200).json({ message: 'Student created successfully', student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
