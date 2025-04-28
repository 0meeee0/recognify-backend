const express = require('express');
const router = express.Router();
const courseController = require('../controller/courseController');
const {authenticate} = require('../middleware/authMiddleware')

router.use(authenticate)

router.post('/', courseController.createCourse);
router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
