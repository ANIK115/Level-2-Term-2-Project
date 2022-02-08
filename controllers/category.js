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

    showComments = async (req,res) => {
        let cat_id = req.params.id;
        let comments = await db_category.getAllCommentsUnderCategory(cat_id);
        let ratings = await db_category.getRating(cat_id);
        let rating = ratings[0].RATING;
        if(rating === null) {
            rating = "Currently no rating!";
        }
        let cat = await db_category.getCategoryName(cat_id);
        const cat_name = cat[0].CATEGORY_NAME;
        const cat_img = cat[0].IMG;
        console.log(rating);
        res.render('comments.ejs',{comments, rating, cat_name, cat_img, cat_id});
    }
};


exports.CategoryController = CategoryController;