const { reduceRight } = require('async');
const database = require('./database');

async function getAllCategory(){
    const sql = `
        SELECT * FROM CATEGORY ORDER BY CATEGORY_NAME`;
    return (await database.execute(sql, {}, database.options)).rows;
}
async function getAllCategoryUnderModerator(id){
    const sql = `
        SELECT * FROM CATEGORY WHERE MODERATED_BY = :id ORDER BY CATEGORY_NAME`;
        const binds = {
            id : id
        };
        return (await database.execute(sql, binds, database.options)).rows;
}
async function getAllCommentsUnderCategory(id)
{
    const sql = `SELECT R.COMMENTS AS COMMENTS, C.NAME AS CUSTOMER_NAME, R.STAR AS STAR
    FROM RATINGS R JOIN CUSTOMER C ON (R.C_ID = C.CUSTOMER_ID)
    WHERE R.CAT_ID = :id`;
    const binds = {
        id : id
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getCategoryName(id)
 {
     const sql = `SELECT CATEGORY_NAME, IMG FROM CATEGORY WHERE CATEGORY_ID = :id`;
     const binds = {
         id : id
     };
     return (await database.execute(sql, binds, database.options)).rows;
 }
 async function getRating(id)
 {
     const sql = `SELECT AVG(STAR) AS RATING FROM RATINGS WHERE CAT_ID = :id`;
     const binds = {
        id : id
    };
    return (await database.execute(sql, binds, database.options)).rows;

 }

 async function addRating(cid, star, comments, cat_id, review_id)
 {
     const sql = `INSERT INTO RATINGS (REVIEW_ID, STAR, COMMENTS, C_ID, CAT_ID)
     VALUES (:rid, :star, :comments, :cid, :catid)`;
     const binds = {
        rid : review_id,
        star : star,
        comments : comments,
        cid : cid,
        catid : cat_id
     };
     await database.execute(sql, binds, {});
     return;

 }
 async function totalComments()
 {
     const sql =`SELECT COUNT(*) AS TOTAL FROM RATINGS`;
     return (await database.execute(sql, {}, database.options)).rows;
 }



module.exports = {
getAllCategory,
getAllCommentsUnderCategory,
getCategoryName,
getRating,
addRating,
totalComments,
getAllCategoryUnderModerator
}