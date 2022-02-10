const Controller = require('./base').Controller;
const db_services = require('../database/services');
const db_cart = require('../database/cart');

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
        res.render('body/service_cards.ejs', {services, comments, notify, category_id});
        }else {
            res.redirect("/api");
        }
    };

    offers = async (req,res) => {
        if(req.user !==null) {
            if(req.user.userType === "customer") {
                let services = await db_services.getOfferedServices();
                res.render('body/offers.ejs', {services});
            }
        }
    }

    addCart = async (req,res) => {
        if(req.user !== null) {
            console.log("add cart");
            let sid = req.params.id;
            let cat_id = await db_services.getCategoryIDFromServiceID(sid);
            cat_id = cat_id[0].CATEGORY_ID;
            let cid = req.user.id;
            console.log(`${cid} in add cart`);
            let count = await db_cart.getCartList(cid, sid);
            count = count[0].COUNT;
            if(count == 0)
            {
                await db_cart.addToCart(cid, sid, 1);
                console.log(`${cid} added this service`);
            }else {
                console.log("Already added!......");
            }
            
            res.redirect(`/api/services/${cat_id}`);
        }
    }

    addCartFromOffers = async (req,res) => {
        if(req.user !== null) {
            console.log("add cart from offers");
            let sid = req.params.id;
            let cid = req.user.id;
            console.log(`${cid} in add cart`);
            let count = await db_cart.getCartList(cid, sid);
            count = count[0].COUNT;
            if(count == 0)
            {
                await db_cart.addToCart(cid, sid, 1);
                console.log(`${cid} added this service`);
            }else {
                console.log("Already added!......");
            }
            
            res.redirect(`/api/services/offers`);
        }
    }

    showCart = async(req,res) => {
        if(req.user !== null) {
            let cid = req.user.id;
            let services = await db_cart.getAllCart(cid);
            res.render("body/cart.ejs", {services});
        }
    }

    removeCart = async(req,res)=> {
        if(req.user !==null) {
            let cid = req.user.id;
            let sid = req.params.id;
            console.log(req.body.quantity);
            await db_cart.removeFromCart(cid,sid);
            res.redirect("/api/services/carts");
        }
    }
    updateCart = async(req,res)=> {
        if(req.user !==null) {
            let cid = req.user.id;
            let sid = req.params.id;
            let quan = req.body.quantity2;
            console.log("Entered update");
            console.log(quan);
            await db_cart.updateServiceQuantity(cid, quan, sid);
            res.redirect("/api/services/carts");
        }
    }

    

    renderOrder = async(req,res) => {
        if(req.user !==null) {
            if(req.user.userType === "customer") {
                let cid = req.user.id;
                let services = await db_cart.getAllCart(cid);
                let price = await db_cart.getTotalPrice(cid);
                const totalPrice = price[0].TOTAL;
                const saved = price[0].SAVED;
                console.log("Entered render order");
                console.log(req.user.userType);
                console.log(totalPrice);
                res.render("body/orders.ejs", {services, totalPrice, saved});
            }else {
                console.log(req.user.userType);
            }
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