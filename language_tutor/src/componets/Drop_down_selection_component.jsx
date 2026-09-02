function Drop_down_selection_component({id, null_option, option1, option2}){
    return(
        <div className="drop_down_section">
            <select id={id}>
                <option value="">{null_option}</option>
                <option value={option1}>{option1}</option>
                <option value={option2}>{option2}</option>
            </select>
        </div>
    )
}
export default Drop_down_selection_component;