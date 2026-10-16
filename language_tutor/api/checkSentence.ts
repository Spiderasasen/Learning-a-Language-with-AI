import type { VercelRequest, VercelResponse } from "@vercel/node";
import { xai } from "@ai-sdk/xai";
import { generateText } from "ai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") return res.status(405).end();

    try {
        const { lang, level, word, sentence } = req.body;

        const { text } = await generateText({
            model: xai.responses("grok-4.7"),
            prompt: `You are a tutor for a student that is learning ${lang} in the level of ${level}.
            he just got a word from his teacher that has the word in the langauge of ${lang} and its definition in english.
            The word and definition is this: ${word}.
            The student wrote a sentence in ${lang} that wants you to check if the word was used properly.
            The sentence is this: ${sentence}.
            If the word was used properly, please return "Sentence is good and understable" and nothing else.
            If the word was not used properly, please explain to the student on where they can improve their sentence.
            The explanation should be in english so the student can learn from there mistake.
            Another detail, dont give the student other options on how to improve their sentence.
            If you do that the student will just copy and paste your result and not learn from the improvements you told them to make.
            We are not looking for perfect ${lang} since the student is still learning ${lang}.`,
        });

        res.status(200).json({ aiResponse: text });
    } catch (e: any) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
}