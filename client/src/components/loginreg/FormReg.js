import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

import styles from './Form.module.css';

const FormReg = ({ socket, formVisibility }) => {

    const [ formState, setFormState ] = useState({
        userName: "",
        email: "",
        password: "",
        passwordConfirmation: ""
        });
    const [errors, setErrors] = useState(0);

    const onChangeHandler = e => {
        setFormState({
            ...formState,
            [e.target.name]:e.target.value
        })
    }

    const onSubmitHandler = e => {
        e.preventDefault();

        console.log(e.target.userName.value);
        console.log(e.target.email.value);
        console.log(e.target.password.value);
        console.log(e.target.passwordConfirmation.value);

        axios.post("http://localhost:8000/api/user/register", formState, {withCredentials:true})
            .then( () => navigate('/lobby/'))
            .catch(err=>{
                console.log(err);
                const errorResponse = err.response.data.errors;
                const errorArr=[];
                for (const key of Object.keys(errorResponse)){
                    errorArr.push(errorResponse[key].message)
            };
            setErrors(errorArr);
        });   
    }

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
        <div style={formVisibility === "loginForm"? hiddenForm : visibleForm}>
        <form onSubmit={onSubmitHandler} className={styles.loginForm}>
            <h3>Registration Form</h3><br/>
            {errors!== 0 && errors.map((error, index)=>
                <p style={{color:'red'}} key={index}>{error}</p>
            )}
            <div className={styles.formRow}>
                <label>Username:</label> {" "}
                <input 
                    type="text"
                    name="userName" 
                    value={formState.userName} 
                    onChange={onChangeHandler}/>
            </div>
                <br/>
            <div className={styles.formRow}>
                <label>Email:</label> {" "}
                <input 
                    type="text"
                    name="email" 
                    value={formState.email} 
                    onChange={onChangeHandler}/>
            </div>
                <br/>
            <div className={styles.formRow}>
                <label>Password: </label>
                <input 
                    type="password"
                    name="password"
                    value={formState.password}
                    onChange={onChangeHandler}/>
            </div>
                <br/>
            <div className={styles.formRow}>
                <label>Confirm Password: </label>
                <input 
                    type="password"
                    name="passwordConfirmation"
                    value={formState.passwordConfirmation}
                    onChange={onChangeHandler}/>
            </div>
                <br/>
            <button type="submit" className={styles.rowCenter}>Submit Registration</button>
        </form>
        </div>
    )
}

export default FormReg;