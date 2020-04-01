import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';

import styles from './Games.module.css';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import NavBar from '../NavBar';

var randomWords = require('random-words');


const TypeFasterMaster = ({  socket, userName, roomName, userScore })  => {

    // validation check to make sure username is not blank/null
    if (userName == null || userName.length < 1 ) {
        navigate('/')
    };

    // generate random string at random setTimeouts at random places on the screen
    // each player gets a chance to type that single word the fastest
    // 1st, 2nd and 3rd get points accordingly

    // FORM VISIBILITY
    const [ formVisibility, setFormVisibility ] = useState("hidden");

    // CREATING QUESTION(string) AND ANSWER(userInput)
    const [ string, setString ] = useState("");
    const [ difficulty, setDifficulty ] = useState("Easy")
    const [ userInput, setUserInput ] = useState("");

    // ANSWER TIMER
    const [ timer, setTimer ] = useState("");
    const [ totalTime, setTotalTime ] = useState(0);

    const [ message, setMessage ] = useState("");
    const [ resultMsg, setResultMsg ] = useState([]);

   
    useEffect( () => {
        socket.emit('enteredTypeFaster', {
            userName,
            roomName,
            totalTime,
            gameName : "TypeFasterMaster"
        });

        socket.on("typeFasterQuestionShared", data => {
            setFormVisibility("visible");
            setString(data.question);
        });

        socket.on("questionAnswered", data => {
            console.log("Data from typeFaster client: "+data.userName);
            setFormVisibility("hidden");
            setResultMsg([data.userName+" answered correctly!" + " Try one more shot!"]);
        });

        // socket.on('message', function(data) {
        //     console.log('Incoming message:', data);
        //  });
        
    }, [socket]);

    // Difficulty
    const difficultyLevels = ["Easy", "Medium", "Hard", "Genius"];
    const changeDifficulty = event =>{
        const {name, value} = event.target;
        setDifficulty(event.target.name);
    };

    // Create Target String
    const createTarget = event =>{
        //For knowing question generated time
        let now = new Date();
        let questionTime = now.getTime();
        setTimer(questionTime);
        setTotalTime(0);

        let targetString;
        if(difficulty === "Easy"){
            targetString = randomWords(3);
        };
        if (difficulty == "Medium"){
            targetString = randomWords(6);
        };
        if(difficulty == "Hard"){
            targetString = randomWords(9);
        };
        if(difficulty == "Genius"){
            //join used to remove the comma between the words that is being created by randomWords()
            targetString = Math.random().toString(36).substring(2, 20) + randomWords(4).join('');
        } else {
            setDifficulty("Easy");
        };
        socket.emit("typeFasterQuestionGenerated", 
        {
            question: targetString,
        });
    }

    // Answer submission/confirmation
    const findResult = (event) =>{
        event.preventDefault();

        let now = new Date();
        let answerTime = now.getTime();(now.getSeconds()).toString();
        let totalTimeTaken = (+answerTime - + timer)/1000;
        setTimer("");

        if(difficulty == "Genius"){
            if(userInput === string){
                setMessage(" 🏆🏆 You got it!..");
                setTotalTime(totalTimeTaken);
            };
        } else {
            if(userInput === string.join('')){
                setMessage(" 🏆🏆You got it!..");
                setTotalTime(totalTimeTaken);
            };
        }; 

        //RESET FORM
        setUserInput("");
        setFormVisibility("hidden");

        // [ SOCKET ] emit after answered correctly
        socket.emit("correctAnswer", 
        {
            userName,
            roomName,
            totalTime
        });
    };

    return (
        <>
        <div style={{'backgroundColor' : 'white'}} className={styles.entirePage}>
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

            <div>
                {difficultyLevels.map( (d, i) => (
                    // let buttonStyle = (d == difficulty ? styles.activeBtn : styles.inactiveBtn );
                    <button 
                    onClick={changeDifficulty} 
                    key={i} 
                    name={d} 
                    value={d} 
                    className={(d == difficulty ? styles.activeBtn : styles.inactiveBtn)}>
                        {d}
                </button>
            ))}
            </div>
            <br/>
            <button onClick={createTarget} className={styles.createBtn}>{"Create " + difficulty + " Problem"}</button>
            
            <div className={formVisibility == "hidden" 
                ? styles.hiddenForm 
                : styles.visibleForm}>
                    <p style={{color: 'white'}}> {string} </p>
            <form onSubmit = {e => findResult(e)}>
                <input 
                type="text" 
                value={userInput} 
                onChange= {e => setUserInput(e.target.value)} 
                // onPaste = {e=> e.preventDefault()}
                />
                <button name="submitButton" style={{backgroundColor: 'pink'}} type="submit">Go!</button>
                </form>  
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