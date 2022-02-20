const Controller = require('./base').Controller;
const db_moderators = require('../database/moderators');

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
};


exports.ModeratorController = ModeratorController;