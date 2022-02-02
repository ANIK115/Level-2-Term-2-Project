const router = require('express-promise-router')();

const ServiceController = require('../controllers/services').ServiceController;
let controller = new ServiceController();

// router.get('/all',controller.list);
router.get('/:id',controller.list);

router.delete('/',);
router.put('/',);

module.exports = router;