import React, { useState, useEffect } from 'react';
import { Link, Router, Redirect } from '@reach/router';

import styles from './LoginReg.module.css';

import FormLogin from '../components/loginreg/FormLogin';
import FormReg from '../components/loginreg/FormReg';



function LoginReg() {
  const [ formVisibilityState, setFormVisibilityState ] = useState("loginForm");

  const toggleFormVisibility = e => {
    if(formVisibilityState === "loginForm") {
      setFormVisibilityState("regForm");
    } else {
      setFormVisibilityState("loginForm");
    };
  };

  return (
    <>
    <div className={styles.entirePage}>
      <h1>Welcome to Mini Game App!</h1><br/>
      <FormLogin formVisibility={formVisibilityState}/>
      <FormReg formVisibility={formVisibilityState}/>
      <br/>
      <button onClick={toggleFormVisibility}>
        {formVisibilityState === "loginForm" 
          ? "Register"
          : "Login"}
      </button><br/>
    </div>
    {/* [END] div App */}
    </>
  );
}

export default LoginReg;
