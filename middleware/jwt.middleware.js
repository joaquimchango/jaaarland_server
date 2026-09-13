
const jwt = require("jsonwebtoken");


const isAuthenticated = (req, res, next)=>{

  console.log("Request header", req.headers)

try{

 const authHeader = req.headers.authorization;

 if (!authHeader) {
      return res.status(401).json({
        error: "Authorization header is missing",
      });
    }

 const [scheme, token] = authHeader.split(" ");
 if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        error: "Authorization header must use the Bearer scheme",
      });
    }

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
