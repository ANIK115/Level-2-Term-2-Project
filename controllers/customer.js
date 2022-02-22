const Controller = require('./base').Controller;
const db_customer = require('../database/customer');

class CustomerController extends Controller {
    constructor() {
        super();
    }

    profile = async (req, res) => {
        if (req.user != null) {
            const cid = req.user.id;
            let customer = await db_customer.getInfoCustomer(cid);
            console.log(customer);
            res.render("body/customer_profile.ejs", { customer: customer[0] });
        } else {
            res.status(400).send("You are not a valid customer for this url");
        }
    }
};

exports.CustomerController = CustomerController;