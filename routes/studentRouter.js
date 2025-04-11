const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'backend/uploads/' });
const studentController = require('../controller/studentController')

router.post('/create', upload.single('image'), studentController.createStudent);
router.get('/', studentController.getStudents);

module.exports = router;
