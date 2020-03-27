import React, { useState, useEffect } from 'react';
import { Link, Router } from '@reach/router';

const GameRoom = ({ socket }) => {

    return (
        <>
        <div>
            <h2>Game Room</h2>
            <Link>Human Calculator</Link>{" "}
        </div>
        <Router>
            <HumanCalculator socket={socket}/>
        </Router>
        </>
    )
}

export default GameRoom;