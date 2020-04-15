import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';

// [ COMPONENTS ]
import CountdownTimer from '../timer/CountdownTimer';

// [ STYLING ]
import styles from './Games.module.css';


const MathHead = ({ socket, userName, roomName }) => {
    const gameName = "mathhead";

    // ADMIN STATE BOOLEAN
    const [ adminState, setAdminState ] = useState(false);

    // ELEMENT VISIBILITY
    const [ formVisibility, setFormVisibility ] = useState("hidden");
    const [ resultsVisibility, setResultsVisibility ] = useState("hidden");

    // CREATING QUESTION AND ANSWER
    const [ difficulty, setDifficulty ] = useState("Medium");
    const [ question, setQuestion ] = useState();
    const [ answer, setAnswer ] = useState();

    // POST ANSWER SUBMISSION
    const [ userInput, setUserInput ] = useState("");
    const [ resultMsg, setResultMsg ] = useState([]);
    const [ resultColor, setResultColor ] = useState("white");

    // ANSWER TIMER
    const [ timerStart, setTimerStart ] = useState("");
    const [ totalTime, setTotalTime ] = useState(0);
    const [ timeAllowed, setTimeAllowed ] = useState(0);

    useEffect( () => {
        if( userName == null || 
            userName == undefined || 
            userName.length < 1 || 
            roomName == null || 
            roomName == undefined ||
            roomName.length < 1 ) {

            navigate('/');
        };

        socket.emit( 'mathHeadEntered', 
            {
                userName,
                roomName,
                gameName,
            }
        );

        socket.on("syncNewUser", data => {
            dispatchEvent({})
            navigate("/"+roomName+"/"+data);
        });

        socket.on("sharedMathHeadTarget", data => {
            setFormVisibility("hidden");
            setFormVisibility("visible");
            setResultsVisibility("hidden");
            setQuestion(data.question);
            setAnswer(data.answer);
            setTimerStart(data.createdAt);
            setTimeAllowed(data.timeAllowed);
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

    }, [socket, roomName, userName, gameName]);
    
    // Change difficulty
    const difficultyLevels = [ "Easy", "Medium", "Hard", "Genius" ];
    const changeDifficulty = event => {
        setDifficulty(event.target.value);
    };

    // [ TOP ] Create question and use sockets to share with all players
    const createTarget = (e) => {
        // Start timer
        let now = new Date();
        let questionTime = now.getTime();
        setTimerStart(questionTime);
        setTotalTime(0);

        setResultMsg([]);
        setFormVisibility("visible");

        const operators = [ "+", "-", "×"];

        const getRandomInt = (maxNum, minNum) => {
            let num = Math.floor(Math.random() * (maxNum - minNum) + minNum );
            return num;
        }; // [END] subfunction getRandomInt

        let max;
        let min;
        let maxOp;
        let minOp;
        const generateProblem = (max, min, maxOp, minOp) => {
            const num1 = getRandomInt(max, min);
            const num2 = getRandomInt(max, min);
            const operator = operators[getRandomInt(maxOp, minOp)];
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
                    answer: result,
                    createdAt: questionTime,
                    timeAllowed: 20000,
                });
        }; // [END] sub-function generateProblem

        // Question changes based on difficulty

        if ( difficulty == "Easy" ) {
            max = 21;
            min = 2;
            maxOp = 2;
            minOp = 0;
        };
        if ( difficulty == "Medium" ) {
            max = 52;
            min = 5;
            maxOp = 3;
            minOp = 0;
        };
        if ( difficulty == "Hard" ) {
            max = 102;
            min = 11;
            maxOp = 3;
            minOp = 0;
        };
        if ( difficulty == "Genius" ) {
            max = 1002;
            min = 11;
            maxOp = 3;
            minOp = 0;
        } else {
            setDifficulty("Easy");
        };
        generateProblem(max, min, maxOp, minOp);
    };
    // [ END ] Create question and use sockets to share will players

    const findResult = (event) => {
        event.preventDefault();

        if ( userInput == answer ) {
            // time and score
            let now = new Date();
            let answerTime = now.getTime();
            let totalTimeTaken = Math.round((+answerTime - + timerStart))/1000;
            let points = 20-totalTimeTaken;

            // if ( difficulty == "Easy") {
            //     points = 10-totalTimeTaken;
            // };
            // if ( difficulty == "Medium") {
            //     points = 15-totalTimeTaken;
            // };
            // if ( difficulty == "Hard") {
            //     points = 20-totalTimeTaken;
            // };
            // if ( difficulty == "Genius") {
            //     points = 40-totalTimeTaken;
            // };

            console.log("points: "+points);
            setTimerStart("");
            
            // results
            setResultMsg([
                "🏆🏆 You got it! 🏆🏆",
                question+" does equal "+userInput+"!", 
                "You scored "+points+" points!",
                "It took you "+totalTimeTaken+" seconds",]);
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
        <div className={styles.entirePage}>
        <h3 className={styles.textWhite}> <i> {userName} </i>  </h3>
            
                <br />
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
                    { formVisibility == "hidden"
                        ? <p> Countdown timer not yet activated </p>
                        : <CountdownTimer /> }
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
    );
};

function mapStateToProps(state) {
    return {
        userName: state.userName,
    };
};

export default connect(mapStateToProps)(MathHead);