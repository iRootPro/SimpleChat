import React, {useState} from 'react';
import cn from 'classnames'
import styles from './styles.module.css'
import Message from "./Message";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../app/store";
import {addNewMessage, setCurrentChat, userInitTypeState} from "../../../reducers/user";

const Chat = () => {
    const {messages, currentChat, name} = useSelector<RootStateType, userInitTypeState>(state => state.user)
    const messageChat = messages.filter(msg => msg.chat === currentChat)
    const [inputMessage, setInputMessage] = useState('')
    const dispatch = useDispatch()

    const content = messageChat.map(msg => <Message key={msg.id} id={msg.id} author={msg.author} time={msg.time}
                                                    message={msg.message}/>)

    const handleClickChat = (chat: string) => {
        setInputMessage('')
        dispatch(setCurrentChat(chat))
    }

    const handleInputMessage = (msg: string) => {
        setInputMessage(msg)
    }

    const handleKeyPress = (key: string) => {
        if (key === 'Enter') {
            const time = new Date().toISOString().split('T')[1].split(':')
            const stringTime = `${time[0]}:${time[1]}`
            dispatch(addNewMessage({
                message: inputMessage,
                time: stringTime,
                id: '',
                chat: currentChat,
                author: name
            }))
            setInputMessage('')
        }

    }

    return (
        <div className={styles.wrap}>
            <div className={styles.chats}>
                <span className={cn(styles.chatName, {[styles.chatNameActive]: 'work' === currentChat})}
                      onClick={() => handleClickChat('work')}>Work</span>
                <span className={cn(styles.chatName, {[styles.chatNameActive]: 'flood' === currentChat})}
                      onClick={() => handleClickChat('flood')}>Flood</span>
                <span className={styles.nameUser}>{name}</span>
            </div>
            <div className={styles.messageBlock}>{content}</div>
            <div className={styles.inputBlock}>
                <input className={styles.inputMessage} onKeyPress={(e) => handleKeyPress(e.key)} type="text"
                       placeholder={'введите сообщение и нажмите Enter'}
                       onChange={(e) => handleInputMessage(e.currentTarget.value)}
                       value={inputMessage}
                />
            </div>

        </div>
    );
};

export default Chat;
