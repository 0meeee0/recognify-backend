const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'backend/uploads/' });
const attendanceController = require('../controller/attendanceController');

router.post('/mark', upload.single('image'), attendanceController.markAttendance);
router.get('/', attendanceController.getAttendance)

module.exports = router;
