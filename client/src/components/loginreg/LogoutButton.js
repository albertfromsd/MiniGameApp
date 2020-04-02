import React from 'react';
import axios from 'axios';
import { navigate } from "@reach/router";
import { connect } from 'react-redux';

const LogoutButton = ({ dispatch }) => {

    const logout = e => {

        axios.delete("http://localhost:8000/api/user/logout", {withCredentials: true }
            .then( (res) => console.log(res) )
            .catch( (err) => console.log(err) )
        );

        dispatch({
            type: "LOGOUT"
        });
    };

    return(
        <>
        <button onClick={logout}>Logout</button>
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

export default connect(mapStateToProps)(LogoutButton);