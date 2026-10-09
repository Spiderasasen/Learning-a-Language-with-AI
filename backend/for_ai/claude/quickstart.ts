import Anthropic from "@anthropic-ai/sdk";
import * as dotenv from 'dotenv'
dotenv.config()

const apiKey = process.env.ANTHROPIC_API_KEY;

//this works. we just need the api key to be hidden first
const client = new Anthropic({apiKey: apiKey});

// @ts-ignore
const message = await client.messages.create({
    model: "claude-opus-5-5",
    max_tokens: 1000,
    messages: [
        {
            role: "user",
            content: "What should I search for to find the latest developments in renewable energy?"
        }
    ]
});

for (const block of message.content) {
    if (block.type === "text") {
        console.log(block.text);
    }
}