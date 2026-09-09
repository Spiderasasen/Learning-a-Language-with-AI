import "../styles/main.css"
import "../styles/drilling.css"
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import {SelectionContext} from "../componets/SelectionContext.jsx";

function Drilling() {
    const {language, level} = useContext(SelectionContext);

    return (
        <div className="main">
            <div id="drilling_card">
                <div className="card-title">
                    <h1>Drilling</h1>
                    <h2>{language}: {level}</h2>
                </div>
                <div id="drilling_content">
                    <h2>Word</h2>
                    <p>word defination in english goes here</p>
                </div>
                <div id="user_input">
                    <input type="text" placeholder="Type a sentince here"/>
                </div>
                <div className="card-footer">
                    <button>Send</button>
                </div>
            </div>
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
export default Drilling;