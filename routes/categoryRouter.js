const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');
const {authenticate} = require('../middleware/authMiddleware')

router.use(authenticate)

router.post('/', categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
