import { ChatGroq } from "@langchain/groq";
import "../config/dotenvconfig.js";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { Autoupdate } from "../tools/autoupdatetool.js";
import { UpdateAgent } from "../prompt/systemprompt.js";

export const Ai = new ChatGroq({
   apiKey : process.env.Ai,
   model : "moonshotai/kimi-k2-instruct",
})

export const Aiimage = new ChatGroq({
    apiKey : process.env.Ai,
    model : "meta-llama/llama-4-scout-17b-16e-instruct"
})

export const Aiagent = new ChatGroq({
    apiKey : process.env.Ai,
    model : "moonshotai/kimi-k2-instruct"
})

export const Agent = createReactAgent({
    llm : Aiagent,
    tools : [Autoupdate],
    messageModifier : UpdateAgent
})