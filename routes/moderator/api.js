const router = require('express-promise-router')();
const auth = require('../../middlewares/auth');



router.get("/", auth.mdAuth, async (req,res) => {
    const id = (req.user === null)? null : req.user.id;
    if(id === null)
    {
        const homeUrl = "moderatorapi";
        const signup = homeUrl + "/signup";
        const login = homeUrl + "/login";
        res.render('body/moderator/moderator_index.ejs',{signup, login});
    }else {
        res.render('headers/moderator_home.ejs');
    }
});


router.use("/home",require('./moderatorHome'));
router.use("/signup",require('./moderator_reg'));
router.use("/login", require('./moderator_login'));
router.use("/logout", require('./moderator_logout'));
// router.use("/home", require("./provider"));
// router.use("/logout", require("./provider_logout"));


module.exports = router;