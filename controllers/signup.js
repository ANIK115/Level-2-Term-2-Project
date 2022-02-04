// libraries
const express = require('express');
const bcrypt = require('bcrypt');

// my modules
const db_authentication = require('../database/authentication');
const authUtils = require('../utils/authentication_util');

// creating router
const router = express.Router({mergeParams : true});

// ROUTE: sign up (get)
router.get('/', (req, res) => {
    // check if already logged in
    if(req.user == null){
        const errors = [];
        res.render('home.ejs', {
            title : 'Sign Up - Esheba',
            body : ['signup'],
            user : null,
            errors : errors
        });
    } else {
        res.redirect('/');
    }
});

// ROUTE: sign up (post)
router.post('/', async (req, res) => {
    // check if already logged in
    if(req.user == null){
        let results, errors = [];

        // check if email is alredy used or not
        results = await db_authentication.getUserIDByEmail(req.body.email);
        if(results.length > 0)
            errors.push('Email is already registered to a customer');

        // check if password confimation is right
        if(req.body.password !== req.body.password2)
            errors.push('Password confirmation doesn\'t match with password');

        // check if password has at least 6 char
        if(req.body.password.length < 6){
            errors.push('Password must be at least 6 characters');
        }

        // if there are errors, redirect to sign up but with form informations
        if(errors.length > 0) {
            res.render('reg_form.ejs', {
                title : 'Sign Up - Esheba',
                body : ['signup'],
                user : null,
                errors : errors,
                form : {
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    password2 : req.body.password2,
                    address : req.body.address,
                    phone : req.body.phone
                }
            });
        }
        else{
            // if no error, create customer object to be sent to database api
            let customer = {
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
                address : req.body.address,
                phone : req.body.phone
            }
            // hash user password
            await bcrypt.hash(customer.password, 8, async (err, hash) =>{
                if(err)
                    console.log("ERROR at hashing password: " + err.message);
                else{
                    // create user via db-api, id is returned
                    customer.password = hash;
                    await db_authentication.createNewCustomer(customer);
                    let result = await db_authentication.getCustomerIdByEmail(customer.email);
                    // login the user too
                    await authUtils.loginUser(res, result[0].CUSTOMER_ID);
                    // redirect to home page
                    //res.redirect(`/profile/${user.handle}/settings`);
                    res.redirect('/api');
                }
            });
        }
    } else {
        res.redirect('/');
    }
});

module.exports = router;