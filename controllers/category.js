const Controller = require('./base').Controller;
const db_category = require('../database/category');

class CategoryController extends Controller {
    constructor() {
        super();
    }

    list = async (req, res, next) => {
        let categories = await db_category.getAllCategory();
        res.render('body/cards.ejs',{categories});
    };

};


exports.CategoryController = CategoryController;