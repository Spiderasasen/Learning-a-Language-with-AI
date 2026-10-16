import "../styles/main.css"
import "../styles/drilling.css"
import {NavLink} from "react-router-dom";
import {useContext, useState} from "react";
import {SelectionContext} from "../componets/SelectionContext.jsx";

function Drilling() {
    const {language, level} = useContext(SelectionContext);

    //use states for the website
    const [aiWord, setAiWord] = useState("");
    const [sendButton, setSendButton] = useState(false);
    const [startButton, setStartButton] = useState(true);
    const [userSentence, setUserSentence] = useState("");
    const [aiResponse, setAiResponse] = useState("");

    //getting the word from the ai
    async function getWord(){
        const res = await fetch("http://localhost:3001/api/drilling", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                lang: language,
                level: level
            })
        });

        const data = await res.json();
        setAiWord(data.word);
    }

    //getting the response from the ai from the users sentence
    async function getResponse(){
        const res = await fetch("http://localhost:3001/api/checkSentence", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(
                {
                    lang: language,
                    level: level,
                    word: aiWord,
                    sentence: userSentence
                }
            )
        });

        const response = await res.json();
        setAiResponse(response.aiResponse);
    }

    return (
        <div className="main">
            <div id="drilling_card">
                    <div className="card-title">
                        <h1>Drilling</h1>
                        <h2>{language}: {level}</h2>
                    </div>
                    <div id="drilling_content">
                        <textarea placeholder="EULIA's word goes here"
                                  value={aiWord}
                                  readOnly/>
                    </div>
                    <div id="user_input">
                        <input
                            type="text"
                            placeholder="Type a sentence here"
                            value={userSentence}
                            onChange={(e) => setUserSentence(e.target.value)}
                        />
                    </div>
                    <div className="card-footer">

                        {/* START BUTTON */}
                        {startButton && (
                            <button
                                onClick={() => {
                                    getWord();
                                    setStartButton(false);
                                    setSendButton(true);
                                }}
                            >
                                Start
                            </button>
                        )}

                        {/* SEND BUTTON */}
                        {sendButton && (
                            <button
                                onClick={getResponse}
                            >
                                Send
                            </button>
                        )}

                        {/* STOP BUTTON */}
                        {sendButton && (
                            <button
                                onClick={() => {
                                    setStartButton(true);
                                    setSendButton(false);
                                    setAiWord(""); // optional: clear the word
                                }}
                            >
                                Stop
                            </button>
                        )}
                </div>
                <div id="ai_summary">
                    <div className="summary">
                        <textarea placeholder={"EULIA's response goes here"}
                                  value={aiResponse}
                                  readOnly />
                    </div>
                    <div className="button_sectiont">
                        <NavLink to="/selection" className="button">Go Back</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Drilling;