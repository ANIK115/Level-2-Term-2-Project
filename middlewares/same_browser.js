const jwt = require("jsonwebtoken");

// my modules
const DB_auth = require("../database/authentication");

function protectProvider(req, res, next) {
  // check if user has cookie token
  if (req.cookies.sessionToken) {
    let token = req.cookies.sessionToken;
    // verify token was made by server
    jwt.verify(token, process.env.APP_SECRET_TOKEN, async (err, decoded) => {
      if (err) {
        console.log("ERROR at verifying Customer token from same browser: " + err.message);
        next();
      } else {
        const decodedId = decoded.id;
        console.log(decodedId);
        let results = await DB_auth.getCustomerById(decodedId);
        console.log(decodedId);

        // if no such user or token doesn't match, do nothing
        if (results.length == 0) {
          console.log("same browser provider: invalid cookie for customer");
        } else if (results[0].TOKEN != token) {
          console.log("same browser provider: invalid token from customer");
        next();
        } else {
          // set prompt in reqest object
          res.status(400).send("Can't use multiple accounts simultaneously from a browser");
        }
        next();
      }
    });
  } else {
    next();
  }
}

function protectCustomer(req,res,next) {
    if (req.cookies.sessionToken) {
        let token = req.cookies.sessionToken;
        // verify token was made by server
        jwt.verify(
          token,
          process.env.APP_SP_TOKEN,
          async (err, decoded) => {
            if (err) {
              console.log("ERROR at verifying Provider token from same browser: " + err.message);
              next();
            } else {
              const decodedId = decoded.id;
              console.log(decodedId);
              let results = await DB_auth.getServiceProviderById(decodedId);
              console.log(decodedId);

              // if no such user or token doesn't match, do nothing
              if (results.length == 0) {
                console.log("same browser customer: invalid cookie");
              } else if (results[0].TOKEN != token) {
                console.log("same browser customer: invalid token from service provider");
              } else {
                // set prompt in reqest object
                res.status(400).send("Can't use multiple accounts simultaneously from a browser");
              }
              next();
            }
          }
        );
      } else {
        next();
      }
}

module.exports = { protectCustomer, protectProvider };