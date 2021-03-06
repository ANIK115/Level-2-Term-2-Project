const database = require('./database');

async function getAllServicesUnderCategory(id){
    const sql = `
    SELECT S.SERVICE_ID AS ID, S.SERVICE_NAME AS NAME , S.DESCRIPTION AS DESCRIPTION, S.COST AS COST, S.IMG AS IMG 
    FROM SERVICE S JOIN CATEGORY C ON (S.CATEGORY_ID = C.CATEGORY_ID)
    WHERE S.CATEGORY_ID = :id
    ORDER BY S.SERVICE_NAME`;
    const binds = {
        id : id
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getOfferedServices() {
    const sql = `SELECT S.SERVICE_ID AS ID, S.SERVICE_NAME AS NAME , S.IMG AS IMG, S.DESCRIPTION AS DESCRIPTION, S.COST AS COST, (S.COST-S.COST*O.DISCOUNT/100) AS DISCOUNTED, O.END_DATE AS OFFER_ENDS , O.OFFER_NAME AS OFFER 
    FROM SERVICE S LEFT JOIN OFFERS O ON (S.SERVICE_ID = O.SERVICE_ID)
    WHERE O.END_DATE > SYSDATE
    ORDER BY S.SERVICE_NAME`;
    return (await database.execute(sql, {}, database.options)).rows;
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
    const sql = `INSERT INTO SERVICE (SERVICE_NAME, DESCRIPTION, COST, CATEGORY_ID, IMG) 
    VALUES(:name, :description, :cost, :category, :img)
    `;
    const binds = {
        name : service.name,
        description : service.description,
        cost : service.cost,
        category : service.category,
        img : service.img 
    };
    console.log('created new service!');
    await database.execute(sql, binds, {});
    return;
}

async function getCustomerFromOrder(id)
{
    const sql = `SELECT O.C_ID AS cus_id 
    FROM ORDERS O JOIN INCLUDED_IN II ON (O.ORDER_ID = II.ORDER_ID)
    WHERE II.SVC_ID = :id
    ORDER BY O.ORDER_DATE
    `;
    const binds = {
        id : id 
    }
    return (await database.execute(sql, binds, database.options)).rows;
}


async function getServiceID(name) {
    const sql = `SELECT SERVICE_ID FROM SERVICE WHERE SERVICE_NAME = :name`;
    const binds = {
        name : name 
    }
    return (await database.execute(sql, binds, database.options)).rows;
}
async function getAllServices()
{
    const sql = `SELECT SERVICE_NAME FROM SERVICE`;
    return (await database.execute(sql, {}, database.options)).rows;

}
async function getOrdersTakenByCustomer(id, cat_id)
{
    const sql = `SELECT O.ORDER_ID AS OID  
    FROM ORDERS O JOIN INCLUDED_IN II ON (O.ORDER_ID = II.ORDER_ID)
    JOIN SERVICE S ON (II.SVC_ID = S.SERVICE_ID)
    WHERE S.CATEGORY_ID = :cat_id AND O.C_ID = :id
    ORDER BY O.ORDER_DATE`;
    const binds = {
        id : id,
        cat_id : cat_id
    }
    return (await database.execute(sql, binds, database.options)).rows;
}
async function getCategoryIDFromServiceID(id) {
    const sql = `SELECT CATEGORY_ID FROM SERVICE WHERE SERVICE_ID = :id`;
    const binds = {
        id : id 
    };
    return (await database.execute(sql, binds, database.options)).rows;
}
async function getAllServicesUnderOrder(id){
    const sql = `
    SELECT S.SERVICE_ID AS ID, S.SERVICE_NAME AS NAME , S.DESCRIPTION AS DESCRIPTION, S.COST AS COST, S.IMG AS IMG , C.COST AS DISCOUNTED, C.ORDER_STATUS AS ORDER_STATUS
    FROM SERVICE S JOIN INCLUDED_IN C ON (S.SERVICE_ID = C.SVC_ID)
    WHERE C.ORDER_ID = :id
    ORDER BY S.SERVICE_NAME`;
    const binds = {
        id : id
    };
    return (await database.execute(sql, binds, database.options)).rows;
}
async function createNewOffer(offer) {
    const sql = `INSERT INTO OFFERS (OFFER_ID, SERVICE_ID, OFFER_NAME, DISCOUNT, START_DATE, END_DATE) 
    VALUES(OFFER_SEQ.NEXTVAL, :sid, :offer_name, :discount, TO_DATE(:start_date, 'YYYY-MM-DD'), TO_DATE(:end_date, 'YYYY-MM-DD'))
    `;
    const binds = {
        sid : offer.sid,
        offer_name : offer.offer_name,
        discount : offer.discount,
        start_date : offer.start_date,
        end_date : offer.end_date
    };
    console.log('created new offer!');
    await database.execute(sql, binds, {});
    return;
}
async function getAllServicesBySearch(key) {
    const sql = `SELECT  S.SERVICE_ID AS ID, S.SERVICE_NAME AS NAME , S.DESCRIPTION AS DESCRIPTION, S.COST AS COST, S.IMG AS IMG 
    FROM SERVICE S WHERE UPPER(SERVICE_NAME) LIKE UPPER(:key) ORDER BY SERVICE_NAME`;
    const binds = {
        key : key
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getAllServicesByPrice(lower, upper) {
    const sql = `SELECT  S.SERVICE_ID AS ID, S.SERVICE_NAME AS NAME , S.DESCRIPTION AS DESCRIPTION, S.COST AS COST, S.IMG AS IMG 
    FROM SERVICE S WHERE COST BETWEEN :lower AND :upper ORDER BY COST`;
    const binds = {
        lower : lower,
        upper : upper 
    }
    return (await database.execute(sql, binds, database.options)).rows;
}
async function getServiceImage(sid) {
    const sql = `SELECT IMG FROM SERVICE WHERE SERVICE_ID = :sid`;
    const binds = {
        sid : sid 
    };
    return (await database.execute(sql, binds, database.options)).rows;
}
module.exports = {
    getAllServicesUnderCategory,
    getAllCommentsUnderCategory,
    getCategoryName,
    getServiceByName,
    getCategoryID,
    createNewService,
    getCustomerFromOrder,
    getServiceID,
    getAllServices,
    getOrdersTakenByCustomer,
    getCategoryIDFromServiceID,
    getOfferedServices,
    getAllServicesUnderOrder,
    createNewOffer,
    getAllServicesBySearch,
    getAllServicesByPrice,
    getServiceImage
}