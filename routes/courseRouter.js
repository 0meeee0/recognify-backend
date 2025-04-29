const express = require('express');
const router = express.Router();
const courseController = require('../controller/courseController');
const {authenticate} = require('../middleware/authMiddleware')

router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);

router.use(authenticate)
router.post('/', courseController.createCourse);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
