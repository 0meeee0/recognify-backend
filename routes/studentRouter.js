const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'backend/uploads/' });
const studentController = require('../controller/studentController')
const {authenticate} = require('../middleware/authMiddleware')

// router.use(authenticate)

router.post('/create', upload.single('image'), studentController.createStudent);
router.get('/', studentController.getStudents);
router.get('/:id', studentController.getStudentById);
router.put('/:id', upload.single('image'), studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
