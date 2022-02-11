const jwt = require("jsonwebtoken");

// my modules
const DB_auth = require("../database/authentication");

function protectCustomer(req, res, next) {
  // check if user has cookie token
  if (req.cookies.sessionToken) {
    let token = req.cookies.sessionToken;
    // verify token was made by server
    jwt.verify(token, process.env.APP_SECRET_TOKEN, async (err, decoded) => {
      if (err) {
        console.log("ERROR at verifying Customer token from protect: " + err.message);
        next();
      } else {
        const decodedId = decoded.id;
        console.log(decodedId);
        let results = await DB_auth.getCustomerById(decodedId);
        console.log(decodedId);

        // if no such user or token doesn't match, do nothing
        if (results.length == 0) {
          console.log("protect customer: invalid cookie for customer");
          res.status(400).send("You're not a valid user for this url!");
        } else if (results[0].TOKEN != token) {
          console.log("protect customer: invalid token from customer");
          res.status(400).send("You're not a valid user for this url!");
        next();
        } else {
          // set prompt in reqest object
          req.user = {
            id: decodedId,
            name: results[0].NAME,
            email: results[0].EMAIL,
            userType: "customer",
          };
        }
        next();
      }
    });
  } else {
    next();
  }
}

function protectProvider(req,res,next) {
    if (req.cookies.sessionToken) {
        let token = req.cookies.sessionToken;
        // verify token was made by server
        jwt.verify(
          token,
          process.env.APP_SP_TOKEN,
          async (err, decoded) => {
            if (err) {
              console.log("ERROR at verifying Provider token: " + err.message);
              next();
            } else {
              const decodedId = decoded.id;
              console.log(decodedId);
              let results = await DB_auth.getServiceProviderById(decodedId);
              console.log(decodedId);

              // if no such user or token doesn't match, do nothing
              if (results.length == 0) {
                console.log("protect provider: invalid cookie");
                res.status(400).send("You're not a valid user for this url!");
              } else if (results[0].TOKEN != token) {
                console.log("protect provider: invalid token from service provider");
                res.status(400).send("You're not a valid user for this url!");
              } else {
                // set prompt in reqest object
                req.user = {
                  id: decodedId,
                  name: results[0].NAME,
                  email: results[0].EMAIL,
                  userType: "provider"
                };
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