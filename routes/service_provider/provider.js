const router = require('express-promise-router')();

const auth = require('../../middlewares/auth');
const ProviderController = require('../../controllers/provider').ProviderController;
let controller = new ProviderController();

// libraries

router.get('/', auth.spAuth, controller.home);


module.exports = router;