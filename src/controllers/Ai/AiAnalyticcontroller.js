import { HumanMessage, SystemMessage } from "langchain";
import { Ai } from "../../services/aiservice.js";
import { AnalyseAgent } from "../../prompt/systemprompt.js";

export const AiAnalytics = async (req, res) => {
    const { total, income, outcome } = req.body;

    try {
        const message = `Here is the data :
        total : ${total},
        income : ${income},
        outcome : ${outcome}
    `
        const response = await Ai.invoke([
            AnalyseAgent,
            new HumanMessage(message)
        ])

        const aianalyse = response.content;
        
        return res.json({
            success : true,
            data : aianalyse
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