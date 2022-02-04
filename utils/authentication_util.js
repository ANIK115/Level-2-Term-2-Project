const jwt = require('jsonwebtoken');

// my modules
const db_authentication = require('../database/authentication');

// function to login user into a session
async function loginCustomer(res, userId){
    // create token
    const payload = {
        id: userId
    };
    let token = jwt.sign(payload, process.env.APP_SECRET_TOKEN);
    // put token in db
    await db_authentication.updateCustomerTokenById(userId, token);
    // set token in cookie
    let options = {
        maxAge: 90000000, //expire duration of the token in milliseconds
        httpOnly: true
    }
    res.cookie('sessionToken', token, options);
}

module.exports = {
    loginCustomer
}