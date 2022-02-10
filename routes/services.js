const router = require('express-promise-router')();

const ServiceController = require('../controllers/services').ServiceController;
let controller = new ServiceController();

// libraries
const DB_auth = require('../database/authentication');

// router.get('/all',controller.list);
router.post('/logout', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user !== null){
        // set null in token
        console.log("entered customer logout");
        await DB_auth.updateCustomerTokenById(req.user.id, null);
        req.user.userType = "none";
    }
    res.redirect('/api');
});

router.get('/carts/:id', controller.removeCart);
router.get('/carts',controller.showCart);
router.get('/:id',controller.list);
router.get('/cart/:id',controller.addCart);



module.exports = router;