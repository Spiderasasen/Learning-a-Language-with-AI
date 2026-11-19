function UserInput() {
    return(
        <>
            <label htmlFor="user_input">Your Input:</label>
            <textarea id="user_input"
                      type="text"
                      placeholder="Type here"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
            />
        </>
    )
}
export default UserInput;