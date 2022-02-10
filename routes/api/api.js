const router = require('express-promise-router')();



router.get("/", async (req,res) => {
    const id = (req.user === null)? null : req.user.id;
    if(id === null)
    {
        const homeUrl = "api";
        const signup = homeUrl + "/signup";
        const login = homeUrl + "/login";
        const signupsp = homeUrl + "/provider/reg_form";
        const loginsp = homeUrl + "/login/sp";
        res.render('body/index.ejs',{signup, login, signupsp, loginsp });
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
router.use("/provider",require('../provider_reg'));
router.use("/category", require('../category'));
module.exports = router;