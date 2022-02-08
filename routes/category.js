const router = require('express-promise-router')();

const CategoryController = require('../controllers/category').CategoryController;
let controller = new CategoryController();

// libraries

router.get('/all',controller.list);
router.get('/:id/comments', controller.showComments);
router.post('/:id/comments', controller.addComment);

module.exports = router;