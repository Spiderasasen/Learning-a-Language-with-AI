import {getWordDefinition, checkSentence} from './grok_drilling';
import * as readline from 'readline';

async function test() {
   //first esatblishes the readline interface
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    //gets the word from the first ai model
    const word: string = await getWordDefinition("German", "Intermediate");
    console.log("Your word is:", word);

    let aiResponse = "";

    //we are looping until the ai says the sentence is good and understable
    while (aiResponse !== "Sentence is good and understable") {

        //this allows the user to write a sentence
        const userSentence: string = await new Promise(resolve =>
            rl.question("Write a sentence: ", resolve)
        );

        //this is the ai checking if the sentence is good and understable
        aiResponse = await checkSentence("German", "Intermediate", word, userSentence);

        console.log("AI says:", aiResponse);
    }

    //when finished the loop, the readline interface is closed
    console.log("Loop finished!");
    rl.close();
}

test();