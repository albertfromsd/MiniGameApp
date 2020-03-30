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
    const [message, setMessage] = useState("Go!");
    
   
    useEffect( () => {
        setDifficulty("Easy");
        console.log(userName +roomName);
        socket.emit('enteredTypeFaster', {
            userName,
            roomName
         })

         socket.on('')
    }, [socket]);


    const findResult = event =>{
        event.preventDefault();
        if(userInput === string.join('')){
            console.log("Got it!!!");
            setMessage("You got it!..")
        }
    }


    const changeDifficulty = event =>{
        const {name, value} = event.target;
        setDifficulty(event.target.name);
    }

    const createTarget = event =>{
        if(difficulty === "Easy"){
            //[Timer Tryout code, not working]
            // let now = new Date();
            // var distance = 20- now.getMinutes();
            // var seconds = Math.floor((distance % (1000 * 60 *60)) / 1000 * 60);
            // setTimer(seconds);
            // setTimer("10");
            setString(randomWords(3));
        }
        else if (difficulty == "Medium"){
            setTimer("15");
            setString(randomWords(6));
        }
        else if(difficulty == "Hard"){
            setTimer("20");
            setString(randomWords(9));
        }
        else if(difficulty == "Genius"){
            setTimer("30");
            setString(Math.random().toString(36).substring(2, 20) + randomWords(4));
        }
    }

    const difficultyLevels = ["Easy", "Medium", "Hard", "Genius"]

    return (
        <>
        <NavBar />
        <div className={styles.entirePage}>
            <h1 className={styles.textWhite}>{message} {userName} </h1>
            <br/>
            <h2  className={styles.textWhite}>Type Faster Master</h2>

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
            <button onClick={createTarget} className={styles.createBtn}>{"Create " + difficulty + " Problem"}</button>
           
            <p style={{color: 'white'}}> {string} </p>
            <form onSubmit = {findResult}>
                <input type="text" onChange= {e => setUserInput(e.target.value)}/>
                <button style={{backgroundColor: 'pink'}}>Go!</button>
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