// libraries
const express = require('express');
const DB_auth = require('../database/authentication');

// creating router
const router = express.Router({mergeParams : true});

router.post('/', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user !== null){
        // set null in token
        console.log("entered customer logout");
        await DB_auth.updateCustomerTokenById(req.user.id, null);
    }
    res.redirect('/api/services/1');
});

module.exports = router;