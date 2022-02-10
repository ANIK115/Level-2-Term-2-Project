// libraries
const express = require('express');
const bcrypt = require('bcrypt');

// my modules
const db_authentication = require('../database/authentication');
const ss = require('../database/services');
const authUtils = require('../utils/authentication_util');

// creating router
const router = express.Router({mergeParams : true});

// ROUTE: sign up (get)
router.get('/reg_form', async (req, res) => {
    console.log('line 14');
    // check if already logged in
    if(req.user == null){
        console.log('trying to render add sp');
        const errors = [];
        const allServices = await ss.getAllServices();
        
        res.render('add_sp.ejs', {
            title : 'Sign Up as a Service Provider - Esheba',
            user : null,
            errors : errors,
            allServices : allServices
        });
    } else if(req.user.userType==="provider"){
        res.send("Provider is already signed in!");
    } else {
        res.redirect(`${process.env.CATEGORY_URL}`);
    }
});

// ROUTE: sign up (post)
router.post('/reg_form', async (req, res) => {
    console.log('entered post method');
    // check if already logged in
    if(req.user == null){
        console.log("entered if");
        let results, errors = [], allServices;

        allServices = await ss.getAllServices();
        console.log('got all services');
        // check if email is alredy used or not
        results = await db_authentication.getProviderIdByEmail(req.body.email);
        if(results.length > 0)
            errors.push('Email is already registered to a Service Provider');

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
            res.render('add_sp.ejs', {
                title : 'Sign Up as a Service Provider - Esheba',
                body : ['add_sp'],
                user : null,
                errors : errors,
                form : {
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    password2 : req.body.password2,
                    phone : req.body.phone,
                    licence_id : req.body.licence_id
                },
                allServices : allServices
            });
        }
        else{
            // if no error, create customer object to be sent to database api
            console.log('routes signup js');
            let pid = await ss.getServiceID(req.body.provides);
            let id = pid[0].SERVICE_ID;
            let service_provider = {
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
                phone : req.body.phone,
                licence_id : req.body.licence_id, 
                provides :  id
            }
            // hash user password
            await bcrypt.hash(service_provider.password, 8, async (err, hash) =>{
                if(err)
                    console.log("ERROR at hashing password: " + err.message);
                else{
                    // create user via db-api, id is returned
                    service_provider.password = hash;
                    await db_authentication.createNewServiceProvider(service_provider);
                    console.log('service provider created');
                    let result = await db_authentication.getProviderIdByEmail(service_provider.email);
                    console.log(result);
                    let sp = await db_authentication.getServiceProviderByName(service_provider.name);
                    console.log(sp);
                    // login the user too
                    await authUtils.loginProvider(res, result[0].PROVIDER_ID);
                    // redirect to home page
                    //res.redirect(`/profile/${user.handle}/settings`);
                    res.send('provider sign up done');
                }
            });
        }
    } else {
        res.redirect('/api');
    }
});

module.exports = router;