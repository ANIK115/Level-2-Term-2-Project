const express = require('express');

const db_services = require('../database/services');
const db_cat = require('../database/category');
const router = require('express-promise-router')();

const ModeratorController = require('../controllers/moderator').ModeratorController;
let controller = new ModeratorController();


//ROUTE: add service (get)
router.get('/addservice', async(req, res)=>{
    // if(req.user == null) {
    //     const errors = [];
    //     res.render('home.ejs', {
    //         title : 'Add Service - Esheba',
    //         body : ['add_service'],
    //         user : null,
    //         errors : errors
    //     });
    // } else {
    //     res.redirect('/');
    // }
    let categories = await db_cat.getAllCategory();
    res.render('add_service.ejs' , {categories});
});

// ROUTE : add service (post)
router.post('/addservice', async (req, res) => {
    if(true) {
        let results, errors = [];
        let cat_id;

        results = await db_services.getServiceByName(req.body.name);
        if(results.length > 0)
        {
            errors.push('Name is already in use for a serive');
        }
        cat = req.body.category;
        console.log(`${cat} is category id..............`);
        // cat = await db_authentication.getCategoryID(cat_id);
        if(errors.length > 0) {
            res.render('add_service.ejs', {
                title : 'Add Service - Esheba',
                body : ['add_service'],
                user : null,
                errors : errors,
                form : {
                    name : req.body.name,
                    category : cat,
                    description : req.body.description,
                    cost : req.body.cost
                } 
            });
        } 
        else {
            let service = {
                name : req.body.name,
                category : cat,
                description : req.body.description,
                cost : req.body.cost
            }

            await db_services.createNewService(service);

            res.redirect('/api/services/1');
        }
    } else {
        res.redirect('/api/services/1');
    }
});

router.get('/all',controller.list);
router.get('/:id',controller.fetch);

module.exports = router;