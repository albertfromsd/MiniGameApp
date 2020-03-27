import React from 'react';
import { Router, navigate} from '@reach/router';

import LogoutButton from './loginreg/LogoutButton';

import styles from './NavBar.module.css';

const NavBar = () => {

    const navLink = e => {
        navigate('/'+e.target.value);
    }

    return (
        <div className={styles.flexRow}>
            <button 
                onClick={navLink}
                name="navBarLink"
                value="lobby">
                    Lobby
            </button>
            <LogoutButton />
        </div>
    )
}

export default NavBar;