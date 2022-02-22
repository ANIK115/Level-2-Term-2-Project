const router = require('express-promise-router')();
const auth = require('../../middlewares/auth');
const sameBrowser = require('../../middlewares/same_browser');


router.get("/", sameBrowser.protectCustomer, auth.auth, async (req,res) => {
    const id = (req.user === null)? null : req.user.id;
    if(id === null)
    {
        const homeUrl = "api";
        const signup = homeUrl + "/signup";
        const login = homeUrl + "/login";
        res.render('body/index.ejs',{signup, login});
    }else {
        if(req.user.userType === "customer")
        {
            console.log(req.user.userType);
            res.redirect("/api/category/all");
        }else if(req.user.userType==="provider")
        {
            console.log(req.user.userType);
            res.send("you are a provider!!!");
        }
        
    }
});
router.use("/signup",require('../authentication/signup'));
router.use("/login",require('../login'));
router.use("/moderator",require('../moderator'));
router.use("/services", require('../services'));
router.use("/status", require('../order_status'));
router.use("/category", require('../category'));
router.use("/profile", require('../customer'));
module.exports = router;