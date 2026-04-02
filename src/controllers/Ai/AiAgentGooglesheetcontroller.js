import { testgmail} from "../../services/googleservice.js"

export const Testconnection = async (req, res) => {
    const { email, key } = req.body;
    try {
        
        await testgmail(email, key);
        return res.json({
            success : true,
            message : "Connection Tested Successfully"
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "Fail To Connect. Please Try Again."
        })
    }
}