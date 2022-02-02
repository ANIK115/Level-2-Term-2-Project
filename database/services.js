const database = require('./database');

async function getAllServicesUnderCategory(id){
    const sql = `
    SELECT S.SERVICE_NAME AS NAME , S.DESCRIPTION AS DESCRIPTION, S.COST AS COST 
    FROM SERVICE S JOIN CATEGORY C ON (S.CATEGORY_ID = C.CATEGORY_ID)
    WHERE S.CATEGORY_ID = :id
    ORDER BY S.SERVICE_NAME`;
    const binds = {
        id : id
    };
    return (await database.execute(sql, binds, database.options)).rows;
}


module.exports = {
    getAllServicesUnderCategory
}