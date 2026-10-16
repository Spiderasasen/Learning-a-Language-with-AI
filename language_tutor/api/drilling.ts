import type { VercelRequest, VercelResponse } from "@vercel/node";
import { xai } from "@ai-sdk/xai";
import { generateText } from "ai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") return res.status(405).end();

    try {
        const { lang, level } = req.body;

        const { text } = await generateText({
            model: xai.responses("grok-4.7"),
            prompt: `Your task is to generate a word in the langauge of ${lang} but in the level of a student learning ${lang} in the level of ${level}.
        you must return the word in ${lang} and its definition in english.`,
        });

        res.status(200).json({ word: text });
    } catch (e: any) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
}