const router = require('express-promise-router')();
const auth = require('../../middlewares/auth');


router.get("/", auth.spAuth, async (req,res) => {
    const id = (req.user === null)? null : req.user.id;
    if(id === null)
    {
        const homeUrl = "providerapi";
        const signup = homeUrl + "/signup";
        const login = homeUrl + "/login";
        res.render('body/service_provider/provider_index.ejs',{signup, login});
    }else {
        res.render('headers/service_provider_home.ejs');
    }
});

router.use("/signup",require('../provider_reg'));
router.use("/login", require('./provider_login'));
router.use("/home", require("./provider"));
router.use("/logout", require("./provider_logout"));


module.exports = router;