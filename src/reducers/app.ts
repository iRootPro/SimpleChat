const SET_IS_INIT = 'SET_IS_INIT'

const initialState: appInitTypeState = {
    isInit: false
}

export const appReducer = (state: appInitTypeState = initialState, action: ActionType): appInitTypeState => {
    switch (action.type) {
        case "SET_IS_INIT": {
            return {...state, isInit: true}
        }
        default:
            return state
    }
}

export const setIsInit = () => {
    return {type: SET_IS_INIT} as const
}

type ActionType =
    |ReturnType<typeof setIsInit>


export type appInitTypeState = {
    isInit: boolean
}

