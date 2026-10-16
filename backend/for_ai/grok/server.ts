import  express from 'express';
import cors from 'cors';
import {getWordDefinition, checkSentence} from './grok_drilling';

const app = express();
app.use(cors());
app.use(express.json());

//just getting the word from the AI model
app.post("/api/drilling", async (req, res) => {
    try {
        const { lang, level } = req.body;
        console.log("Received:", req.body);

        const word = await getWordDefinition(lang, level);
        console.log("Word:", word);

        res.json({ word });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//sending the server to port 3001
app.listen(3001, () => console.log("Server is running on port 3001"));

//making sure it works on vite
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST"],
    allowedHeaders: ["Content-Type"],
}))