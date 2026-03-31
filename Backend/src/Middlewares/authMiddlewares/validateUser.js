import userModel from "../../Models/UserModel.js";
import JWT from 'jsonwebtoken'

const validateUser = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) return res.status(404).json({
        message: "Token not found",
        success: false,
        err: "No token found in cookies"
    })

    const decodedToken = JWT.verify(token, process.env.JWT_SECRET);


    if (!decodedToken) return res.status(400).json({
        message: "Invalid token",
        success: false,
        err: "Invalid token"
    })

    const user = await userModel.findById(decodedToken.userid);

    if (!user) return res.status(400).json({
        message: "Invalid token",
        success: false,
        err: "Invaild token"
    })
    req.user = user;
    
    next();
}

export default validateUser