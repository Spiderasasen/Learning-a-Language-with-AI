// @ts-ignore
import express from 'express';
// @ts-ignore
import cors from 'cors';
import { sendRoleplayMessage, conversationHistory, clearConversationHistory}  from "./calude_rollplay";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/roleplay", async (req, res) => {
    const {message, lang, level, location} = req.body;

    //trying to call the api section
    try{
        const reply = await sendRoleplayMessage(message, lang, level, location); //getting the response from the api
        console.log("Replay worked: ", reply);
        const history = conversationHistory; //getting the history of the conversation
        console.log("History worked: ", history);
        res.json({reply, history});
    }
    //if there is an error, it will show the error
    catch(err){
        console.log(err);
        res.status(500).json({error: "Sever error"});
    }
});

app.post("/api/reset", (req, res) => {
    clearConversationHistory();
    res.json({ status: "cleared" });
});

//sending the server to the port 3001
app.listen(3001, () => {
    console.log("server is running on http://localhost:3001")
});

//making sure this works on vite by adding this
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST"],
    allowedHeaders: ["Content-Type"]
}));
