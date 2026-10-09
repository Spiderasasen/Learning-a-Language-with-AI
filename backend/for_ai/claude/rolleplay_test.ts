import { sendRoleplayMessage } from "./calude_rollplay";

async function test() {
    const reply = await sendRoleplayMessage("Hola, quiero practicar español contigo.");
    console.log("Claude:", reply);
}

test();