
const jwt = require("jsonwebtoken");


const isAuthenticated = (req, res, next)=>{

try{
 const token = req.headers.authorization.split(" ")[1];
 const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
 console.log(decodedToken);
 req.payload.userAuth = decodedToken;
 next();
}catch{
  res.status(401).json({
    error: new Error("Invalid request!"),
  });

}

}
// Function used to extract the JWT token from the request's 'Authorization' Headers


// Export the middleware so that we can use it to create protected routes
module.exports = {
  isAuthenticated
};
