const Controller = require('./base').Controller;
const db_moderators = require('../database/moderators');
const db_cat = require('../database/category');
const db_services = require('../database/services');

class ModeratorController extends Controller {
    constructor() {
        super();
    }

    list = async (req, res, next) => {
        let allModerators = await db_moderators.getAllModerators();
        res.status(200).json(allModerators);
    };

    home = async(req,res) => {
        if(req.user!= null) {
            res.render('headers/moderator_home.ejs');
        }else {
            res.status(400).send("Not a valid user for this url!");
        }
    };

    transaction = async(req,res) => {
        if(req.user!= null) {
            const transactions = await db_moderators.getTransactions();
            res.render('body/moderator/transactions.ejs', {transactions});
        }else {
            res.status(400).send("Not a valid user for this url!");
        }
    }

    fetch = async (req, res, next) => {
        let id = req.params.id;
        let moderator = await db_moderators.getModeratorById(id);
        console.log(moderator);
        //the database column names must be in block letters!!!
        const name = moderator[0].MODERATOR_NAME;
        const email = moderator[0].EMAIL;
        const phone = moderator[0].PHONE_NO;
        const hire_date = moderator[0].HIRE_DATE;
        res.render('home' , {
            title: 'Home Page',
            name,
            email,
            phone,
            hire_date 
        })
    };

    //newly added
    offer = async(req, res) => {
        if(req.user != null) {
            let id = req.user.id;
            console.log('ar bhallagena');
            let services = await db_cat.getAllServicesUnderModerator(id);
            console.log(services);
            console.log('naaaa');
            res.render('body/moderator/add_offer.ejs' , {services});
            }else {
                res.status(400).send("You are not a valid user for this url");
            }
    }

    showServices = async (req,res) => {
        if(req.user !==null) {
            const id = req.user.id;
            let services = await db_moderators.getModeratedServices(id);
            res.render('body/moderator/show_services.ejs', {services}); 
        }else {
            res.status(400).send("You're not a valid user for this url!");
        }
    }

    showOffers = async (req,res) => {
        if(req.user !==null) {
            let services = await db_services.getOfferedServices();
            res.render('body/moderator/offers.ejs', {services}); 
        }else {
            res.status(400).send("You're not a valid user for this url!");
        }
    }
    //newly added
    add_offer = async(req, res, next) => {
        if(req.user != null) {
            let results, errors = [];
            let cat;
            console.log("in add offer in moderator controller");
            if(errors.length > 0) {
                res.render('body/moderator/add_offer.ejs', {
                    title : 'Add Offer - Esheba',
                    errors : errors,
                    form : {
                        service_name : req.service_name,
                        offer_name : req.offer_name,
                        discount : req.discount,
                        start_date : req.start_date,
                        end_date : req.end_date
                    } 
                });
            } 
            else {
                let service_id = await db_services.getServiceID(req.body.services);
                console.log(req.body);
                console.log(service_id);
                let offer = {
                    sid : service_id[0].SERVICE_ID,
                    offer_name : req.body.name,
                    discount : req.body.discount,
                    start_date : req.body.start_date,
                    end_date : req.body.end_date
                }
                
                await db_services.createNewOffer(offer);
    
                res.redirect('/moderatorapi/home');
            }
        } else {
            res.status(400).send("You are not a valid moderator for this url");
        }
    };
};


exports.ModeratorController = ModeratorController;