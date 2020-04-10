import React from 'react';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';


import Button from 'react-bootstrap/Button';

const CustomizedButton = ({ socket, roomName, userName, dispatch }) => {

    const exitParty = event =>{
        socket.disconnect();

        dispatch({
            type: 'LOGOUT',
            socket,
            userName,
        });

        navigate('/');
    }

    const exitThisGame = event =>{
        let gameName="";
        socket.emit("navigateParty",
            {
                roomName,
                gameName
            }

        )

    }
    
    return (
        <>        
        <Button variant="outline-secondary" onClick={exitParty}>Go to Lobby</Button>
        <Button variant="outline-secondary" onClick={exitThisGame}>Go to Game Room</Button>
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