import { xai } from '@ai-sdk/xai';
import { generateText } from 'ai';
import 'dotenv/config';

(async () => {
    const { text } = await generateText({
        model: xai.responses('grok-4.7'),
        prompt: 'Fix this function and explain the bug: function median(a){a.sort();return a[a.length/2]}',
    });

    console.log(text);
})();