// libraries
const express = require('express');
const bcrypt = require('bcrypt');

// my modules
const db_authentication = require('../../database/authentication');
const authUtils = require('../../utils/authentication_util');
const mdAuth = require('../../middlewares/auth').mdAuth;
const sameBrowser = require('../../middlewares/same_browser');


// creating router
const router = express.Router({mergeParams : true});

// ROUTE: sign up (get)
router.get('/', sameBrowser.protectModerator, mdAuth, async (req, res) => {
    console.log('in provider_reg.js file sign up get method');
    // check if already logged in
    if(req.user == null){
        console.log('trying to render moderator sign up');
        const errors = [];
        res.render('body/moderator/signup.ejs', {
            title : 'Sign Up as a Moderator - Esheba',
            user : null,
            errors : errors
        });
    } else {
        res.redirect('/moderatorapi/home');
    }
});

// ROUTE: sign up (post)
router.post('/', mdAuth, async (req, res) => {
    console.log('entered post method');
    // check if already logged in
    if(req.user == null){
        console.log("entered if");
        let results, errors = [];
        // check if email is alredy used or not
        results = await db_authentication.getModeratorIdByEmail(req.body.email);
        if(results.length > 0)
            errors.push('Email is already registered to a Moderator');

        console.log('passed email checking');
        // check if password confimation is right
        if(req.body.password !== req.body.password2)
            errors.push('Password confirmation doesn\'t match with password');
        
        console.log('passed password matching');

        // check if password has at least 6 char
        if(req.body.password.length < 6){
            errors.push('Password must be at least 6 characters');
        }

        // if there are errors, redirect to sign up but with form informations
        if(errors.length > 0) {
            res.render('body/moderator/signup.ejs', {
                title : 'Sign Up as a Moderator - Esheba',
                user : null,
                errors : errors,
                form : {
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    password2 : req.body.password2,
                    phone : req.body.phone,
                    present_address : req.body.present_address,
                    permanent_address : req.body.permanent_address
                }
            });
        }
        else{
            // if no error, create customer object to be sent to database api
            console.log('routes signup js');
            let moderator = {
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
                phone : req.body.phone,
                present_address : req.body.present_address, 
                permanent_address : req.body.permanent_address,
                type: "moderator"
            }
            // hash user password
            await bcrypt.hash(moderator.password, 8, async (err, hash) =>{
                if(err)
                    console.log("ERROR at hashing password: " + err.message);
                else{
                    // create user via db-api, id is returned
                    moderator.password = hash;
                    console.log(moderator);
                    await db_authentication.createNewModerator(moderator);
                    console.log('moderator created');
                    let result = await db_authentication.getModeratorIdByEmail(moderator.email);
                    console.log(result);
                    // login the user too
                    await authUtils.loginModerator(res, result[0].MODERATOR_ID);
                    // redirect to home page
                    res.redirect('/moderatorapi/home');
                }
            });
        }
    } else {
        res.redirect('/moderatorapi/home');
    }
});

module.exports = router;