import "../styles/main.css"
import "../styles/practice.css"
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import {SelectionContext} from "../componets/SelectionContext.jsx";

function Practice() {
    const {language, level} = useContext(SelectionContext);

    return (
        <div className="main">
            {/*where the roleplay between the user and the ai will be*/}
            <div id="prcactice_card">
                <div className="card-title">
                    <h1>Practice</h1>
                    <h2>{language}: {level}</h2>
                    <h3>Roleplay Senicro: insert roleplay senciro here</h3>
                </div>
                <div id="ai_section">
                    <div id="ai_text">
                        <p>ai response goes here</p>
                    </div>
                    <div id="user_text">
                        <input type="text" placeholder="Type here"/>
                    </div>
                </div>
                <div className="card-footer">
                    <button>Send</button>
                    <button>End Practice</button>
                </div>
            </div>

            {/*the ai summary will be here*/}
            <div id="ai_summary">
                <div className="summary">
                    <h2>Summary</h2>
                    <p>ai summary goes here</p>
                </div>
                <div className="button_sectiont">
                    <NavLink to="/selection" className="button">Go Back</NavLink>
                </div>
            </div>
        </div>
    )
}
export default Practice;