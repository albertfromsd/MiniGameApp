import React from 'react';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';


import Button from 'react-bootstrap/Button';

const CustomizedButton = ({ socket, roomName, userName, dispatch }) => {

    const logout = event =>{
        socket.disconnect();

        dispatch({
            type: 'LOGOUT',
            socket,
            userName,
        });

        navigate('/');
    };

    const exitThisGame = event =>{
        let gameName="";
        socket.emit("navigateParty",
            {
                roomName,
                gameName
            }

        );

    };
    
    return (
        <>
        <Button variant="outline-secondary" onClick={exitThisGame}>Return to Game Room</Button>
        <Button variant="outline-secondary" onClick={logout}>Logout</Button>
        </>
    );
};

function mapStateToProps(state) {
    return {
        socket: state.socket,
        userName: state.userName,
    };
};

export default connect(mapStateToProps)(CustomizedButton);