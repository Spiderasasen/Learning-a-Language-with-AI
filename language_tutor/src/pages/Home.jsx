import Drop_down_selection_component from "../componets/Drop_down_selection_component.jsx";
import {NavLink} from "react-router-dom";
import "../styles/home_page.css";
import "../styles/main.css";
import {useState} from "react";

function Home() {

    const [language, setLanguage] = useState("");
    const [level, setLevel] = useState("");

    return (
        <div className="main">
            <div className="home_card">
                <h1>Welcome to an Ai tutor</h1>

                {/*drop downs*/}
                <div>
                    {/*language selection*/}
                    <Drop_down_selection_component
                        id="language_selection"
                        null_option="Select a language"
                        option1="Spanish"
                        option2="German"
                        onChange={(e) => setLanguage(e.target.value)}
                    />

                    {/*level selection*/}
                    {language !== "" && (
                        <Drop_down_selection_component
                            id="level_selection"
                            null_option="Select a level"
                            option1="Beginner"
                            option2="Intermediate"
                            onChange={(e) => setLevel(e.target.value)}
                        />
                    )}
                </div>

                {/*going to another page*/}
                {((language !== "") && (level !== "")) && (
                    <div className="button_section">
                        <NavLink to="/selection" className="button">Next</NavLink>
                    </div>
                )}

            </div>
        </div>
    )
}
export default Home;