import dataquery from "../../model/dataquery.js";

export const Dashboarddata = async (req, res) => {
    const { id } = req.query;

    try {
        const dashboarddata = await dataquery.findOne({userId : id})
        return res.json({
            success : true,
            income : dashboarddata.income,
            outcome : dashboarddata.outcome
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