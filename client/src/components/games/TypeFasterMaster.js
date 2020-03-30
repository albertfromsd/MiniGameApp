import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import styles from './Games.module.css';

import NavBar from '../NavBar';

var randomWords = require('random-words');


const TypeFasterMaster = ({  socket, userName, roomName, userScore })  => {

    // generate random string at random setTimeouts at random places on the screen
    // each player gets a chance to type that single word the fastest
    // 1st, 2nd and 3rd get points accordingly

    const [string, setString] = useState("");
    const [difficulty, setDifficulty] = useState("")
    const [userInput, setUserInput ] = useState("");
    const [timer, setTimer] = useState("");
    const [totalTime, setTotalTime] = useState(0);
    const [message, setMessage] = useState("Go!");
    
   
    useEffect( () => {
        if(difficulty === ""){
            setMessage("❤ Please select your minigame level...❤");
        }
        console.log(userName +roomName);
        socket.emit('enteredTypeFaster', {
            userName,
            roomName,
            totalTime
         })

        //  if(totalTime > 0){
        //     socket.emit('total time',  totalTime);
        //  }
    }, [socket, totalTime]);


    const findResult = (event) =>{
        event.preventDefault();
        let now = new Date();
        let answerTime = (now.getHours()).toString() + (now.getMinutes()).toString() + (now.getSeconds()).toString();
        let totalTimeTaken = +answerTime - +timer;
        setTimer("");
        if(difficulty == "Genius"){
            if(userInput === string){
                setMessage(" 🏆🏆 You got it!..");
                setTotalTime(totalTimeTaken);
            }
        }
        else{
            if(userInput === string.join('')){
                setMessage(" 🏆🏆You got it!..");
                setTotalTime(totalTimeTaken);
            }
        } 
        setUserInput("");
    }


    const changeDifficulty = event =>{
        const {name, value} = event.target;
        setDifficulty(event.target.name);
        setMessage("Create and Play !!!")

    }

    const createTarget = event =>{
         let now = new Date();
         let questionTime = (now.getHours()).toString() + (now.getMinutes()).toString() + (now.getSeconds()).toString();
         setTimer(questionTime);
         setTotalTime(0);
            
        if(difficulty === "Easy"){
            setString(randomWords(3));
        }
        else if (difficulty == "Medium"){
            setString(randomWords(6));
        }
        else if(difficulty == "Hard"){
            setString(randomWords(9));
        }
        else if(difficulty == "Genius"){
            //join used to remove the comma between the words that is being created by randomWords()
            setString(Math.random().toString(36).substring(2, 20) + randomWords(4).join(''));
        }
    }

    const difficultyLevels = ["Easy", "Medium", "Hard", "Genius"]

    return (
        <>
        <NavBar />
        <div className={styles.entirePage}>
            <h3 className={styles.textWhite}> <i> {message} {userName}</i>  </h3>
           {
                totalTime > 0 
           ?  <p className={styles.textWhite}>Total Time taken: {totalTime} seconds</p>
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