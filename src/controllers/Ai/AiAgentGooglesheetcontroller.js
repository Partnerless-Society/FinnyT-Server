import serviceaccountquery from "../../model/serviceaccountquery.js";
import { GoogleSheetAgent } from "../../services/aiservice.js";

export const Agentgooglesheetcreate = async (req, res) => {
    const { id, url, prompt } = req.body;

    try {
        const findservice = await serviceaccountquery.findOne({ userId: id });
        if (!findservice) {
            return res.status(400).json({
                success: false,
                message: "No Service Account Found."
            })
        }

        const response = await GoogleSheetAgent.invoke({
            messages: [
                {
                    role: "user",
                    content: `The url of the google sheet is ${url} and the prompt is ${prompt}. 
                    You Support Type : Create. Meaning You cannot update or delete data when user requested`
                }
            ]
        },
            {
                configurable: {
                    serviceAccountEmail: findservice.email,
                    serviceAccountKey: findservice.key
                }
            })


        const messages = response.messages;
        const lastMessage = messages[messages.length - 1];

        const aireply = lastMessage.content;

        return res.json({
            success: true,
            message: aireply
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

export const Agentgooglesheetupdate = async (req, res) => {
    const { id, url, prompt, row, col } = req.body;

    try {
        const findservice = await serviceaccountquery.findOne({ userId: id });
        if (!findservice) {
            return res.status(400).json({
                success: false,
                message: "No Service Account Found."
            })
        }

        const response = await GoogleSheetAgent.invoke({
            messages: [
                {
                    role: "user",
                    content: `The url of the google sheet is ${url} and the prompt is ${prompt}. 
                    ${row && `Your row to update is ${row}` }
                    ${col && `Your col to update is ${col}` }
                     You Support Type : Update . Meaning You cannot create , add or delete data when user requested`
                }
            ]
        },
            {
                configurable: {
                    serviceAccountEmail: findservice.email,
                    serviceAccountKey: findservice.key
                }
            })


        const messages = response.messages;
        const lastMessage = messages[messages.length - 1];

        const aireply = lastMessage.content;

        return res.json({
            success: true,
            message: aireply
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


export const Agentgooglesheetdelete = async (req, res) => {
    const { id, url, prompt, row, col } = req.body;

    try {
        const findservice = await serviceaccountquery.findOne({ userId: id });
        if (!findservice) {
            return res.status(400).json({
                success: false,
                message: "No Service Account Found."
            })
        }

        const response = await GoogleSheetAgent.invoke({
            messages: [
                {
                    role: "user",
                    content: `The url of the google sheet is ${url} and the prompt is ${prompt}. 
                    ${row && `Your row to delete is ${row}` }
                    ${col && `Your col to delete is ${col}` }
                     You Support Type : Delete. Meaning You cannot create , add or update data when user requested`
                }
            ]
        },
            {
                configurable: {
                    serviceAccountEmail: findservice.email,
                    serviceAccountKey: findservice.key
                }
            })


        const messages = response.messages;
        const lastMessage = messages[messages.length - 1];

        const aireply = lastMessage.content;

        return res.json({
            success: true,
            message: aireply
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