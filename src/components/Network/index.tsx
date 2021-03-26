import React from 'react';
import {Redirect} from 'react-router-dom';
import {useSelector} from "react-redux";
import {RootStateType} from "../../app/store";
import {userInitTypeState} from "../../reducers/user";
import Chat from "./Chat";
import styles from './styles.module.css'
const Network = () => {
    const {name} = useSelector<RootStateType, userInitTypeState>(state => state.user)
    if (!name) {
        return <Redirect to={'/'}/>
    }

    return (
        <div className={styles.wrap}>
            <Chat/>
        </div>
    );
};

export default Network;
