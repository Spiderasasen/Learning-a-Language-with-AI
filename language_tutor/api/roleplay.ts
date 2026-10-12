import { sendRoleplayMessage } from "../../backend/for_ai/claude/calude_rollplay";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { message, lang, level, location } = req.body;

    try {
        const reply = await sendRoleplayMessage(message, lang, level, location);
        return res.status(200).json({ reply });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}
