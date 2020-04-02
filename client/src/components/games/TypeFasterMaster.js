import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';

import styles from './Games.module.css';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

var randomWords = require('random-words');


const TypeFasterMaster = ({  socket, userName, roomName, userScore })  => {

    // validation check to make sure username is not blank/null
    if (userName == null || userName.length < 1 ) {
        navigate('/')
    };

    // generate random string at random setTimeouts at random places on the screen
    // each player gets a chance to type that single word the fastest
    // 1st, 2nd and 3rd get points accordingly

    // ELEMENT VISIBILITY
    const [ formVisibility, setFormVisibility ] = useState("hidden");
    const [ resultsVisibility, setResultsVisibility ] = useState("hidden");

    // CREATING QUESTION(string) AND ANSWER(userInput)
    const [ difficulty, setDifficulty ] = useState("Easy")
    const [ string, setString ] = useState("");
    const [ userInput, setUserInput ] = useState("");

    // POST ANSWER SUBMISSION
    const [ message, setMessage ] = useState("");
    const [ resultMsg, setResultMsg ] = useState([]);
    const [ resultColor, setResultColor ] = useState("white");

    // ANSWER TIMER
    const [ timer, setTimer ] = useState("");
    const [ totalTime, setTotalTime ] = useState(0);

    useEffect( () => {
        socket.emit('typeFasterEntered', {
            userName,
            roomName,
            totalTime,
            gameName : "typefastermaster"
        });

        socket.on("sharedTypeFasterTarget", data => {
            setFormVisibility("visible");
            setResultsVisibility("hidden");
            setString(data.question);
        });

        socket.on("answeredTypeFasterTarget", data => {
            console.log("Data from typeFaster client: "+data.userName);
            setFormVisibility("hidden");
            setResultsVisibility("visible");
            if (data.userName != userName) {
                setResultMsg([
                    data.userName+" wins! ", 
                    data.question+" equals "+data.answer+"!", "It took that player "+data.totalTimeTaken+" seconds to beat you!", 
                    "You can get it next time!"]);
                setResultColor("orange");
            }
        });
        
    }, [socket, roomName]);

    // Set difficulty
    const difficultyLevels = ["Easy", "Medium", "Hard", "Genius"];
    const changeDifficulty = event =>{
        setDifficulty(event.target.value);
    };

    // Create Target String
    const createTarget = () => {

        let now = new Date();
        let questionTime = now.getTime();
        setTimer(questionTime);
        setTotalTime(0);

        setResultMsg([]);
        setFormVisibility("visible");

        let targetString;
        if (difficulty === "Easy"){
            targetString = randomWords(3);
        };
        if (difficulty == "Medium"){
            targetString = randomWords(6);
        };
        if (difficulty == "Hard"){
            targetString = randomWords(9);
        };
        if (difficulty == "Genius"){
            //join used to remove the comma between the words that is being created by randomWords()
            targetString = Math.random().toString(36).substring(2, 20) + randomWords(4).join('');
        } else {
            setDifficulty("Easy");
        };

        socket.emit("typeFasterTargetGenerated", 
        {
            question: targetString,
        });
    }

    // Answer submission/confirmation
    const findResult = (event) =>{
        event.preventDefault();

        if ( userInput == string.join('') ) {
            let now = new Date();
            let answerTime = now.getTime();(now.getSeconds()).toString();
            let totalTimeTaken = (+answerTime - + timer)/1000;
            setTimer("");
    
            setResultMsg([
                "🏆🏆 You got it! 🏆🏆",
                "It took you "+totalTimeTaken+" seconds"]);
            setResultColor("green");

            //RESET FORM
            setUserInput("");
            setFormVisibility("hidden");
        }
        // Later try to refactor into less lines; too many repeated lines
        if ( difficulty == "Genius" && userInput === string ){
            let now = new Date();
            let answerTime = now.getTime();;
            let totalTimeTaken = (+answerTime - + timer)/1000;
            setTimer("");

            setResultMsg([
                "🏆🏆 You got it! Genius!! 🏆🏆",
                "It took you "+totalTimeTaken+" seconds"]);
            setResultColor("green");

            socket.emit("typeFasterTargetAnswered", 
                {
                    socketId: socket.id,
                    userName,
                    roomName,
                    string,
                    totalTimeTaken
                }
            );
        };
        if ( difficulty != "Genius" && userInput === string.join('') ){
            let now = new Date();
            let answerTime = now.getTime();
            let totalTimeTaken = (+answerTime - + timer)/1000;
            setTimer("");
    
            setResultMsg([
                "🏆🏆 You got it! 🏆🏆",
                "It took you "+totalTimeTaken+" seconds"]);
            setResultColor("green");

            socket.emit("typeFasterTargetAnswered", 
                {
                    socketId: socket.id,
                    userName,
                    roomName,
                    string,
                    totalTimeTaken
                }
            );
        } else {
            setResultMsg([
                "WRONG!", 
                "You had a typo in there!"
            ]);
            setResultColor("red");
        };
        setUserInput("");
        setResultsVisibility("visible");
    }; // [END] of function findResult

    return (
        <>
        <div className={styles.entirePage}>
            <FormControl variant="outlined">
                <InputLabel htmlFor="component-outlined">Name</InputLabel>
                <OutlinedInput id="component-outlined" label="Name" />
            </FormControl>
            <p className={styles.textWhite}>{resultMsg}</p>
            <h3 className={styles.textWhite}> <i> {message} {userName}</i>  </h3>
            {
            totalTime > 0 
            ? <p className={styles.textWhite}>Total Time taken: {totalTime} seconds</p>
            : <p></p>
            }
            <br/>
            <h2  className={styles.textWhite}>Type Faster Master</h2>
                <br />
            <div>
                {difficultyLevels.map( (d, i) => {

                    return (
                        <button 
                            onClick={changeDifficulty} 
                            key={i} 
                            name={d} 
                            value={d} 
                            className={(d == difficulty ? styles.activeBtn : styles.inactiveBtn)}>
                            {d}
                        </button>
                    )
                })}
            </div>
                <br/>

            <button onClick={createTarget} className={styles.createBtn}>{"Create " + difficulty + " Problem"}</button>
                <br />
            <div className={formVisibility == "hidden" 
                ? styles.hiddenForm 
                : styles.visibleForm}>
                    <p className={styles.textWhite}> {string} </p>
                        <br/>
                        <br/>
                        <br/>
                <form onSubmit = {findResult}>
                    <input 
                        type="text" 
                        placeholder="Type faster here"
                        value={userInput} 
                        onChange= {e => setUserInput(e.target.value)} 
                        // onPaste = {e=> e.preventDefault()}
                        />
                    <button name="submitButton" style={{backgroundColor: 'pink'}} type="submit">Go!</button>
                </form>  
            </div>
                <br />
            <div className={resultsVisibility == "hidden" 
                ? styles.hiddenForm 
                : styles.visibleForm}>
                {resultMsg.length > 0 && resultMsg.map( (msg, i) => 
                    <>
                    <p style={{color: resultColor}} key={i}>{msg}</p>
                        <br/>
                    </>
                )}
            </div>
        </div>
        </>
    );
};

function mapStateToProps(state) {
    return {
        socket: state.socket,
        userName: state.userName,
        userScore: state.userScore
    };
};

export default connect(mapStateToProps)(TypeFasterMaster);