function UserInput({userInput, setUserInput}) {
    return(
        <>
            <label htmlFor="user_input">Your Input:</label>
            <textarea id="user_input"
                      type="text"
                      placeholder="Type here"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      maxLength={200}
            />
            <p>{userInput.length}/200</p>
        </>
    )
}
export default UserInput;