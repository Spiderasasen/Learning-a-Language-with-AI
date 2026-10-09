import { sendRoleplayMessage, conversationHistory } from "./calude_rollplay";

// async function test(message: string, lang: string, level: string, location: string) {
//     const reply = await sendRoleplayMessage(message, lang, level, location);
//     console.log("Claude:", reply);
// }

async function test() {
    console.log(await sendRoleplayMessage("start", "German", "Intermediate", "cafe"));
    console.log(await sendRoleplayMessage("Hallo guten Tag. Hast du Kaffee oder Tee?", "German", "Intermediate", "cafe"));
    console.log(await sendRoleplayMessage("Ich möchte Tee bitte.", "German", "Intermediate", "cafe"));
    console.log(conversationHistory);
}

test();