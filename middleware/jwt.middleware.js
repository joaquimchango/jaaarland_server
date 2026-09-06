
const jwt = require("jsonwebtoken");


const isAuthenticated = (req, res, next)=>{

try{

 const authHeader = req.headers.authorization;

 if (!authHeader) {
      return res.status(401).json({
        error: "Authorization header is missing",
      });
    }
_
 const token = authHeader.split(" ")[1];
 const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
 
 req.payload = decodedToken;
 console.log(req.payload)
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
