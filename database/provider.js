const database = require('./database');

async function availableOrders(pid) {
    const sql = `SELECT II.QUANTITY AS NO_OF_SERVICES, O.ORDER_ADDRESS AS ADDRESS, O.ORDER_NOTES AS NOTES, C.PHONE_NUMBER AS PHONE, II.SVC_ID AS SID, O.ORDER_ID AS OID 
    FROM ORDERS O JOIN INCLUDED_IN II ON (O.ORDER_ID = II.ORDER_ID) JOIN SERVICE_PROVIDER SP ON (SP.PROVIDES = II.SVC_ID)
    JOIN CUSTOMER C ON (O.C_ID = C.CUSTOMER_ID)
    WHERE SP.PROVIDER_ID = :pid AND II.ORDER_STATUS = 'PENDING' `;
    const binds = {
        pid : pid
    };
    return (await database.execute(sql,binds, database.options)).rows;
}

async function assignProvider(pid, sid, oid) {
    const sql = `
    BEGIN 
    ASSIGN_ORDER( :pid, :sid, :oid);
    END;`;
    const binds = {
        pid : pid,
        sid : sid,
        oid : oid
    };
    (await database.execute(sql, binds, {}));
    return;
}

async function updateOrderStatus(oid) {
    const sql = `
    BEGIN 
    UPDATE_ORDER_STATUS(:oid);
    END;`;
    const binds = {
        oid : oid
    };
    (await database.execute(sql, binds, {}));
    return;
}

async function completeOrder(pid,sid,oid) {
    const sql = `UPDATE INCLUDED_IN SET ORDER_STATUS = 'COMPLETED' WHERE PROVIDER_ID = :pid AND SVC_ID = :sid AND ORDER_ID = :oid AND ORDER_STATUS = 'ACCEPTED'`;
    const binds = {
        pid : pid,
        sid : sid,
        oid : oid
    };
    await database.execute(sql, binds, {});
    return;
}

async function countAssignedOrders(pid) {
    const sql = `SELECT COUNT(*) AS TOTAL FROM INCLUDED_IN WHERE PROVIDER_ID = :pid AND ORDER_STATUS = 'ACCEPTED'`;
    const binds = {
        pid : pid 
    };
    return (await database.execute(sql, binds, database.options)).rows;
}
async function assignedOrders(pid) {
    const sql = `SELECT II.QUANTITY AS NO_OF_SERVICES, O.ORDER_ADDRESS AS ADDRESS, O.ORDER_NOTES AS NOTES, C.PHONE_NUMBER AS PHONE, II.SVC_ID AS SID, O.ORDER_ID AS OID 
    FROM ORDERS O JOIN INCLUDED_IN II ON (O.ORDER_ID = II.ORDER_ID) JOIN SERVICE_PROVIDER SP ON (SP.PROVIDES = II.SVC_ID)
    JOIN CUSTOMER C ON (O.C_ID = C.CUSTOMER_ID)
    WHERE SP.PROVIDER_ID = :pid AND II.ORDER_STATUS = 'ACCEPTED' `;
    const binds = {
        pid : pid
    };
    return (await database.execute(sql,binds, database.options)).rows;
}

async function getInfoSP(pid) {
    const sql = `SELECT SP.NAME, SP.EMAIL, SP.PHONE_NUMBER, TO_CHAR(SP.REG_DATE, 'YYYY-MM-DD') AS REG_DATE, 
    NVL(SP.INCOME, 0) AS INCOME, SP.LICENCE_ID, S.SERVICE_NAME, (SELECT COUNT(*) FROM INCLUDED_IN WHERE PROVIDER_ID = :pid) AS CNTSERVICE 
    FROM SERVICE_PROVIDER SP JOIN SERVICE S ON (SP.PROVIDES=S.SERVICE_ID) 
    WHERE SP.PROVIDER_ID = :pid`;
    const binds = {
        pid : pid
    };
    return (await database.execute(sql,binds, database.options)).rows;
}

module.exports = {
    availableOrders,
    assignProvider,
    completeOrder,
    countAssignedOrders,
    assignedOrders,
    getInfoSP,
    updateOrderStatus
}