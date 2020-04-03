import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';

import styles from './Games.module.css';

import  CustomisedButton from '../CustomisedButton';

const MathHead = ({ socket, userName, roomName, userScore }) => {
    const gameName = "mathhead";
    // validation check to make sure username is not blank/null
    if (userName == null || userName.length < 1 ) {
        navigate('/');
    };

    // ELEMENT VISIBILITY
    const [ formVisibility, setFormVisibility ] = useState("hidden");
    const [ resultsVisibility, setResultsVisibility ] = useState("hidden");

    // CREATING QUESTION AND ANSWER
    const [ difficulty, setDifficulty ] = useState("Easy");
    const [ question, setQuestion ] = useState();
    const [ answer, setAnswer ] = useState();

    // POST ANSWER SUBMISSION
    const [ userInput, setUserInput ] = useState("");
    const [ resultMsg, setResultMsg ] = useState([]);
    const [ resultColor, setResultColor ] = useState("white");

    // ANSWER TIMER
    const [timer, setTimer] = useState("");
    const [totalTime, setTotalTime] = useState(0);


    useEffect( () => {
        socket.emit( 'mathHeadEntered', 
            {
                socketId: socket.id,
                userName,
                roomName,
                totalTime,
                "gameName": "mathhead", 
            }
        );

        socket.on("syncNewUser", data => {
            navigate("/"+roomName+"/"+data);
        });

        socket.on("sharedMathHeadTarget", data => {
            setFormVisibility("visible");
            setResultsVisibility("hidden");
            setQuestion(data.question);
            setAnswer(data.answer);
        });

        socket.on("answeredMathHeadTarget", data => {
            setFormVisibility("hidden");
            setResultsVisibility("visible");
            setResultMsg([
                data.userName+" beat you! ", 
                data.question+" equals "+data.answer+"!", "It took that player "+data.totalTimeTaken+" seconds to beat you!", 
                "You can get it next time!"]);
            setResultColor("orange");
        });

    }, [socket, roomName, userName, gameName, userScore]);
    
    // Change difficulty
    const difficultyLevels = ["Easy", "Medium", "Hard", "Genius"];
    const changeDifficulty = event => {
        setDifficulty(event.target.value);
    };

    // [ TOP ] Create question and use sockets to share with all players
    const createTarget = () => {
        // Start timer
        let now = new Date();
        let questionTime = now.getTime();
        setTimer(questionTime);
        setTotalTime(0);

        setResultMsg([]);
        setFormVisibility("visible");

        const operators = [ "+", "-", "×"];

        const getRandomInt = (maxNum, minNum) => {
            let num = Math.floor(Math.random() * (maxNum - minNum) + minNum );
            return num;
        }; // [END] subfunction getRandomInt

        const generateProblem = (max, min) => {
            const num1 = getRandomInt(max, min);
            const num2 = getRandomInt(max, min);
            const operator = operators[getRandomInt(3, 0)];
            let result;
            if (operator == "+") {
                result = num1+num2;
            };
            if (operator == "-") {
                result = num1-num2;
            };
            if (operator == "×") {
                result = num1*num2;
            };

            socket.emit("mathHeadTargetGenerated", 
                {
                    question: (num1+" "+operator+" "+num2),
                    answer: result
                });
        }; // [END] sub-function generateProblem

        // Question changes based on difficulty
        let max;
        let min;
        if (difficulty == "Easy") {
            max = 21;
            min = 2;
        };
        if (difficulty == "Medium") {
            max = 52;
            min = 3;
        };
        if (difficulty == "Hard") {
            max = 102;
            min = 11;
        };
        if (difficulty == "Genius") {
            max = 1002;
            min = 101;
        } else {
            setDifficulty("Easy");
        };
        generateProblem(max, min);
    };
    // [ END ] Create question and use sockets to share will players

    const findResult = (event) => {
        event.preventDefault();
        if ( userInput == answer ) {

            let now = new Date();
            let answerTime = now.getTime();
            let totalTimeTaken = (+answerTime - + timer)/1000;
            let points = 10-((+answerTime - + timer)/1000);

            console.log("points: "+points);
            setTimer("");

            setResultMsg([
                "🏆🏆 You got it! 🏆🏆",
                question+" does equal "+userInput+"!", 
                "It took you "+totalTimeTaken+" seconds",
                "You earned "+points+" points!"]);
            setResultColor("green");


            // RESET FORM
            setUserInput("");
            setFormVisibility("hidden");
            
            // [ SOCKET ] emit after answered correctly
            socket.emit("mathHeadTargetAnswered", 
                {
                    socketId: socket.id,
                    userName,
                    roomName,
                    question,
                    answer,
                    totalTimeTaken,
                    points
                }
            );
        // wrong answer submitted; set wrong msg and no emit
        } else {
            setResultMsg([
                "WRONG!", 
                question + " does not equal "+userInput+"!"]);
            setResultColor("red");
        };
        setUserInput("");
        setResultsVisibility("visible");
    }; // [END] of function findResult

    return(
        <>
        <div className={styles.entirePage}>
            <h2 className={styles.textWhite}>Math Head</h2>
                <br/>
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
                <br/>
            <div className={formVisibility == "hidden" 
                ? styles.hiddenForm 
                : styles.visibleForm}>
                    <p className={styles.textWhite}>{question}</p>
                        <br/>
                        <br/>
                        <br/>
                <form onSubmit={findResult}>
                    <input 
                        type="text"
                        placeholder="Enter you answer here"
                        value={userInput}
                        onChange={e=>setUserInput(e.target.value)}/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
                <br/>
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
    };
};

export default connect(mapStateToProps)(MathHead);