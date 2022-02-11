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
    console.log('customer token updated');
    console.log(userId);
    const cus = await db_authentication.getCustomerToken(userId);
    console.log(cus);
    // set token in cookie
    let options = {
        maxAge: 90000000, //expire duration of the token in milliseconds
        httpOnly: true
    }
    res.cookie('sessionToken', token, options);
}

async function loginProvider(res, userId){
    // create token
    const payload = {
        id: userId
    };
    let token = jwt.sign(payload, process.env.APP_SP_TOKEN);
    console.log(token);
    console.log("That was provider token in utils");
    // put token in db
    await db_authentication.updateProviderTokenById(userId, token);
    // set token in cookie
    let options = {
        maxAge: 90000000, //expire duration of the token in milliseconds
        httpOnly: true
    }
    console.log("Provider logged in");
    res.cookie('sessionToken', token, options);
}

module.exports = {
    loginCustomer,
    loginProvider
}