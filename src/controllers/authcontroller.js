import userquery from "../model/userquery.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "../config/dotenvservice.js"


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const findemail = await userquery.findOne({ email });
        if (!findemail) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password"
            })
        }

        const passwordmatch = await bcrypt.compare(password, findemail.password);

        if (!passwordmatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password"
            })
        }

        const token = jwt.sign({
            id: findemail._id,
        }, process.env.JWT)

        res.cookie("session", token, {
            maxAge: 24 * 60 * 60 * 60,
            httpOnly: false,
            //httpOnly : true,
            //secure : process.env.NODE_ENV === "production",
            sameSite: "strict"
        })

        return res.json({
            success: true,
            message: "Sign In Successful"
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "It seems something went wrong."
        })
    }
}


export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const findemail = await userquery.findOne({ email });
        if (findemail) {
            return res.status(400).json({
                success: false,
                message: "Account With The Email Already Existed."
            })
        }

        const encryptpassword = await bcrypt.hash(password, 7);

        await userquery.findOneAndUpdate({
            email
        }, {
            name,
            email,
            password: encryptpassword,
            type: "finnyT"
        }, {
            upsert: true
        })

        return res.json({
            success: true,
            message: "Account Created Successfully."
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "It seems something went wrong."
        })
    }
}

export const userfetch = async (req, res) => {
    const id = req.userId;
    try {
        const finduserdata = await userquery.findOne({
            _id: id
        });
        const data = {
            id: finduserdata._id,
            name: finduserdata.name,
            email: finduserdata.email,
            type: finduserdata.type
        }
        return res.json({
            success: true,
            data
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "It seems something went wrong."
        })
    }
}