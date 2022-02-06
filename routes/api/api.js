const router = require('express-promise-router')();



router.get("/", async (req,res) => {
    const id = (req.user === null)? null : req.user.id;
    if(id === null)
    {
        const homeUrl = "api";
        const signup = homeUrl + "/signup";
        const login = homeUrl + "/login";
        res.render('body/index.ejs',{signup, login });
    }else {
        console.log(req.user.id);
        res.redirect("/api/category/all");
    }
});
router.use("/signup",require('../authentication/signup'));
router.use("/login",require('../login'));
router.use("/moderator",require('../moderator'));
router.use("/services", require('../services'));
router.use("/provider",require('../provider_reg'));
router.use("/category", require('../category'));
module.exports = router;