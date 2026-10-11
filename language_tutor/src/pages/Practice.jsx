import "../styles/main.css"
import "../styles/practice.css"
import {NavLink} from "react-router-dom";
import {useContext, useState} from "react";
import {SelectionContext} from "../componets/SelectionContext.jsx";

function Practice() {
    const {language, level} = useContext(SelectionContext);
    const [started, setStarted] = useState(false);

    return (
        <div className="main">
            {/*card title*/}
            <div className="card-title">
                <h1>Roleplay</h1>
                <h2>{language}: {level}</h2>
                {/*<h2>Location: {location_role}</h2>*/}
            </div>

            {/*where the roleplay between the user and the ai will be*/}
            <div id="roleplay_card">
                <div className="user_input">
                    <label for="user_input">Your Input</label>
                    <input id="user_input" type="text" placeholder="Type here"/>
                </div>

                <div className="ai_response">
                    <label for="ai_response">EULIA Response</label>
                    <input id="ai_response" type="text" placeholder="EULIA response goes here" readOnly/>
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
                        <button id="send_button">Send</button>

                        <button
                            id="end_button"
                            onClick={() => setStarted(false)}
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