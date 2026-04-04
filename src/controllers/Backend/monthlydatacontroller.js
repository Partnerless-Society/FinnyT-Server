import monthlyreport from "../../model/monthlyreport.js";

export const fetchyears = async (req, res) => {
    const { id } = req.query;

    try {
        const years = await monthlyreport.distinct("year", {
            userId: id
        });

        return res.json({
            success: true,
            years: years.sort((a, b) => b - a)
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Fail To Fetch Years"
        })
    }
}

export const getMonthlyData = async (req, res) => {
    try {

        const { id, year } = req.query;

        console.log(id)
        console.log(year)
        const data = await monthlyreport.find({
            userId: id,
            year: Number(year)
        }).sort({ month: 1 });

        return res.json({
            success: true,
            data
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch monthly data"
        });
    }
};