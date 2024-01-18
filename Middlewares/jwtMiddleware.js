const jwt = require('jsonwebtoken')
const jwtMiddleware = (req,res,next)=>{
    console.log("Inside jwtMiddleware");
    const token = req.headers['authorization'].split(" ")[1]
    try{
        const jwtResponse = jwt.verify(token,"captcha456")
        console.log(jwtResponse);
        req.payload = jwtResponse.userId 
        next()
    }catch(err){
        req.status(401).json("Authorization failed...Please login!!")
    }

}
module.exports = jwtMiddleware