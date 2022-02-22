const database = require('./database');

async function getInfoCustomer(cid){
    const sql = `SELECT NAME, EMAIL, ADDRESS, PHONE_NUMBER, TO_CHAR(REG_DATE, 'YYYY-MM-DD') AS REG_DATE, 
    (SELECT COUNT(*) FROM ORDERS WHERE C_ID = :cid) AS CNTORDERS 
    FROM CUSTOMER  
    WHERE CUSTOMER_ID = :cid`;
    const binds = {
        cid : cid
    };
    return (await database.execute(sql,binds, database.options)).rows;
}

module.exports = {
    getInfoCustomer
}

