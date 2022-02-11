// libraries
const express = require('express');
const bcrypt = require('bcrypt');

// my modules
const DB_auth = require('../../database/authentication');
const authUtils = require('../../utils/authentication_util');
const auth = require('../../middlewares/auth');
const sameBrowser = require('../../middlewares/same_browser');

// creating router
const router = express.Router({mergeParams : true});

// ROUTE: login (get)
router.get('/', sameBrowser.protectProvider, auth.spAuth, (req, res) => {
    // if not logged in take to login page
    if(req.user == null){
        console.log("Provider null!!");
        const errors = [];
        res.render('provider_login.ejs', {
            title : 'Login - Esheba',
            body : ['login'],
            user : null,
            errors : errors
        })
    } else {
        res.redirect(`/providerapi/home`);
    }
});


// ROUTE: login (post)
router.post('/',  async (req, res) => {
    // if not logged in take perform the post
    if(req.user == null){
        let results, errors = [];
        // get login info for handle (id, handle, password)
        console.log("Entered provider log in method");
        results = await DB_auth.getLoginInfoByEmailofSP(req.body.email);
        

        // if no result, there is no such user
        if(results.length == 0){
            errors.push('No such service provider found');
        } else {
            // match passwords
            const match = await bcrypt.compare(req.body.password, results[0].PASSWORD);
            if(match){
                console.log('matched email and password in log in');
                console.log(results);
                const provider_id = results[0].PROVIDER_ID;
                console.log(`printing provider id: ${provider_id}`);
                // if successful login the user
                await authUtils.loginProvider(res, results[0].PROVIDER_ID);
            }
            else{
                errors.push('wrong password');
            }
        }

        // if any error, redirect to login page but with form information, else redirect to homepage
        if(errors.length == 0){
            
            res.redirect('/providerapi/home');
        } else {
            res.render('provider_login.ejs', {
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
        res.redirect('/providerapi/home');
    }
});

module.exports = router;