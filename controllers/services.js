const Controller = require('./base').Controller;
const db_services = require('../database/services');

class ServiceController extends Controller {
    constructor() {
        super();
    }

    list = async (req, res, next) => {
        if(req.user !== null) {
        let id = req.params.id;
        let services = await db_services.getAllServicesUnderCategory(id);
        let comments = await db_services.getAllCommentsUnderCategory(id);
        let category = await db_services.getCategoryName(id);
        // let category_name = category[0].CATNAME;
        res.render('services', {services, comments});
        }else {
            res.redirect("/api");
        }
    };


    // fetch = async (req, res, next) => {
    //     let id = req.params.id;
    //     let moderator = await db_moderators.getModeratorById(id);
    //     //the database column names must be in block letters!!!
    //     const name = moderator[0].MODERATOR_NAME;
    //     const email = moderator[0].EMAIL;
    //     const phone = moderator[0].PHONE_NO;
    //     const hire_date = moderator[0].HIRE_DATE;
    //     res.render('home' , {
    //         title: 'Home Page',
    //         name,
    //         email,
    //         phone,
    //         hire_date 
    //     })
    // };
};


exports.ServiceController = ServiceController;