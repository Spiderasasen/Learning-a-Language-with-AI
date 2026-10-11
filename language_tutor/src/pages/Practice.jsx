import "../styles/main.css"
import "../styles/practice.css"
import {NavLink} from "react-router-dom";
import {useContext, useState} from "react";
import {SelectionContext} from "../componets/SelectionContext.jsx";

/*TODO:
* Fixing the frontend:
* Where when the user clicks the start button, the ai should responsd
* when the user clicks on there input box, the contents of the box get deleted
* when the user clicks on the end button, the conversation should end and display the summary report made by the ai
* make a data set for the locations to make it feel more realistic
* IMPORTANT:
* make the ai fill there response box and not just display it all in one line
* */

function Practice() {
    const {language, level} = useContext(SelectionContext);
    const [started, setStarted] = useState(false);

    //api parts
    const [userInput, setUserInput] = useState("");
    const [aiResponse, setAiResponse] = useState("");
    const location_role = "cafe";

    //sending a message to the ai
    async function sendMessage(){
        const res = await fetch("http://localhost:3001/api/roleplay", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: userInput,
                lang: language,
                level: level,
                location: location_role
            })
        });

        console.log("Sending:", { userInput, language, level, location_role });

        const data = await res.json();
        console.log("Received:", data);

        setAiResponse(data.replay);
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
                    <label for="user_input">Your Input</label>
                    <input id="user_input"
                           type="text"
                           placeholder="Type here"
                           value={userInput}
                           onChange={(e) => setUserInput(e.target.value)}
                            />
                </div>

                <div className="ai_response">
                    <label for="ai_response">EULIA Response</label>
                    <input id="ai_response"
                           type="text"
                           placeholder="EULIA response goes here"
                           value={aiResponse}
                           readOnly/>
                </div>
            </div>

            {/*buttons that will be used for roleplay*/}
            <div className="button_section">
                {/*checking if the user clicked the start button*/}
                {!started && (
                    <>
                        <button id="start_button" onClick={() => setStarted(true)}>
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
                        onClick={sendMessage}
                        >Send</button>

                        <button
                            id="end_button"
                            onClick={() => {
                                setStarted(false);
                                setAiResponse("");
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