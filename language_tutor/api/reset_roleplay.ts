import { clearConversationHistory } from "../../backend/for_ai/claude/calude_rollplay";

export default function handler(req, res) {
    clearConversationHistory();
    return res.status(200).json({ status: "cleared" });
}
