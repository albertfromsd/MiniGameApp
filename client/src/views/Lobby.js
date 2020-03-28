// [MAIN COMPONENTS]
import React, { useState } from 'react';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';

// [STYLES]
import styles from './Views.module.css';

// [NAVBAR]
import NavBar from '../components/NavBar';

// [GAMES]
// import MathHead from '../components/games/MathHead';
// import WiseToMemorize from '../components/games/WiseToMemorize';
// import TypeFasterMaster from '../components/games/TypeFasterMaster';
// import LittleBoxes from '../components/games/LittleBoxes';

// import DontComeInsideMe from '../components/games/DontComeInsideMe';
// import DropAFatShot from '../components/games/DropAFatShot';

const Lobby = ({ socket, dispatch, userName }) => {
    const [ formState, setFormState ] = useState({
        uName: "",
        rName: ""
    });
    const [ errorMsg, setErrorMsg ] = useState ("");

    const onChangeHandler = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
        console.log(e.target.name+": "+e.target.value);
    }

    const enterRoom = e => {
        e.preventDefault();
        if (formState.uName.length>0 && formState.rName.length>0) {
            dispatch({
                type: 'SETUSERNAME',
                userName: formState.uName,
            });
            navigate('/'+formState.rName);
        } else {
            setErrorMsg("Please enter both a user and room name");
        };
        
    };

    // in /views/GameRoom.js we will have a list of sockets connected, chatbox, + list of games (later we will add total score for session using state or redux)

    return (
        <>
        <NavBar />
        <div className={[styles.flexColCen, styles.textWhite].join(' ')}>
            <h1>Mini Game Party!</h1><br/>
            <p className={styles.textWhite}>Please enter your desired username and room you want to enter or create</p> <br/>
            <form className={styles.flexColCen} onSubmit={enterRoom}>

                <p style={{color: "red"}}>{errorMsg}</p>

                <label>Username: </label>
                <input
                    type="text"
                    name="uName"
                    value={formState.uName}
                    onChange={onChangeHandler} /> <br/>

                <label>Room Name:</label>
                <input 
                    type="text"
                    name="rName"
                    value={formState.rName}
                    onChange={onChangeHandler} /> <br/>

                <input type="submit" value="Enter room" className={styles.prettyBtn} />
            </form>
        </div>
        </>
    );
};

function mapStateToProps(state) {
    return {
        socketId: state.socketId,
        userName: state.userName,
        userScore: state.userScore
    };
};

export default connect(mapStateToProps)(Lobby);