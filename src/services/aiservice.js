import { ChatGroq } from "@langchain/groq";
import "../config/dotenvservice.js";

export const Ai = new ChatGroq({
   apiKey : process.env.Ai,
   model : "moonshotai/kimi-k2-instruct",
})

