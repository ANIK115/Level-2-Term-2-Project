const router = require('express-promise-router')();

const CategoryController = require('../controllers/category').CategoryController;
let controller = new CategoryController();

// libraries

router.get('/all',controller.list);

module.exports = router;