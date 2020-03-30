import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import styles from './Games.module.css';

import NavBar from '../NavBar';

const MathHead = ({ socket, userName, roomName, gameName, userScore }) => {
    // FORM VISIBILITY
    const [ formVisibility, setFormVisibility ] = useState("hidden");

    // CREATING QUESTION AND ANSWER
    const [ difficulty, setDifficulty ] = useState("Easy");
    const [ question, setQuestion ] = useState();
    const [ answer, setAnswer ] = useState();

    // POST ANSWER SUBMISSION
    const [ formAnswer, setFormAnswer ] = useState("");
    const [ resultMsg, setResultMsg ] = useState([]);
    const [ resultColor, setResultColor ] = useState("white");

    // ANSWER TIMER
    const [timer, setTimer] = useState("");
    const [totalTime, setTotalTime] = useState(0);

    // WINNER
    const [ winnerId, setWinnerId ] = useState(null);

    useEffect( () => {
        console.log(userName +roomName);
        socket.emit('enteredMathHead', {
            userName,
            roomName,
            totalTime,
            gameName: "Math Head"
         });

         socket.on("mathHeadQuestionShared", data => {
            setFormVisibility("visible");
            setQuestion(data.question);
            setAnswer(data.answer);
        });
    }, [socket, totalTime]);

    const changeDifficulty = e => {
        setDifficulty(e.target.value);
    }

    // [ TOP ] Create question in client and use sockets to share with all players
    const createQuestion = e => {
        // Start timer
        let now = new Date();
        let questionTime = (now.getHours()).toString() + (now.getMinutes()).toString() + (now.getSeconds()).toString();
        setTimer(questionTime);
        setTotalTime(0);

        // setQCreatedAt( new Date().getTime() );

        setResultMsg([]);
        setFormVisibility("visible");

        const operators = [ "+", "-", "×"];

        const getRandomInt = (maxNum, minNum) => {
            let num = Math.floor(Math.random() * (maxNum - minNum) + minNum );
            return num;
        }; // [END] function getRandomInt

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

            socket.emit("mathHeadQuestionGenerated", 
                {
                    question: (num1+" "+operator+" "+num2),
                    answer: result
                });
        } // [END] sub-function generateProblem

        // Question changes based on difficulty
        let max;
        let min;
        if (difficulty == "Easy") {
            max = 15;
            min = 2;
        }
        if (difficulty == "Medium") {
            max = 50;
            min = 3;
        }
        if (difficulty == "Hard") {
            max = 100;
            min = 11;
        }
        if (difficulty == "Genius") {
            max = 1000;
            min = 101;
        } 
        generateProblem(max, min);
    }
    // Display/set question and answer after creation
    // useEffect( () => {
    // }, [socket, question]);
    // [ END ] Create question and use sockets to share will players


    let totalTimeTaken;

    const submitAnswer = e => {
        e.preventDefault();
        if (formAnswer == answer ) {

            // [TOP] Timer calculation not working
            let now = new Date();
            let answerTime = (now.getHours()).toString() + (now.getMinutes()).toString() + (now.getSeconds()).toString();
            let totalTimeTaken = +answerTime - +timer;
            setTimer("");
            // [END] Timer calculation not working

            setResultMsg(["You are correct!",question+" does equal "+formAnswer+"!", "It took you "+totalTimeTaken+" seconds"]);
            setResultColor("green");

            // RESET FORM
            setFormAnswer("");
            setFormVisibility("hidden");

            // [ SOCKET ] emit after answered correctly
            socket.emit("correctAnswer", 
                {
                    userName,
                    roomName,
                    totalTimeTaken
                }
            );
        // wrong answer submitted; set wrong msg and no emit
        } else {
            setResultMsg(["WROOONG!", question + " does not equal "+formAnswer+"!"]);
            setResultColor("red");
            setFormAnswer("");
        };
    }; // [END] of function submitAnswer

    // [ SOCKET ] Set message after opponent answers correctly
    useEffect( () => {
        socket.on("questionAnswered", data => {
            console.log("Data from mathHead client: "+data);
            setFormVisibility("hidden");
            if (data.userName != userName) {
                setResultMsg([data.userName+" answered correctly!", "It took "+data.totalTimeTaken+" seconds"]);
                setResultColor("orange");
            }
            
        });
    }, [socket]);

    // [BUTTONS]
    const difficultyLevels = ["Easy", "Medium", "Hard", "Genius"]

    return(
        <>
        <NavBar roomName={roomName} />
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

            <button onClick={createQuestion} className={styles.createBtn}>{"Create " + difficulty + " Problem"}</button>
            <br/>

                {resultMsg.length > 0 && resultMsg.map( (msg, i) => 
                    <>
                    <p style={{color: resultColor}} key={i}>{msg}</p>
                        <br/>
                    </>
                )}
                {/* {timeToAnswer != null 
                    ? <p style={{color: resultColor}}>Answered in {timeToAnswer} seconds</p>
                    : <p></p>
                } */}
                
            <br/>
            <div className={formVisibility == "hidden" 
                ? styles.hiddenForm 
                : styles.visibleForm}>
                <p className={styles.textWhite}>{question}</p>
                    <br/>
                    <br/>
                    <br/>
                <form onSubmit={submitAnswer}>
                    <input 
                        type="text"
                        placeholder="Enter you answer here"
                        value={formAnswer}
                        onChange={e=>setFormAnswer(e.target.value)}/>
                    <input type="submit" value="Submit your answer"/>
                </form>
            </div>
        </div>
        </>
    )
};

function mapStateToProps(state) {
    return {
        socket: state.socket,
        userName: state.userName,
        userScore: state.userScore
    };
};

export default connect(mapStateToProps)(MathHead);