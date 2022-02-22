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
    const sql = `SELECT * FROM ACCOUNT`;
    return (await database.execute(sql,{}, database.options)).rows;
}
module.exports = {
    getAllModerators,
    getModeratorById,
    getTransactions
}