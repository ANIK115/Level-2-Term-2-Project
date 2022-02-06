const database = require('./database');

async function getAllCategory(){
    const sql = `
        SELECT * FROM CATEGORY ORDER BY CATEGORY_NAME`;
    return (await database.execute(sql, {}, database.options)).rows;
}



module.exports = {
getAllCategory
}