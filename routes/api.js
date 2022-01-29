const router = require('express-promise-router')();


// DIVIDE THE ROUTES ACCORDING TO THE DATA WHATEVER
router.use("/moderator",require('./moderator'));
module.exports = router;