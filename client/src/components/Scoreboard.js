import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import sbStyles from './GlobalComponents.module.css';

const Scoreboard = ({ socket, userName, roomName, dispatch }) => {
    const [ userList, setUserList ] = useState([]);
    const [ scoreList, setScoreList ] = useState([]);
    const [ scoreboard, setScoreboard ] = useState([]);


    useEffect( () => {
        console.log("Scoreboard component check");

        socket.emit("scoreboardUpdate", 
            { 
                userName,
                roomName,
            }
        );

        socket.on("refreshScoreboard", data => {
            setScoreboard(data.scoreboardList);
            setUserList(data.userList);
            setScoreList(data.scoreList);
        });

    }, [socket, roomName, userName])

    return (
        <>
        <div className={[sbStyles.flexRowCen, sbStyles.textWhite].join(' ')}>
            <table>
                <tbody>
                    <tr>
                        { userList.map( (user, i) =>
                            <td key={i}>{user}</td>
                        )}
                    </tr>
                    <tr>
                        { scoreList.map( (score, i) =>
                            <td key={i}>{score}</td>
                        )}
                    </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}

function mapStateToProps(state) {
    return {
        socket: state.socket,
        userName: state.userName,
        userScore: state.userScore,
    };
};

export default connect(mapStateToProps)(Scoreboard);
