import "../styles/main.css"
import "../styles/practice.css"
import "../styles/loading.css"
import {NavLink} from "react-router-dom";
import {useContext, useState, useRef} from "react";
import {SelectionContext} from "../componets/SelectionContext.jsx";
import locations from "../data/locations.json";

function Practice() {
    const {language, level} = useContext(SelectionContext);
    const [started, setStarted] = useState(false);
    const [loading, setLoading] = useState(false);

    //so the ai forgets its conversation history
    const historyRef = useRef([]);

    //api parts
    const [userInput, setUserInput] = useState("");
    const [aiResponse, setAiResponse] = useState("");
    const [location_role] = useState(
        () => locations[Math.floor(Math.random() * locations.length)]
    );

    //sending a message to the ai
    async function sendMessage(){
        //waiting for the api to respond
        setLoading(true);

        try{
            //before anything happens, the history of the conversation is cleared
            console.log("clearing history");

            const messageToSend = userInput.trim() === "" ? "start" : userInput; //this handels empty messages for the start button
            console.log("sendMessage fired, input:", userInput);

            const res = await fetch("/api/roleplay", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: messageToSend,
                    lang: language,
                    level: level,
                    location: location_role,
                    history: historyRef.current
                })
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Server ${res.status}: ${text}`);
            }

            console.log("Sending:", { userInput, language, level, location_role });

            const data = await res.json();
            historyRef.current = [
                ...historyRef.current,
                { role: "user", content: messageToSend },
                { role: "assistant", content: data.reply }
            ];
            console.log("Received:", data);

            //the ai got the message and responded
            setLoading(false);
            setAiResponse(data.reply);
        }
        catch(err){ //if there is an error, it will show the error
            console.log(err);
            setLoading(false);
            setAiResponse("Sever error");
        }
        finally{ //no matter what happens, the loading bar will stop
            setLoading(false);
        }
    }

    //checking if the user clicked the end button
    async function endConversation(){
        setLoading(true);

        try{
            const res = await fetch("/api/roleplay", {
                method: "POST",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify({
                    message: "end",
                    lang: language,
                    level: level,
                    location: location_role,
                    history: historyRef.current
                })
            });

            const data = await res.json();
            historyRef.current = [
                ...historyRef.current,
                { role: "user", content: "end" },
                { role: "assistant", content: data.reply }
            ];
            setLoading(false);
            setAiResponse(data.reply);
        }
        catch(err){
            console.log(err);
            setAiResponse("Sever error");
        }
        finally{
            setLoading(false);
        }

    }

    function clearConversationHistory() {
        historyRef.current = [];
    }


    return (
        <div className="main">
            {/*card title*/}
            <div className="card-title">
                <h1>Roleplay</h1>
                <h2>{language}: {level}</h2>
                <h2>Location: {location_role}</h2>
            </div>

            {/*where the roleplay between the user and the ai will be*/}
            <div id="roleplay_card">
                <div className="user_input">
                    <label htmlFor="user_input">Your Input</label>
                    <input id="user_input"
                           type="text"
                           placeholder="Type here"
                           value={userInput}
                           onChange={(e) => setUserInput(e.target.value)}
                    />
                </div>

                {/*ai response area*/}
                <div className="ai_response">
                    <label htmlFor="ai_response">EULIA Response</label>

                    {loading ? (
                        <div className="typing-loader">EULIA is thinking<span className="dots"></span></div>
                    ) : (
                        <textarea
                            id="ai_response"
                            placeholder="EULIA response goes here"
                            value={aiResponse}
                            readOnly
                        />
                    )}
                </div>

            </div>

            {/*buttons that will be used for roleplay*/}
            <div className="button_section">
                {/*checking if the user clicked the start button*/}
                {!started && (
                    <>
                        <button id="start_button"
                        onClick = {async () => {
                            setStarted(true);
                            clearConversationHistory();
                            await sendMessage();
                            setUserInput("");
                        }}>
                            Start
                        </button>
                        {/*the only button that is called NavLink*/}
                        <NavLink to="/selection" className="button" >Go Back</NavLink>
                    </>
                )}

                {/*only shows when the user clicked the start button*/}
                {started && (
                    <>
                        <button id="send_button"
                        onClick={async () => {
                            await sendMessage();
                            setUserInput("");
                        }}
                        >Send</button>

                        <button
                            id="end_button"
                            onClick={async () => {
                                setStarted(false);
                                await endConversation();
                                setUserInput("");
                            }}
                        >

                            End the conversation
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
export default Practice;