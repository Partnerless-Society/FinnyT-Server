import { supabase } from "../../services/supabaseconfig.js";
import { Agent, Aiimage } from "../../services/aiservice.js";
import { Aiimageanalyse } from "../../prompt/systemprompt.js";
import { HumanMessage } from "langchain";

export const Aiagentcontroller = async (req, res) => {

    const { id } = req.body;
    const file = req.file;
    const filepath = `${file.originalname}-${new Date()}`;

    try {

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }
        //Upload
        const { error } = await supabase.storage.from("FinnyT").upload(filepath, file.buffer, {
            upsert: true,
            contentType: file.mimetype
        })

        if (error) {
            console.log(error)
            return res.status(400).json({
                success: false,
                message: "Fail To Upload Image."
            })
        }

        //Retrieve Image url
        const { data } = await supabase.storage.from("FinnyT").getPublicUrl(filepath);

        const imageurl = data.publicUrl;

        //Image Analyse Model
        const responseimage = await Aiimage.invoke([
            Aiimageanalyse,
            new HumanMessage({
                content: [
                    {
                        type: "text",
                        text: "Describe this image in detail.",
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url : imageurl,
                        },
                    },
                ],
            })
        ])

        const imageresponse = responseimage.content;

        console.log(imageresponse);
        //AiAgent route
        const response = await Agent.invoke({
            messages: [
                {
                    role: "user",
                    content: `Userid : ${id},${imageresponse}`
                }
            ]
        })

        const messages = response.messages;
        const lastMessage = messages[messages.length - 1];

        const aireply = lastMessage.content;

        const {error : err} = await supabase.storage.from("FinnyT").remove(filepath);
        if(err){
            console.log(err);
        }
        return res.json({
            success: true,
            message: "Successfully Updated",
            aireply: aireply
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