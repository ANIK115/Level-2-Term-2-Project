const router = require('express-promise-router')();

const auth = require('../middlewares/auth');
const CustomerController = require('../controllers/customer').CustomerController;
let controller = new CustomerController();

// libraries

router.get('/', auth.auth, controller.profile);


module.exports = router;

//create a customer route