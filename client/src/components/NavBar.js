import React, { useEffect } from 'react';
import { navigate, Link } from '@reach/router';
import { connect, useSelector } from 'react-redux';

import LogoutButton from './loginreg/LogoutButton';

import navBarStyles from './GlobalComponents.module.css';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';



const NavBar = ({ socket, roomName, dispatch }) => {

    const navLink = e => {
        navigate('/'+roomName+"/"+e.target.value);
    };

    const navigateLobby = e => {
        socket.emit("navigateParty", 
            {
                roomName,
                gameName: ""
            }
        );
    };
    

    return (
        <>
           {/* <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
        </Navbar> */}
        <nav className="navbar navbar-expand navbar-dark bg-dark md-light">
            <a className="navbar-brand" href="#"></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
        
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <div className="dropdown-divider"></div>
                        <button onClick={navigateLobby} 
                            className={navBarStyles.navButton}>
                                Game Room Lobby
                        </button>
                    </div>
                    </li>
                </ul>
            </div>

        </nav>
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

export default connect(mapStateToProps)(NavBar);