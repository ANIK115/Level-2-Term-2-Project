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

module.exports = {
    takeOrders
}

