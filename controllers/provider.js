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

    accpetOrder = async (req, res)=> {
        if(req.user !== null) {
            const pid = req.user.id;
            const sid = req.params.sid;
            const oid = req.params.oid;
            let count = await db_provider.countAssignedOrders(pid);
            count = count[0].TOTAL;
            console.log(`total: ${count}`);
            if(count < 3) {
                await db_provider.assignProvider(pid,sid,oid);
            }
            res.redirect('/providerapi/home/orders');    
        }
    }

    assignedOrders = async(req,res) => {
        if(req.user !== null) {
            const pid = req.user.id;
            let orders = await db_provider.assignedOrders(pid);
            res.render('body/service_provider/assigned_orders.ejs', {orders});
        }
    }
};


exports.ProviderController = ProviderController;