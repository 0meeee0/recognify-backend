const express = require('express');
const router = express.Router();
const multer = require('multer');
const authController =  require('../controller/authController')
const upload = multer({ dest: 'backend/uploads/' });

router.post('/face-auth', upload.single('image'), authController.faceAuth)

module.exports = router;
