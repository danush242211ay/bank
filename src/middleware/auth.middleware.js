const { Split } = require("lucide-react");
const usermodel = require("../models/user.model");
const jwt = require('jsonwebtoken');

async function authMiddleware(req,res,next){

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]  

    if(!token){
        return res.status(401).json({
            message : "Token is missing"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await usermodel.findById(decoded.userId);

        if(!user){
            return res.status(401).json({
                message : "User not found"
            })
        }
        req.user = user;
        
        next();

    }catch(err){
        return res.status(401).json({
            message : "Unauthorized access. Token is invalid"
        })
    }
}

module.exports = {authMiddleware};