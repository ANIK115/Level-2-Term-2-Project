const Controller = require('./base').Controller;
const db_services = require('../database/services');

class ServiceController extends Controller {
    constructor() {
        super();
    }

    list = async (req, res, next) => {
        if(req.user !== null) {
        let category_id = req.params.id;
        let services = await db_services.getAllServicesUnderCategory(category_id);
        let comments = await db_services.getAllCommentsUnderCategory(category_id);
        let notify = "null";
        // let category_name = category[0].CATNAME;
        res.render('services', {services, comments, notify, category_id});
        }else {
            res.redirect("/api");
        }
    };

    addComment = async(req, res ) => {
        if(req.user !== null) {
            let cus_id = req.user.id;
            let category_id = req.params.id;
            let services = await db_services.getAllServicesUnderCategory(category_id);
            let comments = await db_services.getAllCommentsUnderCategory(category_id);
            let orders = await db_services.getOrdersTakenByCustomer(cus_id, category_id);
            console.log(req.body.checkedService);

            if(orders.length > 0)
            {
                let notify = "null";
                console.log("you can add comments");
                res.render("services", {notify, services, comments, category_id});
            }else {
               let notify = "you must take the service to add comments";
                res.render("services",{notify, services, comments, category_id});
            }
        }else {
            res.redirect("/api");
        }
    }

    addOrder = async(req, res ) => {
        if(req.user !== null) {
            console.log(req.body.checkedService);
            let cus_id = req.user.id;
            let category_id = req.params.id;
            let services = await db_services.getAllServicesUnderCategory(category_id);
            let comments = await db_services.getAllCommentsUnderCategory(category_id);
            let orders = await db_services.getOrdersTakenByCustomer(cus_id, category_id);
            console.log(req.body.checkedService);

            if(orders.length > 0)
            {
                let notify = "null";
                console.log(req.body.checkedService);
                res.render("services", {notify, services, comments, category_id});
            }else {
               let notify = "you must take the service to add comments";
                res.render("services",{notify, services, comments, category_id});
            }
        }else {
            res.redirect("/api");
        }
    }


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