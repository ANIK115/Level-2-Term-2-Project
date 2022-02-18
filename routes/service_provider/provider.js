const router = require('express-promise-router')();

const auth = require('../../middlewares/auth');
const ProviderController = require('../../controllers/provider').ProviderController;
let controller = new ProviderController();

// libraries

router.get('/', auth.spAuth, controller.home);
router.get('/orders', auth.spAuth, controller.availableOrders);
router.post('/orders/:sid/:oid', auth.spAuth, controller.accpetOrder);
router.get('/assignedorders', auth.spAuth, controller.assignedOrders);


module.exports = router;