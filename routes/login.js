// libraries
const express = require('express');
const bcrypt = require('bcrypt');

// my modules
const DB_auth = require('../database/authentication');
const authUtils = require('../utils/authentication_util');
const auth = require('../middlewares/auth');
const sameBrowser = require('../middlewares/same_browser');

// creating router
const router = express.Router({mergeParams : true});

// ROUTE: login (get)
router.get('/', sameBrowser.protectCustomer , auth.auth, (req, res) => {
    // if not logged in take to login page
    if(req.user == null){
        const errors = [];
        res.render('login.ejs', {
            title : 'Login - Esheba',
            body : ['login'],
            user : null,
            errors : errors
        })
    } else {
        res.redirect(`${process.env.CATEGORY_URL}`);
    }
});


// ROUTE: login (post)
router.post('/', sameBrowser.protectCustomer, auth.auth,  async (req, res) => {
    // if not logged in take perform the post
    if(req.user == null){
        let results, errors = [];
        // get login info for handle (id, handle, password)
        results = await DB_auth.getLoginInfoByEmail(req.body.email);

        // if no result, there is no such user
        if(results.length == 0){
            errors.push('No such customer found');
        } else {
            // match passwords
            const match = await bcrypt.compare(req.body.password, results[0].PASSWORD);
            if(match){
                console.log('matched email and password in log in');
                const cus_id = results[0].CUSTOMER_ID;
                console.log(`printing customer id: ${cus_id}`);
                // if successful login the user
                await authUtils.loginCustomer(res, results[0].CUSTOMER_ID);
            }
            else{
                errors.push('wrong password');
            }
        }

        // if any error, redirect to login page but with form information, else redirect to homepage
        if(errors.length == 0){
            res.redirect(`${process.env.CATEGORY_URL}`);
        } else {
            res.render('login.ejs', {
                title : 'Login - Esheba',
                body : ['login'],
                user : null,
                errors : errors,
                form: {
                    email: req.body.email,
                    password: req.body.password
                }
            });
        }
    } else {
        res.redirect(`${process.env.CATEGORY_URL}`);
    }
});

module.exports = router;