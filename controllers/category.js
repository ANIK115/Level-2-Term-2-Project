const Controller = require('./base').Controller;
const db_category = require('../database/category');
const db_services = require('../database/services');

class CategoryController extends Controller {
    constructor() {
        super();
    }

    list = async (req, res, next) => {
        if(req.user != null)  {
        let categories = await db_category.getAllCategory();
        res.render('body/cards.ejs',{categories});
        }else {
            res.status(400).send("You're not a valid user for this url!");
        }
    };

    listBySearch = async (req,res)=> {
        if(req.user != null) {
            let key = req.body.key ;
            key = "%"+key+"%";
            console.log(key);
            let services = await db_services.getAllServicesBySearch(key);
            res.render('body/service_cards.ejs', {services});
        }else {
            res.status(400).send("You're not a valid user for this url!");
        }
    }
    listByPriceRange = async (req,res)=> {
        if(req.user != null) {
            let lower = req.body.lower ;
            let upper = req.body.upper;
            let services = await db_services.getAllServicesByPrice(lower, upper);
            res.render('body/service_cards.ejs', {services});
        }else {
            res.status(400).send("You're not a valid user for this url!");
        }
    }

    showComments = async (req,res) => {
        if(req.user != null) {
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
        let notify = "null";
        res.render('comments.ejs',{notify, comments, rating, cat_name, cat_img, cat_id});
    }else {
        res.status(400).send("You're not a valid user for this url!");
    }
    }
    addComment = async(req, res ) => {
        if(req.user !== null) {
            let cus_id = req.user.id;
            let cat_id = req.params.id;
            let comments = await db_services.getAllCommentsUnderCategory(cat_id);
            let orders = await db_services.getOrdersTakenByCustomer(cus_id, cat_id);
            let cat = await db_category.getCategoryName(cat_id);
            const cat_name = cat[0].CATEGORY_NAME;
            const cat_img = cat[0].IMG;
            let ratings = await db_category.getRating(cat_id);
            let rating = ratings[0].RATING;
            if(rating === null) {
                rating = "Currently no rating!";
            }

            if(orders.length > 0)
            {
                let notify = "null";
                console.log("you can add comments");
                let review = await db_category.totalComments();
                let review_id = review[0].TOTAL + 1;
                const star = req.body.star;
                const comment = req.body.comment_field;
                console.log(cus_id);
                console.log(star);
                console.log(comment);
                console.log(review_id);
                await db_category.addRating(cus_id, star, comment, cat_id, review_id);
                comments = await db_category.getAllCommentsUnderCategory(cat_id);
                ratings = await db_category.getRating(cat_id);
                rating = ratings[0].RATING;
                if(rating === null) {
                    rating = "Currently no rating!";
                }
                res.render("comments.ejs", {notify, comments, rating, cat_name, cat_img, cat_id});
            }else {
               let notify = "you must take the service to add comments";
                res.render("comments.ejs",{notify, comments, rating, cat_name, cat_img, cat_id});
            }
        }else {
            res.status(400).send("You're not a valid user for this url!");
        }
    }
};


exports.CategoryController = CategoryController;