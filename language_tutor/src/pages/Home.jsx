import Drop_down_selection_component from "../componets/Drop_down_selection_component.jsx";

function Home() {
    return (
        <div>
            <div id="home_card">
                <h1>Welcome to an Ai tutor</h1>

                {/*drop downs*/}
                <div>
                    <Drop_down_selection_component id="language_selection"
                                                   null_option="Select a language" option1="Spanish" option2="German"
                    />
                    <Drop_down_selection_component id="level_selection"
                                                   null_option="Select a level" option1="Beginner" option2="Intermediate"
                    />
                </div>

                {/*going to another page*/}
                <div className="button_section">
                    <button id="next_button">Next</button>
                </div>

            </div>
        </div>
    )
}
export default Home;