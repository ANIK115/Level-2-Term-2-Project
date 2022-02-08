const database = require('./database');

async function addToCart(cid, sid, quantity)
{
    const sql = `INSERT INTO CART (C_ID, S_ID, QUANTITY) VALUES (:cid, :sid, :quantity)`;
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
    const sql = `SELECT * FROM CART WHERE C_ID = :cid`;
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

module.exports = {
    addToCart,
    getCartList,
    updateCart,
    getAllCart
}