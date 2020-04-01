import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import styles from './Games.module.css';

import NavBar from '../NavBar';
import { navigate } from '@reach/router';

const MathHead = ({ socket, userName, roomName, gameName, userScore }) => {

    if (userName == null || userName.length < 1 ) {
        navigate('/')
    };

    // ELEMENT VISIBILITY
    const [ formVisibility, setFormVisibility ] = useState("hidden");
    const [ resultsVisibility, setResultsVisibility ] = useState("hidden");

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


    useEffect( () => {
        socket.emit('enteredMathHead', {
            userName,
            roomName,
            totalTime,
            gameName: "Math Head"
         });

         socket.on("mathHeadTargetShared", data => {
            setFormVisibility("visible");
            setResultsVisibility("hidden");
            setQuestion(data.question);
            setAnswer(data.answer);
        });
    }, [socket, roomName]);

    const changeDifficulty = e => {
        setDifficulty(e.target.value);
    }

    // [ TOP ] Create question and use sockets to share with all players
    const createQuestion = e => {
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
        } // [END] sub-function generateProblem

        // Question changes based on difficulty
        let max;
        let min;
        if (difficulty == "Easy") {
            max = 21;
            min = 2;
        }
        if (difficulty == "Medium") {
            max = 52;
            min = 3;
        }
        if (difficulty == "Hard") {
            max = 102;
            min = 11;
        }
        if (difficulty == "Genius") {
            max = 1002;
            min = 101;
        } 
        generateProblem(max, min);
    }
    // [ END ] Create question and use sockets to share will players

    const submitAnswer = e => {
        e.preventDefault();
        if (formAnswer == answer ) {

            let now = new Date();
            // let answerTime = ((now.getHours()).toString() + (now.getMinutes()).toString() + (now.getSeconds()).toString() + (now.getMilliseconds()).toString())/1000;
            let answerTime = now.getTime();
            let totalTimeTaken = (+answerTime - + timer)/1000;
            setTimer("");

            setResultMsg([
                "You are correct!",
                question+" does equal "+formAnswer+"!", 
                "It took you "+totalTimeTaken+" seconds"]);
            setResultColor("green");

            // RESET FORM
            setFormVisibility("hidden");
            
            // [ SOCKET ] emit after answered correctly
            socket.emit("correctAnswer", 
                {
                    socketId: socket.id,
                    userName,
                    roomName,
                    question,
                    answer,
                    totalTimeTaken
                }
            );
        // wrong answer submitted; set wrong msg and no emit
        } else {
            setResultMsg(["WROOONG!", question + " does not equal "+formAnswer+"!"]);
            setResultColor("red");
        };
        setFormAnswer("");
        setResultsVisibility("visible");
    }; // [END] of function submitAnswer

    // [ SOCKET ] Set message after opponent answers correctly
    useEffect( () => {
        socket.on("targetAnswered", data => {
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

    // [BUTTONS]
    const difficultyLevels = ["Easy", "Medium", "Hard", "Genius"]

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

            <button onClick={createQuestion} className={styles.createBtn}>{"Create " + difficulty + " Problem"}</button>
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
    )
};

function mapStateToProps(state) {
    return {
        socket: state.socket,
        userName: state.userName,
        userScore: state.userScore,
    };
};

export default connect(mapStateToProps)(MathHead);