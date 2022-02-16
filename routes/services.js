const router = require('express-promise-router')();

const ServiceController = require('../controllers/services').ServiceController;
let controller = new ServiceController();
const protect = require('../middlewares/protect').protectCustomer;

// libraries
const DB_auth = require('../database/authentication');

router.post('/logout', protect, async (req, res) =>{
    // if logged in, delete token from database
    if(req.user !== null){
        // set null in token
        console.log("entered customer logout");
        await DB_auth.updateCustomerTokenById(req.user.id, null);
        req.user.userType = "none";
    }
    res.redirect('/api');
});
router.get('/order', protect, controller.renderOrder);
router.post('/order', protect, controller.takeOrder);
router.get('/offers',protect,controller.offers);
router.post('/carts/:id',protect, controller.updateCart);
router.get('/carts/:id',protect, controller.removeCart);
router.get('/carts',protect,controller.showCart);
router.get('/:id',protect,controller.list);
router.get('/cart/:id',protect,controller.addCart);
router.get('/cart/offers/:id',protect, controller.addCartFromOffers);



module.exports = router;