const { Split } = require("lucide-react");
const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const tokenBlackListModel = require('../models/blacklist.model')

async function authMiddleware(req,res,next){

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]  

    if(!token){
        return res.status(401).json({
            message : "Token is missing"
        })
    }
    const isBlacklisted = await tokenBlackListModel.findOne({ token })

    if (isBlacklisted) {
        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.userId);

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

async function authSystemUserMiddleware(req, res, next) {

    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ]

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access, token is missing"
        })
    }

    const isBlacklisted = await tokenBlackListModel.findOne({ token })

    if (isBlacklisted) {
        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.userId).select("+systemUser")
        if (!user) {
            return res.status(401).json({
            message: "User not found"
            })
        }
        if (!user.systemUser) {
            return res.status(403).json({
                message: "Forbidden access, not a system user"
            })
        }

        req.user = user

        next()
    }
    catch (err) {
        console.error(err);

        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })
    }

}

module.exports = {authMiddleware, authSystemUserMiddleware};