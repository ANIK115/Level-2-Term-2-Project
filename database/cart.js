const database = require('./database');

async function addToCart(cid, sid, quantity)
{
    const sql = `
        BEGIN
            CREATE_CART(:cid, :sid, :quantity);
        END;
    `;
    const binds = {
        cid : cid,
        sid : sid,
        quantity : quantity
    };
    await database.execute(sql, binds, {});
    return;
}
async function getCartList(cid, sid)
{
    const sql = `SELECT COUNT(*) AS COUNT FROM CART WHERE C_ID = :cid AND S_ID = :sid`;
    const binds = {
        cid : cid,
        sid : sid 
    };
    return (await database.execute(sql, binds, database.options)).rows;
}
async function getAllCart(cid)
{
    const sql = `SELECT S.SERVICE_NAME AS NAME, S.COST AS PRICE, C.PRICE AS DISCOUNTED_PRICE, C.QUANTITY AS QUANTITY, C.S_ID AS ID, (C.PRICE*C.QUANTITY) AS SUB_TOTAL
    FROM CART C JOIN SERVICE S ON (C.S_ID = S.SERVICE_ID)
    WHERE C.C_ID = :cid`;
    const binds = {
        cid : cid 
    };
    return (await database.execute(sql, binds, database.options)).rows;
}
async function updateCart(cid, quantity)
{
    const sql = `UPDATE CART SET QUANTITY = :quantity WHERE C_ID = :cid`;
    const binds = {
        cid : cid,
        quantity : quantity
    };
    await database.execute(sql, binds, {});
    return;
}
async function updateServiceQuantity(cid, quantity, sid)
{
    const sql = `UPDATE CART SET QUANTITY = :quantity WHERE C_ID = :cid AND S_ID = :sid`;
    const binds = {
        cid : cid,
        quantity : quantity,
        sid : sid
    };
    await database.execute(sql, binds, {});
    return;
}
async function removeFromCart(cid, sid)
{
    const sql = `DELETE FROM CART WHERE C_ID = :cid AND S_ID = :sid`;
    const binds = {
        cid : cid,
        sid : sid
    };
    await database.execute(sql, binds, {});
    return;
}
async function getTotalPrice(cid)
{
    const sql = `SELECT SUM(C.PRICE*C.QUANTITY) AS TOTAL, (SUM(S.COST*C.QUANTITY)-SUM(C.PRICE*C.QUANTITY)) AS SAVED FROM CART C JOIN SERVICE S ON(S.SERVICE_ID = C.S_ID) WHERE C.C_ID = :cid`;
    const binds = {
        cid : cid
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

module.exports = {
    addToCart,
    getCartList,
    updateCart,
    getAllCart,
    removeFromCart,
    updateServiceQuantity,
    getTotalPrice
}