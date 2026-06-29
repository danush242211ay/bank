const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken')

async function userRegisterController(){
    const {email, password, name} = req.body;

    const isExists = userModel.findOne({
        email : email
    })

    if(isExists){
        return res.status(422).json({
            message : "User already exists",
            status : "failed"
        })
    }

    const user = userModel.create({
        email, name, password
    })

    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn : "3d"});
}

module.exports = {userRegisterController};