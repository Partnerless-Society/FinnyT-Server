
export const signupmiddleware = (req, res, next) => {

    const { name, email, password, confirmpassword } = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    try {
        if (!name && !email && password) {
            return res.status(400).json({
                success: false,
                message: "Please Enter The All The Informations."
            })
        }

        if (typeof name !== "string") {
            return res.status(400).json({
                success: false,
                message: "Please Enter The Valid Username"
            })
        }

        if (typeof email !== "string" && !emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please Enter The Valid Useremail"
            })
        }

        if (typeof password !== "string") {
            return res.status(400).json({
                success: false,
                message: "Please Enter The Valid Password"
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Please Enter Password Greater Than 8 Letters"
            })
        }

        if(password !== confirmpassword){
              return res.status(400).json({
                success: false,
                message: "Passwords Do Not Match."
            })
        }

        next();
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "It seems something went wrong."
        })
    }
}

export const loginmiddleware = (req, res, next) => {
    const { email, password } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    try {
        if (!email && password) {
            return res.status(400).json({
                success: false,
                message: "Please Enter The All The Informations."
            })
        }

        if (typeof email !== "string" && !emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please Enter The Valid Useremail"
            })
        }

        if (typeof password !== "string") {
            return res.status(400).json({
                success: false,
                message: "Please Enter The Valid Useremail"
            })
        }

        next();
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "It seems something went wrong."
        })
    }
}

export const authcheck = (req, res, next) => {
    const token = req.cookies;
    if (!token) {
        return;
    }
    next();
}