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

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { name } = req.body;
    let imagePath = req.body.imagePath;

    if (req.file) {
      const studentsDir = path.join(__dirname, '../students');
      if (!fs.existsSync(studentsDir)) {
        fs.mkdirSync(studentsDir);
      }

      if (imagePath) {
        fs.unlinkSync(imagePath);
      }

      imagePath = path.join(studentsDir, `${name}.jpg`);
      fs.renameSync(req.file.path, imagePath);
    }

    const student = await Student.findByIdAndUpdate(studentId, { name, imagePath }, { new: true });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student updated successfully', student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findByIdAndDelete(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const imagePath = student.imagePath;
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
