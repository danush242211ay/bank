const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken')

async function userRegisterController(req,res){
   try {
        const { email, password, name } = req.body;

        const isExists = await userModel.findOne({ email });

        if (isExists) {
            return res.status(422).json({
                message: "User already exists",
                status: "failed"
            });
        }

        const user = await userModel.create({
            email,
            name,
            password
        });

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );

        res.cookie("token", token);

        res.status(201).json({
            message: "Registered Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }
}

async function userLoginController(req,res){

    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select("+password");;

    if(!user){
        return res.status(401).json({message :"Email is invalid"});
    }

    const isValidPassword = await user.comparePassword(password);

    if(!isValidPassword){
        return res.status(401).json({
            message : "Password is invalid"
        })    
    }
    const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );

        res.cookie("token", token);

        res.status(200).json({
            message: "login Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });

}
module.exports = {userRegisterController , userLoginController};