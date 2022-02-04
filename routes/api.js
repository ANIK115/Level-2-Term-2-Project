const router = require('express-promise-router')();


// DIVIDE THE ROUTES ACCORDING TO THE DATA WHATEVER
// router.use("/",(req,res) => {
//     res.render('reg_form');
// })
router.use("/signup",require('./signup'));
router.use("/moderator",require('./moderator'));
router.use("/services", require('./services'));
module.exports = router;