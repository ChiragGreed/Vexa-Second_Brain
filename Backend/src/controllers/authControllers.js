import userModel from "../Models/UserModel.js";
import JWT from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExist = await userModel.findOne({ $or: [{ username }, { email }] });

        if (userExist) return res.status(400).json({
            message: "User with this " + (userExist.username === username ? "username" : "email") + " already exists",
            success: false,
            err: "User Already exist"
        })


        const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({ username, email, password: hash });

        const token = JWT.sign({
            userid: user._id,
            username: user._username
        },
            process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token);

        res.status(201).json({
            message: "User Registered successfully",
            success: true,
            user
        })
    }
    catch (error) {
        res.status(400).json({
            message: "Failed to Register user",
            success: false,
            err: "Failed to register user"
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select("+password");

        if (!user) return res.status(404).json({
            message: "Invalid credintials, wrong password or email",
            success: false,
            err: "Invalid credintials"
        })

        const passwordCheck = await bcrypt.compare(password, user.password);

        if (!passwordCheck) return res.status(400).json({
            message: "Invalid credintials, wrong password or email",
            success: false,
            err: "Invalid credintials"
        })

        const token = JWT.sign({
            userid: user._id,
            username: user.username
        }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.cookie('token', token)

        res.status(201).json({
            message: "User Logged in",
            success: true,
            user
        })
    } catch (err) {
        res.status(400).json({
            message: "Failed to login user",
            success: false,
            err: "Failed to login user"
        });
    }
}
