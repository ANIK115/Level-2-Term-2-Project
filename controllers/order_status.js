const Controller = require('./base').Controller;
const db_orders = require('../database/orders');
const db_services = require('../database/services');

class StatusController extends Controller {
    constructor() {
        super();
    }

    list = async (req, res, next) => {
        if(req.user !== null) {
        let customer = req.user.id;
        let orders = await db_orders.getAllOrdersbyCID(customer);
    
        res.render('body/order_status_cards.ejs',{orders});
        }else {
            res.status(400).send("You are not a valid user for this url!");
        }
    };

};


exports.StatusController = StatusController;