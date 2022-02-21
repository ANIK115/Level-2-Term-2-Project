const router = require('express-promise-router')();
const protect = require('../middlewares/protect').protectCustomer;
const StatusController = require('../controllers/order_status').StatusController;
let controller = new StatusController();

// libraries

router.get('/all',protect, controller.list);

module.exports = router;