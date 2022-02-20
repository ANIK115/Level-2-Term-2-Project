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
router.get('/', sameBrowser.protectModerator, auth.mdAuth, (req, res) => {
    // if not logged in take to login page
    if(req.user == null){
        console.log("Moderator null!!");
        const errors = [];
        res.render('body/moderator/login.ejs', {
            title : 'Login - Esheba',
            body : ['login'],
            user : null,
            errors : errors
        })
    } else {
        res.redirect(`/moderatorapi/home`);
    }
});


// ROUTE: login (post)
router.post('/',  async (req, res) => {
    // if not logged in take perform the post
    if(req.user == null){
        let results, errors = [];
        // get login info for handle (id, handle, password)
        console.log("Entered moderator log in method");
        results = await DB_auth.getLoginInfoByEmailofModerator(req.body.email);
        

        // if no result, there is no such user
        if(results.length == 0){
            errors.push('No such Moderator found');
        } else {
            // match passwords
            const match = await bcrypt.compare(req.body.password, results[0].PASSWORD);
            if(match){
                console.log('matched email and password in log in');
                console.log(results);
                const moderator_id = results[0].MODERATOR_ID;
                console.log(`printing provider id: ${moderator_id}`);
                // if successful login the user
                await authUtils.loginModerator(res, results[0].MODERATOR_ID);
            }
            else{
                errors.push('wrong password');
            }
        }

        // if any error, redirect to login page but with form information, else redirect to homepage
        if(errors.length == 0){
            
            res.redirect('/moderatorapi/home');
        } else {
            res.render('body/moderator/login.ejs', {
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
        res.redirect('/moderatorapi/home');
    }
});

module.exports = router;