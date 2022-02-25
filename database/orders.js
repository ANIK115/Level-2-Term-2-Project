const database = require('./database');


async function takeOrders(cid, address, notes, amount, method, trans, phone)
{
    const sql = `
        BEGIN
            INSERT_ORDERS(:cid, :address, :notes, :amount, :method, :trans, :phone);
        END;
    `;
    const binds = {
        cid : cid,
        address : address,
        notes : notes,
        amount : amount,
        method : method,
        trans : trans,
        phone : phone
    };
    await database.execute(sql, binds, {});
    return;
}
async function getAllOrdersbyCID(id) {
    const sql = `
    SELECT O.ORDER_ID AS ORDER_ID, O.ORDER_DATE AS ORDER_DATE, O.ORDER_ADDRESS AS ORDER_ADDRESS, O.ORDER_NOTES AS NOTES, O.ORDER_STATUS AS ORDER_STATUS, PI.AMOUNT AS COST FROM ORDERS O JOIN PAYMENT_INFO PI ON (O.ORDER_ID = PI.ORDER_ID) WHERE O.C_ID = :id ORDER BY ORDER_ID DESC`;
    const binds = {
        id : id
    };
    return (await database.execute(sql, binds, database.options)).rows;
};

module.exports = {
    takeOrders,
    getAllOrdersbyCID
}

