import React, { useEffect } from 'react';
import { navigate, Link } from '@reach/router';
import { connect, useSelector } from 'react-redux';

import CustomisedButton from './CustomisedButton';

import navBarStyles from './GlobalComponents.module.css';

//[ BOOTSTRAP ]
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';


const NavBar = ({ socket, roomName, userName, dispatch }) => {

    useEffect( () => {
        if( userName === null || 
            userName.length < 1 || 
            userName === undefined || 
            roomName === null || 
            roomName.length < 1 || 
            roomName === undefined ) {
            navigate('/');
        };
    }, [socket, userName, roomName]);

    const navLink = (e, gameName) => {
        console.log(gameName);
        navigate('/'+roomName+"/"+gameName);
    };

    const navigateLobby = e => {
        socket.emit("navigateParty", 
            {
                roomName,
                gameName: ""
            }
        );
    };

    const exitParty = event =>{
        console.log("Socket should disconnect");
        socket.emit('disconnect');
        navigate('/');

    }
    

    return (
        <>
            <Navbar bg="secondary" variant="dark">
            <Navbar.Brand href={`/${roomName}`}>MiniGame Party</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={navLink}>Math Head</NavDropdown.Item>
                    <NavDropdown.Item href={`/${roomName}/typefaster`}>Type faster</NavDropdown.Item>
                    <NavDropdown.Item href={`/${roomName}/`}>Wise To Memorise</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <CustomisedButton roomName={roomName}/>
            </Navbar.Collapse>
        </Navbar>
        </>
    );
};

function mapStateToProps(state) {
    return {
        userName: state.userName,
    };
};

export default connect(mapStateToProps)(NavBar);