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
    const [ resultColor, setResultColor ] = useState("");

    // ANSWER TIMER
    const [ qCreatedAt, setQCreatedAt ] = useState("");
    const [ qAnsweredAt, setQAnsweredAt ] = useState("");
    const [ timeToAnswer, setTimeToAnswer ] = useState(null);

    // WINNER
    const [ winnerId, setWinnerId ] = useState(null);

    useEffect( () => {
        console.log(userName +roomName);
        console.log(gameName);
        socket.emit('enteredMathHead', {
            userName,
            roomName,
            gameName
         })
    }, [socket]);

    const changeDifficulty = e => {
        setDifficulty(e.target.value);
    }

    const createQuestion = e => {
        // Start timer
        console.log("-----------------")
        setQCreatedAt( new Date().getTime() );

        setResultMsg([]);
        setFormVisibility("visible");

        const getRandomInt = (maxNum, minNum) => {
            let num = Math.floor(Math.random() * (maxNum - minNum) + minNum );
            return num;
        }

        const generateOperands = (max, min) => {
            const num1 = getRandomInt(max, min);
            const num2 = getRandomInt(max, min);
            let result = (num1*num2);
            setQuestion(num1 + " × " + num2);
            setAnswer(result);
        } 

        // SET DIFFCULTY
        // how to access max/min values outside of scope of if statements
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
        generateOperands(max, min);
    }

    let timeDiff;

    const submitAnswer = e => {
        e.preventDefault();
        if (formAnswer == answer ) {

            // [TOP] Timer calculation not working
            setQAnsweredAt( new Date().getTime() );
            timeDiff = ( (qAnsweredAt - qCreatedAt )/1000000000000 );
            setTimeToAnswer( timeDiff );
            // [END] Timer calculation not working

            // [ SOCKET ] emit after answered correctly
            socket.emit("correctAnswer", 
                {
                    socket,
                    userName,
                    roomName
                }
            );

            setResultMsg(["Correct!",question+" does equal "+formAnswer+"!"]);
            setResultColor("green");

            setFormVisibility("hidden");


        } else {
            setResultMsg(["WROOONG!", question + " does not equal "+formAnswer+"!"]);
            setResultColor("red");
        }
        setFormAnswer("");
    }

    // [ SOCKET ] Set message after correct answer was submitted

    useEffect( () => {
        socket.on("questionAnswered", data => {
            setFormVisibility("hidden");
            let copyResultMsg = resultMsg;
            copyResultMsg.push(data.userName+" answered correctly");
            setResultMsg(
                copyResultMsg
            );
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
                    // let buttonStyle = (d == difficulty ? styles.activeBtn : styles.inactiveBtn );

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
                {timeToAnswer != null 
                    ? <p style={{color: resultColor}}>Answered in {timeToAnswer} seconds</p>
                    : <p></p>
                }
                
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