import Anthropic from "@anthropic-ai/sdk";
import * as dotenv from 'dotenv'
dotenv.config()

const apiKey = process.env.ANTHROPIC_API_KEY;

//this works. we just need the api key to be hidden first
const client = new Anthropic({apiKey: apiKey});

export async function sendRoleplayMessage(userMessage: string){
    const response = await client.messages.create({
        model: "claude-opus-5-5",
        max_tokens: 500,

        system: `
You are a friendly language tutor.
Your job is to roleplay realistic conversations with the student.
Correct their mistakes gently, but stay in character.
Keep responses short, natural, and conversational.
Never switch to English unless the student asks.
`,

        messages: [
            {
                role: "user",
                content: userMessage
            }
        ]
    });


    // Extract Claude's text
    const text = response.content
        .filter(block => block.type === "text")
        .map(block => block.text)
        .join("\n");

    return text;
}