import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import styles from './styles.module.css'
import {useDispatch, useSelector} from "react-redux";
import {setUserName, userInitTypeState} from "../../reducers/user";
import {RootStateType} from "../../app/store";

const UnRegister = () => {
    const {name} = useSelector<RootStateType, userInitTypeState>(state => state.user)
    const [regName, setRegName] = useState<string>('')
    const dispatch = useDispatch()

    if(name) {
        return <Redirect to={'/network'}/>
    }

    const savedName = localStorage.getItem('name')
    if (savedName) {
        dispatch(setUserName(savedName))
    }

    const handleChangeInput = (value: string) => {
        setRegName(value)
    }

    const handleRegisterButton = () => {
        if (regName !== '') {
            localStorage.setItem('name', regName)
            dispatch(setUserName(regName))
            setRegName('')
        }

    }

    return (
        <div className={styles.wrap}>
            <div className={styles.registerBlock}>
                <span className={styles.text}>Регистрация</span>
                <input className={styles.input} type="text" placeholder={'Введи своё имя'}
                       onChange={(e) => handleChangeInput(e.currentTarget.value)}/>
                <button className={styles.btn} onClick={handleRegisterButton}>Зарегистрироваться</button>
            </div>

        </div>
    );
};

export default UnRegister;
