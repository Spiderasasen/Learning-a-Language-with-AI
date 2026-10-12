import type { VercelRequest, VercelResponse } from "@vercel/node";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

type Msg = { role: "user" | "assistant"; content: string };

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") return res.status(405).end();

    try {
        const { userMessage, lang, level, location, history = [] } = req.body;

        const messages: Msg[] = [...history, { role: "user", content: userMessage }];

        const response = await client.messages.create({
            model: "claude-opus-5-5",
            max_tokens: 1000,
            system: `
You are a language tutor who roleplays real-world conversations in ${lang} at the learner's approximate ${level} in the location ${location}.
Speak only in the target language unless asked otherwise.
Analyze each sentence the user writes: if it's correct, continue naturally;
if it contains mistakes, briefly explain the issue in the target language and provide a corrected version.
If you detect any slang, pause the roleplay and ask (in the target language) whether the user is a native speaker or an advanced learner.
If they say yes, end the roleplay immediately;
if they say no or seem confused, tell them (in english) to avoid slang and then continue normally.
When the user says they want to end the roleplay, stop and give a short summary in English only, describing what they practiced, the mistakes they made, and how they can improve.
All summaries must always be in English.
Begin by starting the conversation in the target language.
`,
            messages,
        });

        const text = response.content
            .filter((block) => block.type === "text")
            .map((block) => block.text)
            .join("\n");

        res.status(200).json({ text });
    } catch (e: any) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
}