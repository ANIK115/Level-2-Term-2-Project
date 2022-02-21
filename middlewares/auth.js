// libraries
const jwt = require("jsonwebtoken");

// my modules
const DB_auth = require("../database/authentication");

function auth(req, res, next) {
  req.user = null;
  // check if user has cookie token
  if (req.cookies.sessionToken) {
    let token = req.cookies.sessionToken;
    // verify token was made by server
    jwt.verify(token, process.env.APP_SECRET_TOKEN, async (err, decoded) => {
      if (err) {
        // console.log("ERROR at verifying Customer token FROM AUTH: " + err.message);
        next();
      } else {
        const decodedId = decoded.id;
        console.log(decodedId);
        let results = await DB_auth.getCustomerById(decodedId);
        console.log(decodedId);

        // if no such user or token doesn't match, do nothing
        if (results.length == 0) {
          // console.log("auth: invalid cookie for customer");
        } else if (results[0].TOKEN != token) {
          // console.log("auth: invalid token from customer");
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
function spAuth(req, res, next) {
      req.user = null;
      // check if user has cookie token
      if (req.cookies.sessionToken) {
        let token = req.cookies.sessionToken;
        // verify token was made by server
        jwt.verify(
          token,
          process.env.APP_SP_TOKEN,
          async (err, decoded) => {
            if (err) {
              // console.log("ERROR at verifying Provider token FROM AUTH: " + err.message);
              next();
            } else {
              const decodedId = decoded.id;
              console.log(decodedId);
              let results = await DB_auth.getServiceProviderById(decodedId);
              console.log(decodedId);

              // if no such user or token doesn't match, do nothing
              if (results.length == 0) {
                // console.log("spAuth: invalid cookie");
                
              } else if (results[0].TOKEN != token) {
                // console.log("spAuth: invalid token from service provider");
               
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

function mdAuth(req, res, next) {
  req.user = null;
  // check if user has cookie token
  if (req.cookies.sessionToken) {
    let token = req.cookies.sessionToken;
    // verify token was made by server
    jwt.verify(
      token,
      process.env.APP_MD_TOKEN,
      async (err, decoded) => {
        if (err) {
          console.log("ERROR at verifying MODERATOR token FROM AUTH: " + err.message);
          next();
        } else {
          const decodedId = decoded.id;
          console.log(decodedId);
          let results = await DB_auth.getModeratorById(decodedId);
          console.log(decodedId);

          // if no such user or token doesn't match, do nothing
          if (results.length == 0) {
            // console.log("mdAuth: invalid cookie");
            
          } else if (results[0].TOKEN != token) {
            // console.log("mdAuth: invalid token from moderator");
           
          } else {
            // set prompt in reqest object
            req.user = {
              id: decodedId,
              name: results[0].MODERATOR_NAME,
              email: results[0].EMAIL,
              userType: "moderator"
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

module.exports = { auth, spAuth, mdAuth };
