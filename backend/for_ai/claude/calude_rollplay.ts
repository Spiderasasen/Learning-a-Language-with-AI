import Anthropic from "@anthropic-ai/sdk";
import * as dotenv from 'dotenv'
dotenv.config()

const apiKey = process.env.ANTHROPIC_API_KEY;

//this works. we just need the api key to be hidden first
const client = new Anthropic({apiKey: apiKey});

//an array to hold all the user messages
export let conversationHistory: { role: "user" | "assistant"; content: string }[] = [];

export async function sendRoleplayMessage(userMessage: string, lang: string, level: string, location: string){
    // Add the user's message to history
    conversationHistory.push({
        role: "user",
        content: userMessage
    });

    const response = await client.messages.create({
        model: "claude-opus-5-5",
        max_tokens: 1000,
        system: `
You are a language tutor who roleplays real‑world conversations in ${lang} at the learner’s approximate ${level} in the location ${location}.
Speak only in the target language unless asked otherwise. 
Analyze each sentence the user writes: if it’s correct, continue naturally; 
if it contains mistakes, briefly explain the issue in the target language and provide a corrected version. 
If you detect any slang, pause the roleplay and ask (in the target language) whether the user is a native speaker or an advanced learner. 
If they say yes, end the roleplay immediately; 
if they say no or seem confused, tell them (in english) to avoid slang and then continue normally. 
When the user says they want to end the roleplay, stop and give a short summary in English only, describing what they practiced, the mistakes they made, and how they can improve. 
All summaries must always be in English. 
Begin by starting the conversation in the target language.
`,

        messages: conversationHistory
    });


    // Extract Claude's text
    const text = response.content
        .filter(block => block.type === "text")
        .map(block => block.text)
        .join("\n");

    // Add Claude's reply to history
    conversationHistory.push({
        role: "assistant",
        content: text
    });

    return text;
}

export function clearConversationHistory(){conversationHistory = []}