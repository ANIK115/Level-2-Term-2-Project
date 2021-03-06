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

async function getCustomerById(id) {
    const sql = `SELECT * FROM CUSTOMER WHERE CUSTOMER_ID = :id`;
    const binds = {
        id : id 
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

//this function returns empty row
async function createNewCustomer(customer) {
    const sql = `INSERT INTO CUSTOMER (NAME, EMAIL, PASSWORD, PHONE_NUMBER, ADDRESS, USER_TYPE) 
    VALUES(:name, :email, :password, :phone, :address, :user_type)
    `;
    const binds = {
        name: customer.name,
        email: customer.email,
        password: customer.password,
        phone: customer.phone,
        address: customer.address,
        user_type: customer.type
    };
    await database.execute(sql, binds, {});
    return;
}

async function getLoginInfoByEmail(email)
{
    const sql = `SELECT CUSTOMER_ID, EMAIL, PASSWORD FROM CUSTOMER WHERE EMAIL = :email`;
    const binds = {
        email : email
    };
    return (await database.execute(sql, binds, database.options)).rows; 
}

async function updateProviderTokenById(id, token){
    console.log('provider token updated');
    const sql = `
        UPDATE SERVICE_PROVIDER SET TOKEN = :token WHERE PROVIDER_ID = :id`;
        const binds = {
            id : id,
            token : token
        }
    return (await database.execute(sql, binds , {}));
}

async function getLoginInfoByEmailofSP(email)
{
    const sql = `SELECT EMAIL, PASSWORD, PROVIDER_ID FROM SERVICE_PROVIDER WHERE EMAIL = :email`;
    const binds = {
        email : email
    };
    return (await database.execute(sql, binds, database.options)).rows; 
}

async function getProviderIdByEmail(email) {
    const sql = `SELECT PROVIDER_ID FROM SERVICE_PROVIDER WHERE EMAIL = :email`;
    const binds = {
        email : email
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getServiceProviderById(id) {
    const sql = `SELECT * FROM SERVICE_PROVIDER WHERE PROVIDER_ID = :id`;
    const binds = {
        id : id 
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getServiceProviderByName(name) {
    const sql = `SELECT * FROM SERVICE_PROVIDER WHERE NAME = :name`;
    const binds = {
        name : name 
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

//this function returns empty row
async function createNewServiceProvider(service_provider) {
    const sql = `INSERT INTO SERVICE_PROVIDER (NAME, EMAIL, PASSWORD, PHONE_NUMBER, LICENCE_ID, PROVIDES, USER_TYPE) 
    VALUES(:name, :email, :password, :phone, :licence_id, :provides, :user_type)
    `;
    console.log(service_provider.name);
    console.log(service_provider);
    const binds = {
        name: service_provider.name,
        email: service_provider.email,
        password: service_provider.password,
        phone: service_provider.phone,
        licence_id: service_provider.licence_id,
        provides: service_provider.provides,
        user_type : service_provider.type
    };
    await database.execute(sql, binds, {});
    return;
}
async function getCustomerToken(id)
{
    const sql = `SELECT TOKEN FROM CUSTOMER WHERE CUSTOMER_ID = :id`;
    const binds = {
        id : id
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getLoginInfoByEmailofModerator(email)
{
    const sql = `SELECT EMAIL, PASSWORD, MODERATOR_ID FROM MODERATOR WHERE EMAIL = :email`;
    const binds = {
        email : email
    };
    return (await database.execute(sql, binds, database.options)).rows; 
}

async function updateModeratorTokenById(id, token){
    console.log('moderator token updated');
    const sql = `
        UPDATE MODERATOR SET TOKEN = :token WHERE MODERATOR_ID = :id`;
        const binds = {
            id : id,
            token : token
        }
    return (await database.execute(sql, binds , {}));
}

async function createNewModerator(moderator) {
    const sql = `INSERT INTO MODERATOR (MODERATOR_NAME, EMAIL, PASSWORD, PHONE_NO, PRESENT_ADDRESS, PERMANENT_ADDRESS, USER_TYPE) 
    VALUES(:name, :email, :password, :phone, :present_address, :permanent_address, :user_type)
    `;

    const binds = {
        name: moderator.name,
        email: moderator.email,
        password: moderator.password,
        phone: moderator.phone,
        present_address: moderator.present_address,
        permanent_address: moderator.permanent_address,
        user_type : moderator.type
    };
    await database.execute(sql, binds, {});
    return;
}

async function getModeratorIdByEmail(email) {
    const sql = `SELECT MODERATOR_ID FROM MODERATOR WHERE EMAIL = :email`;
    const binds = {
        email : email
    };
    return (await database.execute(sql, binds, database.options)).rows;
}
async function getModeratorById(id) {
    const sql = `SELECT * FROM MODERATOR WHERE MODERATOR_ID = :id`;
    const binds = {
        id : id 
    };
    return (await database.execute(sql, binds, database.options)).rows;
}

async function updateModeratorTokenById(id, token){
    const sql = `
        UPDATE MODERATOR SET TOKEN = :token WHERE MODERATOR_ID = :id`;
        const binds = {
            id : id,
            token : token
        }
    return (await database.execute(sql, binds , database.options)).rows;
}

module.exports = {
    updateCustomerTokenById,
    getCustomerIdByEmail,
    getCustomerById,
    createNewCustomer,
    getLoginInfoByEmail,
    getLoginInfoByEmailofSP,
    createNewServiceProvider,
    getServiceProviderById,
    getProviderIdByEmail,
    updateProviderTokenById,
    getServiceProviderByName,
    getCustomerToken,
    getLoginInfoByEmailofModerator,
    updateModeratorTokenById,
    createNewModerator,
    getModeratorIdByEmail,
    getModeratorById,
    updateModeratorTokenById
}
