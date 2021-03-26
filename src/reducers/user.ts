import {v4 as uuid} from 'uuid'


const SET_USERNAME = 'SET_USERNAME'
const SET_MESSAGES = 'SET_MESSAGES'
const SET_CURRENT_CHAT = 'SET_CURRENT_CHAT'
const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE'
const UPDATE_MESSAGE = 'UPDATE_MESSAGE'
const REMOVE_MESSAGE = 'REMOVE_MESSAGE'

const initialState: userInitTypeState = {
    name: '',
    messages: [],
    currentChat: 'work'
}

export const userReducer = (state: userInitTypeState = initialState, action: ActionType): userInitTypeState => {
    switch (action.type) {
        case "SET_USERNAME": {
            return {...state, name: action.name}
        }
        case "SET_MESSAGES": {
            return {...state, messages: [...action.messages]}
        }
        case "SET_CURRENT_CHAT": {
            return {...state, currentChat: action.chat}
        }
        case "ADD_NEW_MESSAGE": {
            const newMessage = {
                ...action.message,
                id: uuid()
            }
            return {...state, messages: [...state.messages, newMessage]}
        }
        case "UPDATE_MESSAGE": {
            const newMessages: Array<MessageType> = []
            state.messages.map(msg => {
                if (msg.id === action.message.id) {
                    newMessages.push({
                        ...msg,
                        message: action.message.message
                    })
                } else {
                    newMessages.push(msg)
                }
            })
            return {...state, messages: newMessages}
        }
        case "REMOVE_MESSAGE": {
            const newMessages = state.messages.filter(msg => msg.id !== action.id)
            return {...state, messages: newMessages}
        }
        default:
            return state
    }
}

export const setUserName = (name: string) => {
    return {type: SET_USERNAME, name} as const
}

export const setMessages = (messages: Array<MessageType>) => {
    return {type: SET_MESSAGES, messages} as const
}

export const setCurrentChat = (chat: string) => {
    return {type: SET_CURRENT_CHAT, chat} as const
}

export const addNewMessage = (message: MessageType) => {
    return {type: ADD_NEW_MESSAGE, message} as const
}

export const updateMessage = (message: updateMessageType) => {
    return {type: UPDATE_MESSAGE, message} as const
}

export const removeMessage = (id: string) => {
    return {type: REMOVE_MESSAGE, id} as const
}

type ActionType =
    | ReturnType<typeof setUserName>
    | ReturnType<typeof setMessages>
    | ReturnType<typeof setCurrentChat>
    | ReturnType<typeof addNewMessage>
    | ReturnType<typeof updateMessage>
    | ReturnType<typeof removeMessage>


export type userInitTypeState = {
    name: string
    messages: Array<MessageType>
    currentChat: string
}

export type MessageType = {
    id: string
    author: string
    chat: string
    message: string
    time: string
}

export type updateMessageType = {
    id: string
    message: string
}
