import { sendRoleplayMessage } from "./calude_rollplay";

async function test(message: string, lang: string, level: string, location: string) {
    const reply = await sendRoleplayMessage(message, lang, level, location);
    console.log("Claude:", reply);
}

test("Hallo guten Tag. Hast du Kaffee oder Tee?", "German", "Intermediate", "cafe");