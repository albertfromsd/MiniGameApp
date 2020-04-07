import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// [ STYLING ]
import sbStyles from './GlobalComponents.module.css';

//[ BOOTSTRAP ]
import Table from 'react-bootstrap/Table';

const Scoreboard = ({ socket, userName, roomName, dispatch }) => {
    const [ userList, setUserList ] = useState([]);
    const [ scoreList, setScoreList ] = useState([]);
    const [ scoreboard, setScoreboard ] = useState([]);


    useEffect( () => {
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

    }, [socket, roomName, userName]);

    return (
        <>

        <div className={[sbStyles.flexRowCen, sbStyles.textWhite].join(' ')}>
        <Table striped bordered hover variant="dark">
        <tbody>
                    <tr className={sbStyles.sbUser}>
                        { userList.map( (user, i) =>
                            <td key={i} className={sbStyles.cellWidth}>{user}</td>
                        )}
                    </tr>
                    <tr className={sbStyles.sbScore}>
                    { scoreList.map( (score, i) =>
                            <td key={i}>{score} </td>
                        )}
                    </tr>
                </tbody>
        </Table>
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

export default connect(mapStateToProps)(Scoreboard);

