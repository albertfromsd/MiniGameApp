import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';

// [ STYLING ]
import styles from './Games.module.css';

var randomWords = require('random-words');

const TypeFasterMaster = ({  socket, userName, roomName })  => {
    const gameName = "typefastermaster";

    // ADMIN STATE BOOLEAN
    const [ adminState, setAdminState ] = useState(false);

    // ELEMENT VISIBILITY
    const [ formVisibility, setFormVisibility ] = useState("hidden");
    const [ resultsVisibility, setResultsVisibility ] = useState("hidden");

    // CREATING QUESTION(string) AND ANSWER(userInput)
    const [ difficulty, setDifficulty ] = useState("Easy")
    const [ targetString, setTargetString ] = useState("");
    const [ userInput, setUserInput ] = useState("");

    // POST ANSWER SUBMISSION
    const [ resultMsg, setResultMsg ] = useState([]);
    const [ resultColor, setResultColor ] = useState("white");

    // ANSWER TIMER
    const [ timer, setTimer ] = useState("");
    const [ totalTime, setTotalTime ] = useState(0);
       
    // useEffect( () => {
        socket.emit('typeFasterEntered', 
            {
                socketId: socket.id,
                userName,
                roomName,
                totalTime,
                gameName,
            }
        );
    // }, [] );


    useEffect( () => {  
        if( userName == null || 
            userName.length < 1 || 
            userName == undefined || 
            roomName == null || 
            roomName.length < 1 || 
            roomName == undefined ) {
            navigate('/');
        };
        
        socket.on("syncNewUser", data => {
            navigate("/"+roomName+"/"+data);
        });

        socket.on("sharedTypeFasterTarget", data => {
            console.log("sharedTypeFasterTarget activated:"+data.target);
            setFormVisibility("visible");
            setResultsVisibility("hidden");
            setTargetString(data.target);
            setTimer(data.createdAt);
        });

        socket.on("answeredTypeFasterTarget", data => {
            console.log("Data from typeFaster client: "+data.userName);
            setFormVisibility("hidden");
            setResultsVisibility("visible");
            setResultMsg([
                data.userName+" wins! ", 
                "It took that player " +data.totalTimeTaken + " seconds.",
                "They scored "+data.points+" points!", 
                "You can get it next time!"]);
            setResultColor("orange");
        });
        
    }, [socket, roomName, userName, gameName]);

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

        let string;
        if ( difficulty === "Easy" ){
            string = randomWords(2);
        };
        if ( difficulty == "Medium" ){
            string = randomWords(4);
        };
        if ( difficulty == "Hard" ){
            string = randomWords(6);
        };
        if ( difficulty == "Genius" ){ // returning string.join is not a function when submitting answer for Genius problem
            //join used to remove the comma between the words that is being created by randomWords()
            string = Math.random().toString(36).substring(2, 20) + randomWords(4).join('');
            console.log("Genius string: "+string);
        };

        socket.emit("typeFasterTargetGenerated", 
        {
            target: string,
            createdAt: questionTime
        });
    };

    // Answer submission/confirmation
    const findResult = (event) =>{
        event.preventDefault();

        if ( difficulty == "Genius" && userInput == targetString ) {
            let now = new Date();
            let answerTime = now.getTime();(now.getSeconds()).toString();
            let totalTimeTaken = Math.round((+answerTime - + timer))/1000;
            let points = 40-((+answerTime - + timer)/1000);
            setTimer("");
    
            setResultMsg([
                "🏆🏆 You got it! Genius! 🏆🏆",
                "You scored "+points+" points!",
                "It took you "+totalTimeTaken+" seconds"]);
            setResultColor("green");

            //RESET FORM
            setUserInput("");
            setFormVisibility("hidden");

            socket.emit("typeFasterTargetAnswered", 
                {
                    socketId: socket.id,
                    userName,
                    roomName,
                    string: targetString,
                    totalTimeTaken,
                    points
                }
            );
        };
        
        if ( difficulty != "Genius" && userInput == targetString.join('') ){
            let now = new Date();
            let answerTime = now.getTime();
            let totalTimeTaken = Math.round((+answerTime - + timer))/1000;
            let points = 20-((+answerTime - + timer)/1000);
            setTimer("");
    
            setResultMsg([
                "🏆🏆 You got it! 🏆🏆",
                "You scored "+points+" points!",
                "It took you "+totalTimeTaken+" seconds"]);
            setResultColor("green");

            //RESET FORM
            setUserInput("");
            setFormVisibility("hidden");

            socket.emit("typeFasterTargetAnswered", 
                {
                    socketId: socket.id,
                    userName,
                    roomName,
                    string: targetString,
                    totalTimeTaken,
                    points
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

            <h3 className={styles.textWhite}> <i> {userName} </i>  </h3>

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
                    <p className={styles.textWhite}> {targetString} </p>
                        <br/>
                        <br/>
                        <br/>
                <form onSubmit = {findResult}>
                    <input 
                        type="text" 
                        placeholder="Type faster here"
                        value={userInput} 
                        onChange= {e => setUserInput(e.target.value)} 
                        onPaste = {e=> e.preventDefault()}
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
        userName: state.userName,
    };
};

export default connect(mapStateToProps)(TypeFasterMaster);