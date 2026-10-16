import "../styles/main.css"
import "../styles/drilling.css"
import "../styles/loading.css"
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
    const [loadingWord, setLoadingWord] = useState(false);
    const [loadingResponse, setLoadingResponse] = useState(false);

    //getting the word from the ai
    async function getWord(){
        setLoadingWord(true);

        try{
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
        catch(err){
            console.log(err);
            setAiWord("Sever error");
        }
        finally{
            setLoadingWord(false);
        }

    }

    //getting the response from the ai from the users sentence
    async function getResponse(){
        setLoadingResponse(true);
        try{
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

            return response.aiResponse;
        }
        catch(err){
            console.log(err);
            setAiResponse("Sever error");
        }
        finally {
            setLoadingResponse(false);
        }
    }

    return (
        <div className="main drilling-wrapper">

            {/* HEADER */}
            <div className="drilling-header">
                <h1>Drilling Practice</h1>
                <p className="sub-info">{language} • {level}</p>
            </div>

            {/* MAIN CARD */}
            <div className="drilling-card">

                {/* AI WORD */}
                <div className="section">
                    <label className="section-label">EULIA Word</label>
                    {loadingWord ? (<div className="typing-loader">EULIA is getting your word<span className="dots"></span></div>)
                    : (
                            <textarea
                                className="section-box"
                                placeholder="EULIA's word will appear here"
                                value={aiWord}
                                readOnly
                            />
                        )}
                </div>

                {/* USER SENTENCE */}
                <div className="section">
                    <label className="section-label">Your Sentence</label>
                    <input
                        className="section-input"
                        type="text"
                        placeholder="Type your sentence here..."
                        value={userSentence}
                        onChange={(e) => setUserSentence(e.target.value)}
                    />
                </div>

                {/* BUTTONS */}
                <div className="button-row">
                    {startButton && (
                        <button
                            className="btn primary"
                            onClick={() => {
                                getWord();
                                setStartButton(false);
                                setSendButton(true);
                            }}
                        >
                            Start
                        </button>
                    )}

                    {sendButton && (
                        <>
                            <button
                                className="btn primary"
                                onClick={async () => {
                                    const response = await getResponse();
                                    if (response === "Sentence is good and understable") {
                                        setUserSentence("");
                                        await getWord();
                                    }
                                }}
                            >
                                Send
                            </button>

                            <button
                                className="btn danger"
                                onClick={() => {
                                    setStartButton(true);
                                    setSendButton(false);
                                    setAiWord("");
                                    setAiResponse("");
                                }}
                            >
                                Stop
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* AI SUMMARY */}
            <div className="summary-card">
                <label className="section-label">EULIA Summary</label>
                {loadingResponse ? (<div className="typing-loader">EULIA is thinking<span className="dots"></span></div>) : (
                    <textarea
                        className="section-box"
                        placeholder="EULIA's feedback will appear here"
                        value={aiResponse}
                        readOnly
                    />
                )}

                {startButton && (
                    <NavLink to="/selection" className="btn back-btn">
                        Go Back
                    </NavLink>
                )}
            </div>
        </div>
    )
}
export default Drilling;