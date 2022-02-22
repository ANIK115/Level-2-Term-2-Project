const router = require('express-promise-router')();

const auth = require('../../middlewares/auth');
const ProviderController = require('../../controllers/provider').ProviderController;
let controller = new ProviderController();

// libraries

router.get('/', auth.spAuth, controller.availableOrders);
router.get('/profile', auth.spAuth, controller.profile);
router.get('/orders', auth.spAuth, controller.availableOrders);
router.post('/orders/:sid/:oid', auth.spAuth, controller.accpetOrder);
router.get('/assignedorders', auth.spAuth, controller.assignedOrders);
router.post('/assignedorders/:sid/:oid', auth.spAuth, controller.completeOrders);


module.exports = router;