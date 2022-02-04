const database = require('./database');

async function updateCustomerTokenById(id, token){
    const sql = `
        UPDATE CUSTOMER SET TOKEN = :token WHERE CUSTOMER_ID = :id`;
        const binds = {
            id : id,
            token : token
        }
    return (await database.execute(sql, binds , database.options)).rows;
}

async function getCustomerIdByEmail(email) {
    const sql = `SELECT CUSTOMER_ID FROM CUSTOMER WHERE EMAIL = :email`;
    const binds = {
        email : email
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

//this function returns empty row
async function createNewCustomer(customer) {
    const sql = `INSERT INTO CUSTOMER (NAME, EMAIL, PASSWORD, PHONE_NUMBER, ADDRESS) 
    VALUES(:name, :email, :password, :phone, :address)
    `;
    const binds = {
        name: customer.name,
        email: customer.email,
        password: customer.password,
        phone: customer.phone,
        address: customer.address
    };
    await database.execute(sql, binds, {});
    return;
}

module.exports = {
    updateCustomerTokenById,
    getCustomerIdByEmail,
    createNewCustomer
}
