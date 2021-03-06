const router = require('express-promise-router')();

const CategoryController = require('../controllers/category').CategoryController;
let controller = new CategoryController();
const protect = require('../middlewares/protect').protectCustomer;

// libraries

router.get('/all', protect, controller.list);
router.get('/:id/comments',protect, controller.showComments);
router.post('/:id/comments',protect, controller.addComment);
router.post('/searchkey', protect, controller.listBySearch);
router.post('/searchbyprice', protect, controller.listByPriceRange);


module.exports = router;