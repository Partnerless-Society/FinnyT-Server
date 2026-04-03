import serviceaccountquery from "../../model/serviceaccountquery.js";
import { testgmail } from "../../services/googleservice.js"

export const Testconnection = async (req, res) => {
    const { id, email, key } = req.body;
    try {

        await testgmail(email, key);

        await serviceaccountquery.findOneAndUpdate({
            userId: id
        }, {
            email,
            key,
            date: new Date()
        }, {
            upsert: true
        })

        return res.json({
            success: true,
            message: "Connection Tested Successfully"
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Fail To Connect. Please Try Again."
        })
    }
}

export const fetchservicedata = async (req, res) => {
    const { id } = req.query;
    try {
        const finddata = await serviceaccountquery.findOne({ userId: id }, {
            email: 1,
            date: 1,
            _id: 1
        });
        if (!finddata) {
            return res.status(400).json({
                success: false,
                message: "No Data Found"
            })
        }
        return res.json({
            success: true,
            data: finddata
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

export const AddUrl = async (req, res) => {
    const { id, url } = req.body;
    try {
        await serviceaccountquery.findOneAndUpdate({
            userId: id
        }, {
            url
        }, {
            upsert: true
        })
        return res.json({
            success: true,
            message: "Url Added Successfully."
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

export const fetchurl = async (req, res) => {
    const { id } = req.query;
    try {
        const finddata = await serviceaccountquery.findOne({ userId: id }, {
            url: 1,
            _id: 0
        });
        if (!finddata) {
            return res.status(400).json({
                success: false,
                message: "No Data Found"
            })
        }
        return res.json({
            success: true,
            url: finddata.url
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

