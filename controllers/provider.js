const Controller = require('./base').Controller;
const db_provider = require('../database/provider');

class ProviderController extends Controller {
    constructor() {
        super();
    }

    home = async(req,res) => {
        if(req.user != null) {
        res.render("headers/service_provider_home.ejs");
        }else {
            res.status(400).send("You're not a valid user for this url!");
        }
    }

    availableOrders = async(req, res) => {
        if(req.user !== null) {
            const pid = req.user.id;
            let orders = await db_provider.availableOrders(pid);
            res.render('body/service_provider/available_orders.ejs', {orders});
        }
    }
};


exports.ProviderController = ProviderController;