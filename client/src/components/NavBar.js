import React, { useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';

import CustomizedButton from './CustomizedButton';

import navBarStyles from './GlobalComponents.module.css';

//[ BOOTSTRAP ]
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';


const NavBar = ({ socket, dispatch, roomName, userName, admin }) => {
    let gameName;

    useEffect( () => {
        if( userName == undefined || 
            userName.length < 1 || 
            roomName == undefined || 
            roomName.length < 1 ) {
            navigate('/');
        };

    }, [socket, userName, roomName]);

    const navLink = e => {
        gameName = e.target.value;
        console.log(gameName);
        dispatch({
            type: 'SETGAMENAME',
            gameName,
        });

        dispatch({
            type: 'SETROOMNAME',
            roomName,
        });

        socket.emit("navigateParty", 
            {
                roomName,
                userName,
                gameName
            }
        );
    };
    
    return (
        <>
            <Navbar bg="secondary" variant="dark">
            <Navbar.Brand href={`/${roomName}`}>MiniGame Party</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#">Home</Nav.Link>
                {/* <NavDropdown title="Games" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={navLink} value="mathhead">Math Head</NavDropdown.Item>
                    <NavDropdown.Item onClick={navLink} value="typefaster">Type faster</NavDropdown.Item>
                    <NavDropdown.Item href={`/${roomName}/`}>Wise To Memorise</NavDropdown.Item>
                </NavDropdown> */}
                </Nav>
                <div>
                    <p className={navBarStyles.textWhite}>Logged in as: <i> { userName } </i></p>
                        <br />
                    <p className={navBarStyles.textWhite}>Admin:  { admin } </p>
                        <br />
                </div>
                <CustomizedButton className={navBarStyles.flexColCen}
                    roomName={roomName}/>
            </Navbar.Collapse>
        </Navbar>
        </>
    );
};

function mapStateToProps(state) {
    return {
        userName: state.userName,
        admin: state.admin,
    };
};

export default connect(mapStateToProps)(NavBar);