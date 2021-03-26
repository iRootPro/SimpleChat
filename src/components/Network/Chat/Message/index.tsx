import React, {useState} from 'react';
import styles from './styles.module.css'
import removeIcon from './../../../../assets/icons/remove.jpg'
import editIcon from './../../../../assets/icons/edit.png'
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../../app/store";
import {removeMessage, updateMessage, userInitTypeState} from "../../../../reducers/user";

const Message = ({id, author, message, time}: propsType) => {
    const {name} = useSelector<RootStateType, userInitTypeState>(state => state.user)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [editMessage, setEditMessage] = useState<string>('')
    const dispatch = useDispatch()
    const handleClickEdit = () => {
        setEditMode(true)
        setEditMessage(message)
    }

    const handleClickCancel = () => {
        setEditMode(false)
        setEditMessage('')
    }

    const handleChangeInput = (message: string) => {
        setEditMessage(message)
    }

    const handleClickSaveEdit = () => {
        dispatch(updateMessage({id, message: editMessage}))
        setEditMode(false)
        setEditMessage('')
    }

    const handleClickRemove = () => {
        dispatch(removeMessage(id))
    }

    return (
        <>
            <div className={styles.wrap}>
                <span className={styles.author}>{author}:</span> <span>{message}</span> <span
                className={styles.time}>{time} </span>{author === name ?
                <span>
                    <span onClick={handleClickEdit}><img width='10px' src={editIcon} alt="editIcon"/></span>
                    <span onClick={handleClickRemove}><img width='12px' src={removeIcon} alt="editIcon"/></span>
                </span> : ''}
            </div>
            {editMode ?
                <div className={styles.wrapModal}>
                    <div className={styles.editModal}>
                        <span className={styles.modalTitle}>Редактирование сообщения</span>
                        <input className={styles.inputEdit} type="text" value={editMessage}
                               onChange={(e) => handleChangeInput(e.currentTarget.value)}/>
                        <div className={styles.buttonModal}>
                            <button onClick={handleClickSaveEdit} className={styles.modalBtn}>Сохранить</button>
                            <button onClick={handleClickCancel} className={styles.modalBtn}>Отмена</button>
                        </div>
                    </div>
                </div>
                : ''
            }

        </>
    );
};

export default Message;

type propsType = {
    id: string
    author: string
    time: string
    message: string
}
