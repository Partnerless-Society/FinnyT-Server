import { ChatGroq } from "@langchain/groq";
import "../config/dotenvconfig.js";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { Autoupdate } from "../tools/autoupdatetool.js";
import { GoogleSheetAgentPrompt, UpdateAgent } from "../prompt/systemprompt.js";
import { editSheetData, readSheetData } from "../tools/googlesheettool.js";

//Analyse Ai
export const Ai = new ChatGroq({
   apiKey : process.env.Ai,
   model : "moonshotai/kimi-k2-instruct",
})

//Vision Ai
export const Aiimage = new ChatGroq({
    apiKey : process.env.Ai,
    model : "meta-llama/llama-4-scout-17b-16e-instruct"
})

//AiAgent to For Google Sheet Update, Auto Update and other services
export const Aiagent = new ChatGroq({
    apiKey : process.env.Ai,
    model : "moonshotai/kimi-k2-instruct-0905"
})

//Agent Perform
export const Agent = createReactAgent({
    llm : Aiagent,
    tools : [Autoupdate],
    messageModifier : UpdateAgent
})

export const GoogleSheetAgent = createReactAgent({
    llm : Aiagent,
    tools : [readSheetData , editSheetData],
    messageModifier : GoogleSheetAgentPrompt
})