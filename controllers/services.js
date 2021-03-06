const Controller = require('./base').Controller;
const db_services = require('../database/services');
const db_cart = require('../database/cart');
const db_orders = require('../database/orders');

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
            res.status(400).send("You're not a valid user for this url!");
        }
    };

    offers = async (req,res) => {
        if(req.user !==null) {
            let services = await db_services.getOfferedServices();
            res.render('body/offers.ejs', {services}); 
        }else {
            res.status(400).send("You're not a valid user for this url!");
        }
    }

    listbyorder = async(req, res) => {
        if(req.user !== null) {
            let order_id = req.params.id;
            let services = await db_services.getAllServicesUnderOrder(order_id);
            res.render('body/order_cards.ejs', {services, order_id});
            }else {
                res.status(400).send("You're not a valid user for this url!");
            }
    };

    addCart = async (req,res) => {
        if(req.user !== null) {
            console.log("add cart");
            let sid = req.params.id;
            let cat_id = await db_services.getCategoryIDFromServiceID(sid);
            let img = await db_services.getServiceImage(sid);
            img = img[0].IMG;
            cat_id = cat_id[0].CATEGORY_ID;
            let cid = req.user.id;
            console.log(`${cid} in add cart`);
            let count = await db_cart.getCartList(cid, sid);
            count = count[0].COUNT;
            if(count == 0)
            {
                await db_cart.addToCart(cid, sid, 1, img);
                console.log(`${cid} added this service`);
            }else {
                console.log("Already added!......");
            }
            
            res.redirect(`/api/services/${cat_id}`);
        }else {
            res.status(400).send("You're not a valid user for this url!");
        }
    }

    addCartFromOffers = async (req,res) => {
        if(req.user !== null) {
            console.log("add cart from offers");
            let sid = req.params.id;
            let cid = req.user.id;
            let img = await db_services.getServiceImage(sid);
            img = img[0].IMG;
            console.log(`${cid} in add cart`);
            let count = await db_cart.getCartList(cid, sid);
            count = count[0].COUNT;
            if(count == 0)
            {
                await db_cart.addToCart(cid, sid, 1, img);
                console.log(`${cid} added this service`);
            }else {
                console.log("Already added!......");
            }
            
            res.redirect(`/api/services/offers`);
        }else {
            res.status(400).send("You're not a valid user for this url!");
        }
    }

    showCart = async(req,res) => {
        if(req.user !== null) {
            let cid = req.user.id;
            let services = await db_cart.getAllCart(cid);
            res.render("body/cart.ejs", {services});
        }else {
            res.status(400).send("You're not a valid user for this url!");
        }
    }

    removeCart = async(req,res)=> {
        if(req.user !==null) {
            let cid = req.user.id;
            let sid = req.params.id;
            console.log(req.body.quantity);
            await db_cart.removeFromCart(cid,sid);
            res.redirect("/api/services/carts");
        }else {
            res.status(400).send("You're not a valid user for this url!");
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
        }else {
            res.status(400).send("You're not a valid user for this url!");
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
                if(services.length >0) {
                res.render("body/orders.ejs", {services, totalPrice, saved});
                }else {
                    res.send("Your cart is empty! Add something to Cart first!");
                }
            }else {
                res.status(400).send("You're not a valid user for this url!");
            }
        }
    }

    takeOrder = async(req, res) => {
        if(req.user !== null) {
            let cid = req.user.id;
            let price = await db_cart.getTotalPrice(cid);
            const totalPrice = price[0].TOTAL;
            const address = req.body.order_address;
            const notes = req.body.order_notes;
            const pMethod = req.body.method;
            const phn = req.body.pay_phone;
            const trans = req.body.trans;
            await db_orders.takeOrders(cid, address, notes, totalPrice, pMethod, trans, phn);
            res.redirect("/api/category/all");
        }else {
            res.status(400).send("You're not a valid user for this url!");
        }
    }

};


exports.ServiceController = ServiceController;