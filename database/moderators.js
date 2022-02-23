const database = require('./database');

async function getAllModerators(){
    const sql = `
        SELECT * FROM MODERATOR ORDER BY MODERATOR_NAME`;
    return (await database.execute(sql, {}, database.options)).rows;
}

async function getModeratorById(id) {
    const sql = 'SELECT * FROM MODERATOR WHERE MODERATOR_ID = :id';
    const binds = {
        id : id
    };
    return (await database.execute(sql,binds, database.options)).rows;
}
async function getTransactions() {
    const sql = `SELECT * FROM ACCOUNT ORDER BY TRANS_DATE DESC`;
    return (await database.execute(sql,{}, database.options)).rows;
}
async function getModeratedServices(id) {
    const sql = `SELECT S.SERVICE_NAME AS NAME, S.COST AS COST, S.IMG AS IMG, S.DESCRIPTION AS DESCRIPTION FROM SERVICE S JOIN CATEGORY C ON (S.CATEGORY_ID = C.CATEGORY_ID) JOIN MODERATOR M ON (M.MODERATOR_ID = C.MODERATED_BY) WHERE M.MODERATOR_ID = :id`;
    const binds = {
        id : id
    };
    return (await database.execute(sql,binds, database.options)).rows;
}
module.exports = {
    getAllModerators,
    getModeratorById,
    getTransactions,
    getModeratedServices
}