import "../styles/main.css"
import Drilling from "../assets/477-4770692_transparent-study-icon-png-studying-clipart-black-and.png"
import Practice from "../assets/two-people-conversing-with-language-symbols-solid-icon-multilingual-communication-translation-and-language-exchange-silhouette-symbol-isolated-illustration-vector.jpg"
import "../styles/selection.css"
import {NavLink} from "react-router-dom";

function Selection() {
    return (
        <div className="main">
            <div className="selection_card">
                <h1>Selection</h1>

                {/*selection on 2 systems, drilling or practice*/}
                <div id="image_section">
                    <img src={Practice} alt="Practice" className="image"/>
                    <img src={Drilling} alt="Drilling" className="image"/>
                </div>

                <div className="button_section">
                    <NavLink to="/" className="button">Go Back</NavLink>
                </div>
            </div>
        </div>
    )
}
export default Selection;