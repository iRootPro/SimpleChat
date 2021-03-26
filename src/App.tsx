import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import UnRegister from "./components/UnRegister";
import Network from "./components/Network";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./app/store";
import {appInitTypeState, setIsInit} from "./reducers/app";
import {setMessages} from "./reducers/user";
import messagesDb from './db/messages.json'

function App() {
    const {isInit} = useSelector<RootStateType, appInitTypeState>(state => state.app)
    const dispatch = useDispatch()
    if (!isInit) {
        dispatch(setMessages(messagesDb))
        dispatch(setIsInit())
    }
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path={'/'}><UnRegister/></Route>
                    <Route path={'/network'}><Network/></Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
