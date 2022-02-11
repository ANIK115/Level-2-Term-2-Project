const express = require('express');
const router = express.Router({mergeParams : true});

const db_authentication = require('../../database/authentication');
const auth = require('../../middlewares/auth');

router.post('/', auth.spAuth, async (req, res) =>{
    console.log("Logout button hitted");
    // if logged in, delete token from database
    if(req.user !== null){
        // set null in token
        console.log("entered Provider logout");
        await db_authentication.updateProviderTokenById(req.user.id, null);
        req.user.userType = "none";
    }
    res.redirect('/providerapi');
});

module.exports = router;