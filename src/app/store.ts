import {combineReducers, createStore} from "redux";
import { appReducer } from "../reducers/app";
import { userReducer } from "../reducers/user";

const rootReducer = combineReducers({
    user: userReducer,
    app: appReducer
})
export const store = createStore(rootReducer)

export type RootStateType = ReturnType<typeof rootReducer>
