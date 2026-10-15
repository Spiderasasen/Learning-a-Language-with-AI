import { xai } from '@ai-sdk/xai';
import { generateText } from 'ai';
import 'dotenv/config';

//getting the generated word and its defenition
export async function getWordDefinition(lang: string, level: string) {
    try{
        const { text } = await generateText({
            model: xai.responses('grok-4.7'),
            prompt: `Your task is to generate a word in the langauge of ${lang} but in the level of a student learning ${lang} in the level of ${level}.
        you must return the word in ${lang} and its definition in english.`,
        });

        return text;
    }
    catch(e){
        console.log(e);
        return "error";
    }
}

//getting the sentince of the user and checking if the word was used properly in the snetince
export async function checkSentence(lang: string, level: string,aiGenerateedWord: string, userSentence: string){
    try{
        const { text } = await generateText({
            model: xai.responses('grok-4.7'),
            prompt: `You are a tutor for a student that is learning ${lang} in the level of ${level}.
            he just got a word from his teacher that has the word in the langauge of ${lang} and its definition in english.
            The word and definition is this: ${aiGenerateedWord}.
            The student wrote a sentence in ${lang} that wants you to check if the word was used properly.
            The sentence is this: ${userSentence}.
            If the word was used properly, please return "Sentence is good and understable" and nothing else.
            If the word was not used properly, please explain to the student on where they can improve their sentence.
            The explanation should be in english so the student can learn from there mistake.
            Another detail, dont give the student other options on how to improve their sentence.
            If you do that the student will just copy and paste your result and not learn from the improvements you told them to make.
            We are not looking for perfect ${lang} since the student is still learning ${lang}.`
        });

        return text;
    }
    catch(e){
        console.log(e);
        return "error"
    }
}