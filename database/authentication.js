const database = require('./database');

async function updateCustomerTokenById(id, token){
    console.log('customer token updated');
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

async function getCustomerById(id) {
    const sql = `SELECT * FROM CUSTOMER WHERE CUSTOMER_ID = :id`;
    const binds = {
        id : id 
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

async function getLoginInfoByEmail(email)
{
    const sql = `SELECT EMAIL, PASSWORD FROM CUSTOMER WHERE EMAIL = :email`;
    const binds = {
        email : email
    };
    return (await database.execute(sql, binds, database.options)).rows; 
}

module.exports = {
    updateCustomerTokenById,
    getCustomerIdByEmail,
    getCustomerById,
    createNewCustomer,
    getLoginInfoByEmail

}
