import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

import styles from './Form.module.css';

const FormLogin = ({ formVisibility }) => {
    const [ user, setUser ] = useState("");
    const [ userName, setUserName ] = useState("");
    const [ password, setPassword ] = useState("");
    
    const [errMsg, setErrMsg ] = useState("");


    const onSubmitHandler = e => {
        e.preventDefault();
        setErrMsg("");
        axios.post("http://localhost:8000/api/user/login", {
            userName,
            password
        }, { withCredentials: true })
            .then( (res)=> {
                // How to pass user data to page after nagivating WITHOUT using routes
                setUser(res.data);
                navigate('/lobby');
                
            })
            .catch( (err)=> {
                console.log(".catch activated: "+err)
                setErrMsg('Invalid credentials')
            })

    };

    // Is this the best way to implement a toggle form? or is it better to switch classnames?
    // how to have a variable class name? How to have more than one class name inside {{ in JSX }}
    let hiddenForm = {
        display: "none"
    }
    let visibleForm = {
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        alignItems: "center"
    }

    return (
        <div style={formVisibility === "regForm"? hiddenForm : visibleForm}>
        <form onSubmit={onSubmitHandler} className={styles.loginForm}>
            <h3>Log in below</h3><br/>
                <p style={{color:"red"}}>{errMsg}</p>
            <div className={styles.formRow}>
                <label>User name:</label>
                <input 
                    type="text"
                    name="userName"
                    value={userName}
                    onChange={e=>setUserName(e.target.value)} />
            </div>
                <br/>
            <div className={styles.formRow}>
                <label>Password: </label>
                <input  
                    type="password"
                    name="password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}/>
            </div>
            <br/>
            <div>
                <input type="submit" value="Login"/>
            </div>
        </form>
        </div>

    )
}

export default FormLogin;