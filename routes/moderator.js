const express = require('express');

const db_services = require('../database/services');
const db_cat = require('../database/category');
const router = require('express-promise-router')();
const auth = require('../middlewares/auth');

const ModeratorController = require('../controllers/moderator').ModeratorController;
let controller = new ModeratorController();


//ROUTE: add service (get)
router.get('/', auth.mdAuth, async(req, res)=>{
    if(req.user != null) {
    const id = req.user.id;
    let categories = await db_cat.getAllCategoryUnderModerator(id);
    res.render('add_service.ejs' , {categories});
    }else {
        res.status(400).send("You are not a valid user for this url");
    }
});

// ROUTE : add service (post)
router.post('/', auth.mdAuth, async (req, res) => {
    if(req.user != null) {
        let results, errors = [];
        let cat;

        results = await db_services.getServiceByName(req.body.name);
        if(results.length > 0)
        {
            errors.push('Name is already in use for a serive');
        }
        cat = await db_services.getCategoryID(req.body.categories);
        cat = cat[0].CATNAME;
        console.log(`${cat} is category id..............`);
        if(errors.length > 0) {
            res.render('add_service.ejs', {
                title : 'Add Service - Esheba',
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

            res.redirect('/moderatorapi/home');
        }
    } else {
        res.status(400).send("You are not a valid moderator for this url");
    }
});


module.exports = router;