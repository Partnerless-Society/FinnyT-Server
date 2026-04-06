import dataquery from "../../model/dataquery.js";
import incomeoutcomquery from "../../model/incomeoutcomquery.js";
import typequery from "../../model/typequery.js";

export const create = async (req, res) => {
    const { id, type, amount, category, source } = req.body;

    if (!type || !amount || !category || !source) {
        return res.status(400).json({
            success: false,
            message: "Please Provide All The Required Fields."
        });
    }
    
    try {
        //Update Income And Outcome
        await incomeoutcomquery.findOneAndUpdate({
            userId: id
        }, {
            $push: {
                data: {
                    type,
                    amount: Number(amount),
                    category,
                    source,
                    date: new Date()
                }
            }
        }, {
            upsert: true
        })

        //Update For Chart Display
        const dataexist = await typequery.findOneAndUpdate(
            {
                userId: id,
                "data.category": category
            },
            {
                $inc: {
                    [`data.$.${type}`]: amount
                }
            },
            {
                new: true
            }
        );

        if (!dataexist) {
            await typequery.findOneAndUpdate(
                { userId: id },
                {
                    $push: {
                        data: {
                            category: category,
                            income: type === "income" ? amount : 0,
                            outcome: type === "outcome" ? amount : 0
                        }
                    }
                },
                { upsert: true, new: true }
            );
        }

        //Update Dashboard
        if (type === "income") {
            await dataquery.findOneAndUpdate({
                userId: id
            }, {
                $inc: {
                    income: amount
                }
            }, {
                new: true
            })
        }
        else {
            await dataquery.findOneAndUpdate({
                userId: id
            }, {
                $inc: {
                    outcome: amount
                }
            }, {
                new: true
            })
        }

        return res.json({
            success: true,
            message: "Successfully Added!"
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

export const fetchtrackincome = async (req, res) => {
    const { id } = req.query;
    try {
        const result = await incomeoutcomquery.findOne(
            { userId: id },
            {
                data: {
                    $filter: {
                        input: "$data",
                        as: "item",
                        cond: { $eq: ["$$item.type", "income"] }
                    }
                }
            }
        );
        if (!result) {
            return res.status(404).json({ message: "No data found" })
        };

        return res.status(200).json({
            success: true,
            data: result.data
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "It seems something went wrong."
        })
    }
}

export const fetchtrackoutcome = async (req, res) => {
    const { id } = req.query;
    try {
        const result = await incomeoutcomquery.findOne(
            { userId: id },
            {
                data: {
                    $filter: {
                        input: "$data",
                        as: "item",
                        cond: { $eq: ["$$item.type", "outcome"] }
                    }
                }
            }
        );
        if (!result) {
            return res.status(404).json({ message: "No data found" })
        };

        return res.status(200).json({
            success: true,
            data: result.data
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "It seems something went wrong."
        })
    }
}

export const fetchchartincome = async (req, res) => {
    const { id } = req.query;
    try {
        const data = await typequery.findOne(
            { userId: id },
            {
                data: {
                    $filter: {
                        input: "$data",
                        as: "item",
                        cond: { $gt: ["$$item.income", 0] }
                    }
                }
            }
        );

        if (!data) {
            return res.status(404).json({ success: false, message: "No Data found" });
        }

        return res.status(200).json({
            success: true,
            data: data.data
        });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "It seems something went wrong."
        })
    }
}


export const fetchchartoutcome = async (req, res) => {
    const { id } = req.query;
    try {
        const data = await typequery.findOne(
            { userId: id },
            {
                data: {
                    $filter: {
                        input: "$data",
                        as: "item",
                        cond: { $gt: ["$$item.outcome", 0] }
                    }
                }
            }
        );

        if (!data) {
            return res.status(404).json({ success: false, message: "No Data found" });
        }

        return res.status(200).json({
            success: true,
            data: data.data
        });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "It seems something went wrong."
        })
    }
}