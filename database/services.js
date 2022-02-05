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

async function getCategoryName(id) {
    const sql = `SELECT CATEGORY_NAME AS CATNAME FROM CATEGORY WHERE CATEGORY_ID = :id`;
    const binds = {
        id : id
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

//get all the comments under the category service
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

//get a service by its name
async function getServiceByName(name) {
    const sql = `SELECT SERVICE_NAME FROM SERVICE WHERE SERVICE_NAME = :name`;
    const binds = {
        name : name
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getCategoryID(name) {
    const sql = `SELECT CATEGORY_ID AS CATNAME FROM CATEGORY WHERE CATEGORY_NAME = :name`;
    const binds = {
        name : name
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function createNewService(service) {
    const sql = `INSERT INTO SERVICE (SERVICE_NAME, DESCRIPTION, COST, CATEGORY_ID) 
    VALUES(:name, :description, :cost, :category)
    `;
    const binds = {
        name : service.name,
        description : service.description,
        cost : service.cost,
        category : service.category
    };
    console.log('created new service!');
    await database.execute(sql, binds, {});
    return;
}


module.exports = {
    getAllServicesUnderCategory,
    getAllCommentsUnderCategory,
    getCategoryName,
    getServiceByName,
    getCategoryID,
    createNewService
}