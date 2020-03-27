import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import axios from 'axios';

import styles from './UserList.module.css';

const UserList = ({ socket }) => {
    const [ userList, setUserList ] = useState([]);

    useEffect( () => {
        socket.on('refreshUserList', newUserList => {
          setUserList(newUserList);
        });

        return () => {
          socket.disconnect(socket.id);
        }

      }, [socket]);

    return (
        <>
        <h4>Users in this room:</h4>
        <div className={styles.userList}>
          {userList.map( (user, i) => 
              <p key={i}>{user}</p>
          )}
        </div>
        </>
    );
};

export default UserList;