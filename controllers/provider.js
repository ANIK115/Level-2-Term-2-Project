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
};


exports.ProviderController = ProviderController;